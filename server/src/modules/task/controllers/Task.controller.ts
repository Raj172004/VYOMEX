import {
  NextFunction,
  Request,
  Response,
} from "express";

import taskService from "../services/Task.service";

class TaskController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const task = await taskService.createTask(
        req.body,
        req.user!._id.toString()
      );

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
      const hasQuery =
        Object.keys(req.query).length > 0;

      const tasks = hasQuery
        ? await taskService.searchTasks(
            req.query as any
          )
        : await taskService.getTasks();

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
      const task =
        await taskService.getTaskById(
          req.params.id as string
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
      const task =
        await taskService.updateTask(
          req.params.id as string,
          req.body
        );

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
        req.params.id as string
      );

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