import { Types } from "mongoose";

import Project from "../../project/models/Project.model";
import Task from "../../task/models/Task.model";
import Client from "../../client/models/Client.model";
import { Invoice } from "../../invoice/models/Invoice.model";

class DashboardRepository {
  private getOwner(userId: string) {
    return new Types.ObjectId(userId);
  }

  // ============================================================
  // OVERVIEW
  // ============================================================

  async getOverview(userId: string) {
    const createdBy = this.getOwner(userId);

    const [
      projectCount,
      taskCount,
      clientCount,
      invoiceCount,
      revenueResult,
      recentProjects,
      recentTasks,
      recentClients,
    ] = await Promise.all([
      Project.countDocuments({
        createdBy: createdBy,
      }),

      Task.countDocuments({
        createdBy: createdBy,
      }),

      Client.countDocuments({ owner: createdBy }),

      Invoice.countDocuments({
        createdBy: createdBy,
      }),

      Invoice.aggregate([
        {
          $match: {
            createdBy: createdBy,
            status: "paid",
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$total",
            },
          },
        },
      ]),

      Project.find({
        createdBy: createdBy,
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
        .exec(),

      Task.find({
        createdBy: createdBy,
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
        .exec(),

      Client.find({ owner: createdBy })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
        .exec(),
    ]);

    return {
      totalClients: clientCount,
      totalProjects: projectCount,
      totalTasks: taskCount,
      totalInvoices: invoiceCount,
      totalRevenue: Number(
        revenueResult[0]?.total ?? 0
      ),

      recentProjects,
      recentTasks,
      recentClients,
    };
  }

  // ============================================================
  // PROJECT ANALYTICS
  // ============================================================

  async getProjectAnalytics(userId: string) {
    const createdBy = this.getOwner(userId);

    const result = await Project.aggregate([
      {
        $match: {
          createdBy: createdBy,
        },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const statusCounts = {
      planning: 0,
      active: 0,
      completed: 0,
      onHold: 0,
    };

    for (const item of result) {
      switch (item._id) {
        case "planning":
          statusCounts.planning = Number(
            item.count
          );
          break;

        case "active":
          statusCounts.active = Number(
            item.count
          );
          break;

        case "completed":
          statusCounts.completed = Number(
            item.count
          );
          break;

        case "on-hold":
          statusCounts.onHold = Number(
            item.count
          );
          break;
      }
    }

    return statusCounts;
  }

  // ============================================================
  // TASK ANALYTICS
  // ============================================================

  async getTaskAnalytics(userId: string) {
    const createdBy = this.getOwner(userId);

    const [statusResult, priorityResult] =
      await Promise.all([
        Task.aggregate([
          {
            $match: {
              createdBy: createdBy,
            },
          },
          {
            $group: {
              _id: "$status",
              count: {
                $sum: 1,
              },
            },
          },
        ]),

        Task.aggregate([
          {
            $match: {
              createdBy: createdBy,
            },
          },
          {
            $group: {
              _id: "$priority",
              count: {
                $sum: 1,
              },
            },
          },
        ]),
      ]);

    const status = {
      todo: 0,
      inProgress: 0,
      review: 0,
      done: 0,
    };

    const priority = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
    };

    for (const item of statusResult) {
      switch (item._id) {
        case "todo":
          status.todo = Number(item.count);
          break;

        case "in-progress":
          status.inProgress = Number(
            item.count
          );
          break;

        case "review":
          status.review = Number(item.count);
          break;

        case "done":
          status.done = Number(item.count);
          break;
      }
    }

    for (const item of priorityResult) {
      if (
        Object.prototype.hasOwnProperty.call(
          priority,
          item._id
        )
      ) {
        priority[
          item._id as keyof typeof priority
        ] = Number(item.count);
      }
    }

    return {
      status,
      priority,
    };
  }

  // ============================================================
  // INVOICE ANALYTICS
  // ============================================================

  async getInvoiceAnalytics(userId: string) {
    const createdBy = this.getOwner(userId);

    const result = await Invoice.aggregate([
      {
        $match: {
          createdBy: createdBy,
        },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const analytics = {
      draft: 0,
      sent: 0,
      paid: 0,
      overdue: 0,
      total: 0,
    };

    for (const item of result) {
      const count = Number(item.count ?? 0);

      analytics.total += count;

      switch (item._id) {
        case "draft":
          analytics.draft = count;
          break;

        case "sent":
          analytics.sent = count;
          break;

        case "paid":
          analytics.paid = count;
          break;

        case "overdue":
          analytics.overdue = count;
          break;
      }
    }

    return analytics;
  }

  // ============================================================
  // REVENUE ANALYTICS
  // ============================================================

  async getRevenueAnalytics(userId: string) {
    const createdBy = this.getOwner(userId);

    const result = await Invoice.aggregate([
      {
        $match: {
          createdBy: createdBy,
          status: "paid",
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$issueDate",
            },
            month: {
              $month: "$issueDate",
            },
          },
          revenue: {
            $sum: "$total",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    return result.map((item) => ({
      year: Number(item._id.year),
      month: Number(item._id.month),
      revenue: Number(item.revenue ?? 0),
    }));
  }

  // ============================================================
  // RECENT ACTIVITY
  // ============================================================

  async getRecentActivity(userId: string) {
    const createdBy = this.getOwner(userId);

    const [
      projects,
      tasks,
      invoices,
    ] = await Promise.all([
      Project.find({
        createdBy: createdBy,
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
        .exec(),

      Task.find({
        createdBy: createdBy,
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
        .exec(),

      Invoice.find({
        createdBy: createdBy,
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
        .exec(),
    ]);

    return {
      projects,
      tasks,
      invoices,
    };
  }

  // ============================================================
  // DEADLINES
  // ============================================================

  async getDeadlines(userId: string) {
    const createdBy = this.getOwner(userId);

    const [
      projects,
      tasks,
      invoices,
    ] = await Promise.all([
      Project.find({
        createdBy: createdBy,
      })
        .sort({ endDate: 1 })
        .limit(10)
        .lean()
        .exec(),

      Task.find({
        createdBy: createdBy,
      })
        .sort({ dueDate: 1 })
        .limit(10)
        .lean()
        .exec(),

      Invoice.find({
        createdBy: createdBy,
      })
        .sort({ dueDate: 1 })
        .limit(10)
        .lean()
        .exec(),
    ]);

    return [
      ...projects.map((project) => ({
        _id: project._id,
        title: project.title,
        dueDate: project.endDate,
        status: project.status,
        type: "project" as const,
      })),

      ...tasks.map((task) => ({
        _id: task._id,
        title: task.title,
        dueDate: task.dueDate,
        status: task.status,
        type: "task" as const,
      })),

      ...invoices.map((invoice) => ({
        _id: invoice._id,
        title: invoice.invoiceNumber,
        dueDate: invoice.dueDate,
        status: invoice.status,
        type: "invoice" as const,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
      )
      .slice(0, 10);
  }

  // ============================================================
  // TOP CLIENTS
  // ============================================================

  async getTopClients(userId: string) {
    const createdBy = this.getOwner(userId);

    const clients = await Client.find({ owner: createdBy })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
      .exec();

    const clientIds = clients.map(
      (client) => client._id
    );

    const [projectCounts, revenueCounts] =
      await Promise.all([
        Project.aggregate([
          {
            $match: {
              createdBy: createdBy,
              client: {
                $in: clientIds,
              },
            },
          },
          {
            $group: {
              _id: "$client",
              count: {
                $sum: 1,
              },
            },
          },
        ]),

        Invoice.aggregate([
          {
            $match: {
              createdBy: createdBy,
              client: {
                $in: clientIds,
              },
              status: "paid",
            },
          },
          {
            $group: {
              _id: "$client",
              totalRevenue: {
                $sum: "$total",
              },
            },
          },
        ]),
      ]);

    const projectMap = new Map(
      projectCounts.map((item) => [
        item._id.toString(),
        Number(item.count ?? 0),
      ])
    );

    const revenueMap = new Map(
      revenueCounts.map((item) => [
        item._id.toString(),
        Number(item.totalRevenue ?? 0),
      ])
    );

    return clients.map((client) => ({
      _id: client._id,
      name: client.name,
      company: client.company,
      totalRevenue:
        revenueMap.get(client._id.toString()) ?? 0,
      projectCount:
        projectMap.get(client._id.toString()) ?? 0,
    }));
  }

  // ============================================================
  // BASIC COUNTS
  // ============================================================

  async getProjectCount(userId: string) {
    return Project.countDocuments({
      createdBy: this.getOwner(userId),
    });
  }

  async getTaskCount(userId: string) {
    return Task.countDocuments({
      createdBy: this.getOwner(userId),
    });
  }

  async getClientCount(userId: string) {
    return Client.countDocuments({ owner: this.getOwner(userId) });
  }

  // ============================================================
  // RECENT DATA
  // ============================================================

  async getRecentProjects(userId: string) {
    return Project.find({
      createdBy: this.getOwner(userId),
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()
      .exec();
  }

  async getRecentTasks(userId: string) {
    return Task.find({
      createdBy: this.getOwner(userId),
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()
      .exec();
  }

  async getRecentClients(userId: string) {
    return Client.find({ owner: this.getOwner(userId) })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()
      .exec();
  }

  async getTaskStatus(userId: string) {
    return Task.aggregate([
      {
        $match: {
          createdBy: this.getOwner(userId),
        },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);
  }
}

export default new DashboardRepository();

