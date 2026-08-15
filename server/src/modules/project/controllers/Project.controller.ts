import {
  NextFunction,
  Request,
  Response,
} from "express";

import projectService from "../services/Project.service";

import {
  ProjectQueryDto,
} from "../dto/ProjectQuery.dto";

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
        message: "Project created successfully",
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
      const query =
        req.query as unknown as ProjectQueryDto;

      const hasQuery =
        Object.keys(req.query).length > 0;

      const projects = hasQuery
        ? await projectService.searchProjects(query)
        : await projectService.getProjects();

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
          req.params.id as string
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
          req.params.id as string,
          req.body
        );

      res.status(200).json({
        success: true,
        message: "Project updated successfully",
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
        req.params.id as string
      );

      res.status(200).json({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProjectController();
