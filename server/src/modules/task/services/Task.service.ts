import { Types } from "mongoose";

import taskRepository from "../repositories/Task.repository";

import { CreateTaskDto } from "../dto/CreateTask.dto";
import { UpdateTaskDto } from "../dto/UpdateTask.dto";

import { ApiError } from "../../../utils/ApiError";

class TaskService {
  async createTask(
    data: CreateTaskDto,
    userId: string
  ) {
    if (new Date(data.dueDate) < new Date()) {
      throw new ApiError(
        400,
        "Due date cannot be in the past"
      );
    }

    return taskRepository.create({
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      estimatedHours: data.estimatedHours,
      dueDate: data.dueDate,
      project: new Types.ObjectId(data.project),
      assignedTo: new Types.ObjectId(data.assignedTo),
      createdBy: new Types.ObjectId(userId),
    });
  }

  async getTasks() {
    return taskRepository.findAll();
  }

  async getTaskById(id: string) {
    const task = await taskRepository.findById(id);

    if (!task) {
      throw new ApiError(
        404,
        "Task not found"
      );
    }

    return task;
  }

  async updateTask(
    id: string,
    data: UpdateTaskDto
  ) {
    const updateData: any = { ...data };

    if (data.project) {
      updateData.project = new Types.ObjectId(
        data.project
      );
    }

    if (data.assignedTo) {
      updateData.assignedTo = new Types.ObjectId(
        data.assignedTo
      );
    }

    const task = await taskRepository.update(
      id,
      updateData
    );

    if (!task) {
      throw new ApiError(
        404,
        "Task not found"
      );
    }

    return task;
  }

  async deleteTask(id: string) {
    const task = await taskRepository.delete(id);

    if (!task) {
      throw new ApiError(
        404,
        "Task not found"
      );
    }

    return;
  }
}

export default new TaskService();