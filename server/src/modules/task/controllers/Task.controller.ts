import {
  NextFunction,
  Request,
  Response,
} from "express";

import taskService from "../services/Task.service";

import { writeAudit } from "../../audit/helpers/Audit.helper";

class TaskController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId =
        typeof req.user === "object" &&
        req.user !== null &&
        "_id" in req.user
          ? String(
              (req.user as { _id?: unknown })._id ?? ""
            )
          : "";

      const task = await taskService.createTask(
        req.body,
        userId
      );

      await writeAudit({
        req,
        action: "CREATE",
        entity: "Task",
        entityId: task._id.toString(),
        description: `Task "${task.title}" created`,
        metadata: {
          taskId: task._id.toString(),
          title: task.title,
          project: task.project?.toString(),
          assignedTo: task.assignedTo?.toString(),
        },
      });

      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const tasks = await taskService.getTasks();

      res.status(200).json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const task = await taskService.getTaskById(
        String(req.params.id)
      );

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const task = await taskService.updateTask(
        String(req.params.id),
        req.body
      );

      const action =
        req.body.status !== undefined
          ? "STATUS_CHANGE"
          : "UPDATE";

      await writeAudit({
        req,
        action,
        entity: "Task",
        entityId: task._id.toString(),
        description:
          action === "STATUS_CHANGE"
            ? `Task "${task.title}" status changed to "${task.status}"`
            : `Task "${task.title}" updated`,
        metadata: {
          taskId: task._id.toString(),
          changes: req.body,
          status: task.status,
        },
      });

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await taskService.deleteTask(
        String(req.params.id)
      );

      await writeAudit({
        req,
        action: "DELETE",
        entity: "Task",
        entityId: String(req.params.id),
        description: `Task "${req.params.id}" deleted`,
        metadata: {
          taskId: String(req.params.id),
        },
      });

      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
