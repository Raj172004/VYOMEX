import { Types } from "mongoose";

import projectRepository from "../repositories/Project.repository";

import { CreateProjectDto } from "../dto/CreateProject.dto";
import { UpdateProjectDto } from "../dto/UpdateProject.dto";
import { ProjectQueryDto } from "../dto/ProjectQuery.dto";

import { ApiError } from "../../../utils/ApiError";

class ProjectService {
  async createProject(
    data: CreateProjectDto,
    userId: string
  ) {
    if (!Types.ObjectId.isValid(data.client)) {
      throw new ApiError(400, "Invalid client ID");
    }

    if (!Types.ObjectId.isValid(userId)) {
      throw new ApiError(400, "Invalid user ID");
    }

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime())
    ) {
      throw new ApiError(
        400,
        "Invalid project dates"
      );
    }

    if (endDate < startDate) {
      throw new ApiError(
        400,
        "End date cannot be before date"
      );
    }

    const assignedUsers =
      data.assignedTo?.map((id) => {
        if (!Types.ObjectId.isValid(id)) {
          throw new ApiError(
            400,
            `Invalid assigned user ID: ${id}`
          );
        }

        return new Types.ObjectId(id);
      }) ?? [];

    return projectRepository.create({
      title: data.title,
      description: data.description,
      client: new Types.ObjectId(data.client),
      status: data.status,
      priority: data.priority,
      budget: data.budget,
      startDate,
      endDate,
      createdBy: new Types.ObjectId(userId),
      assignedTo: assignedUsers,
    });
  }

  async getProjects() {
    return projectRepository.getAllProjects();
  }

  async searchProjects(
    query: ProjectQueryDto
  ) {
    return projectRepository.searchProjects(query);
  }

  async getProjectById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError(
        400,
        "Invalid project ID"
      );
    }

    const project =
      await projectRepository.getProjectById(id);

    if (!project) {
      throw new ApiError(
        404,
        "Project not found"
      );
    }

    return project;
  }

  async updateProject(
    id: string,
    data: UpdateProjectDto
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError(
        400,
        "Invalid project ID"
      );
    }

    const updateData: Partial<{
      title: string;
      description: string;
      client: Types.ObjectId;
      status:
        | "planning"
        | "active"
        | "completed"
        | "on-hold";
      priority:
        | "low"
        | "medium"
        | "high"
        | "critical";
      budget: number;
      startDate: Date;
      endDate: Date;
      assignedTo: Types.ObjectId[];
    }> = {};

    if (data.title !== undefined) {
      updateData.title = data.title;
    }

    if (data.description !== undefined) {
      updateData.description = data.description;
    }

    if (data.status !== undefined) {
      updateData.status = data.status;
    }

    if (data.priority !== undefined) {
      updateData.priority = data.priority;
    }

    if (data.budget !== undefined) {
      updateData.budget = data.budget;
    }

    if (data.client !== undefined) {
      if (!Types.ObjectId.isValid(data.client)) {
        throw new ApiError(
          400,
          "Invalid client ID"
        );
      }

      updateData.client =
        new Types.ObjectId(data.client);
    }

    if (data.assignedTo !== undefined) {
      updateData.assignedTo =
        data.assignedTo.map(
          (assignedUserId) => {
            if (
              !Types.ObjectId.isValid(
                assignedUserId
              )
            ) {
              throw new ApiError(
                400,
                `Invalid assigned user ID: ${assignedUserId}`
              );
            }

            return new Types.ObjectId(
              assignedUserId
            );
          }
        );
    }

    if (data.startDate !== undefined) {
      const startDate =
        new Date(data.startDate);

      if (Number.isNaN(startDate.getTime())) {
        throw new ApiError(
          400,
          "Invalid start date"
        );
      }

      updateData.startDate = startDate;
    }

    if (data.endDate !== undefined) {
      const endDate =
        new Date(data.endDate);

      if (Number.isNaN(endDate.getTime())) {
        throw new ApiError(
          400,
          "Invalid end date"
        );
      }

      updateData.endDate = endDate;
    }

    if (
      updateData.startDate &&
      updateData.endDate &&
      updateData.endDate < updateData.startDate
    ) {
      throw new ApiError(
        400,
        "End date cannot be before start date"
      );
    }

    const project =
      await projectRepository.updateProject(
        id,
        updateData
      );

    if (!project) {
      throw new ApiError(
        404,
        "Project not found"
      );
    }

    return project;
  }

  async deleteProject(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError(
        400,
        "Invalid project ID"
      );
    }

    const project =
      await projectRepository.deleteProject(id);

    if (!project) {
      throw new ApiError(
        404,
        "Project not found"
      );
    }

    return project;
  }
}

export default new ProjectService();
