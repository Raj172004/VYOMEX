import ClientModel from "../../client/models/Client.model";
import ProjectModel from "../../project/models/Project.model";
import TaskModel from "../../task/models/Task.model";
import {
  Invoice,
  InvoiceStatus,
} from "../../invoice/models/Invoice.model";

class DashboardRepository {
  async getOverview() {
    const [
      totalClients,
      totalProjects,
      totalTasks,
      totalInvoices,
      revenue,
    ] = await Promise.all([
      ClientModel.countDocuments(),
      ProjectModel.countDocuments(),
      TaskModel.countDocuments(),
      Invoice.countDocuments(),
      Invoice.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$total",
            },
          },
        },
      ]),
    ]);

    return {
      totalClients,
      totalProjects,
      totalTasks,
      totalInvoices,
      totalRevenue:
        revenue[0]?.totalRevenue ?? 0,
    };
  }

  async getProjectAnalytics() {
    const result = await ProjectModel.aggregate([
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
      planning: 0,
      active: 0,
      completed: 0,
      onHold: 0,
    };

    for (const item of result) {
      switch (item._id) {
        case "planning":
          analytics.planning = item.count;
          break;

        case "active":
          analytics.active = item.count;
          break;

        case "completed":
          analytics.completed = item.count;
          break;

        case "on-hold":
          analytics.onHold = item.count;
          break;
      }
    }

    return analytics;
  }

  async getTaskAnalytics() {
    const statusResult = await TaskModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const priorityResult = await TaskModel.aggregate([
      {
        $group: {
          _id: "$priority",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const analytics = {
      status: {
        todo: 0,
        inProgress: 0,
        review: 0,
        done: 0,
      },
      priority: {
        low: 0,
        medium: 0,
        high: 0,
        critical: 0,
      },
    };

    for (const item of statusResult) {
      switch (item._id) {
        case "todo":
          analytics.status.todo = item.count;
          break;
        case "in-progress":
          analytics.status.inProgress = item.count;
          break;
        case "review":
          analytics.status.review = item.count;
          break;
        case "done":
          analytics.status.done = item.count;
          break;
      }
    }

    for (const item of priorityResult) {
      switch (item._id) {
        case "low":
          analytics.priority.low = item.count;
          break;
        case "medium":
          analytics.priority.medium = item.count;
          break;
        case "high":
          analytics.priority.high = item.count;
          break;
        case "critical":
          analytics.priority.critical = item.count;
          break;
      }
    }

    return analytics;
  }

  async getInvoiceAnalytics() {
    const result = await Invoice.aggregate([
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
    };

    for (const item of result) {
      switch (item._id) {
        case InvoiceStatus.DRAFT:
          analytics.draft = item.count;
          break;

        case InvoiceStatus.SENT:
          analytics.sent = item.count;
          break;

        case InvoiceStatus.PAID:
          analytics.paid = item.count;
          break;

        case InvoiceStatus.OVERDUE:
          analytics.overdue = item.count;
          break;
      }
    }

    return analytics;
  }

  async getRecentActivity() {
  const [projects, tasks, invoices] = await Promise.all([
    ProjectModel.find()
      .select("title status createdAt")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),

    TaskModel.find()
      .select("title status createdAt")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),

    Invoice.find()
      .select(
        "invoiceNumber total status createdAt"
      )
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  return {
    projects,
    tasks,
    invoices,
  };
}

async getDeadlines() {
  const today = new Date();

  const nextWeek = new Date();

  nextWeek.setDate(today.getDate() + 7);

  const overdueTasks = await TaskModel.find({
    dueDate: {
      $lt: today,
    },
    status: {
      $ne: "done",
    },
  })
    .select(
      "title dueDate priority status"
    )
    .sort({
      dueDate: 1,
    })
    .lean();

  const upcomingTasks = await TaskModel.find({
    dueDate: {
      $gte: today,
      $lte: nextWeek,
    },
  })
    .select(
      "title dueDate priority status"
    )
    .sort({
      dueDate: 1,
    })
    .lean();

  const upcomingProjects =
    await ProjectModel.find({
      endDate: {
        $gte: today,
        $lte: nextWeek,
      },
    })
      .select(
        "title endDate status"
      )
      .sort({
        endDate: 1,
      })
      .lean();

  return {
    overdueTasks,
    upcomingTasks,
    upcomingProjects,
  };
}

async getTopClients() {
  return Invoice.aggregate([
    {
      $group: {
        _id: "$client",

        totalRevenue: {
          $sum: "$total",
        },

        invoiceCount: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        totalRevenue: -1,
      },
    },

    {
      $limit: 5,
    },

    {
      $lookup: {
        from: "clients",
        localField: "_id",
        foreignField: "_id",
        as: "client",
      },
    },

    {
      $unwind: "$client",
    },

    {
      $project: {
        _id: 0,

        clientId: "$client._id",

        company: "$client.company",

        contactPerson: "$client.contactPerson",

        totalRevenue: 1,

        invoiceCount: 1,
      },
    },
  ]);
}

  async getRevenueAnalytics() {
    const revenue = await Invoice.aggregate([
      {
        $match: {
          status: InvoiceStatus.PAID,
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

    return revenue.map((item) => ({
      year: item._id.year,
      month: item._id.month,
      revenue: item.revenue,
    }));
  }
}

export default new DashboardRepository();