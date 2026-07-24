import {
  NextFunction,
  Request,
  Response,
} from "express";

import projectService from "../services/Project.service";

class ProjectController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const project =
        await projectService.createProject(
          req.body,
          req.user!._id.toString()
        );

      res.status(201).json({
        success: true,
        message:
          "Project created successfully",
        data: project,
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
      const projects =
        await projectService.getProjects();

      res.status(200).json({
        success: true,
        data: projects,
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
      const project =
        await projectService.getProjectById(
          String(req.params.id)
        );

      res.status(200).json({
        success: true,
        data: project,
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
      const project =
        await projectService.updateProject(
          String(req.params.id),
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Project updated successfully",
        data: project,
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
      await projectService.deleteProject(
        String(req.params.id)
      );

      res.status(200).json({
        success: true,
        message:
          "Project deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProjectController();