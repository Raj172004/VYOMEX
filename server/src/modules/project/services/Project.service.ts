import { Types } from "mongoose";

import projectRepository from "../repositories/Project.repository";

import { CreateProjectDto } from "../dto/CreateProject.dto";
import { UpdateProjectDto } from "../dto/UpdateProject.dto";

import { ApiError } from "../../../utils/ApiError";

class ProjectService {
  async createProject(
    data: CreateProjectDto,
    userId: string
  ) {
    if (new Date(data.endDate) < new Date(data.startDate)) {
      throw new ApiError(
        400,
        "End date cannot be before start date"
      );
    }

    const assignedUsers =
      data.assignedTo?.map(
        (id) => new Types.ObjectId(id)
      ) ?? [];

    return projectRepository.create({
      title: data.title,
      description: data.description,
      client: new Types.ObjectId(data.client),
      status: data.status,
      priority: data.priority,
      budget: data.budget,
      startDate: data.startDate,
      endDate: data.endDate,
      createdBy: new Types.ObjectId(userId),
      assignedTo: assignedUsers,
    });
  }

  async getProjects() {
    return projectRepository.findAll();
  }

  async getProjectById(id: string) {
    const project = await projectRepository.findById(id);

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
    const updateData: Record<string, unknown> = {
      ...data,
    };

    if (data.client) {
      updateData.client = new Types.ObjectId(data.client);
    }

    if (data.assignedTo) {
      updateData.assignedTo = data.assignedTo.map(
        (id) => new Types.ObjectId(id)
      );
    }

    const project = await projectRepository.update(
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
    const project = await projectRepository.delete(id);

    if (!project) {
      throw new ApiError(
        404,
        "Project not found"
      );
    }
  }
}

export default new ProjectService();