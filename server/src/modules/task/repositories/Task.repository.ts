import { BaseRepository } from "../../../common/database/BaseRepository";

import TaskModel, {
  ITask,
} from "../models/Task.model";

class TaskRepository extends BaseRepository<ITask> {
  constructor() {
    super(TaskModel);
  }

  async getAllTasks() {
    return this.findAll({
      populate: [
        { path: "project" },
        { path: "assignedTo" },
        { path: "createdBy" },
      ],
      sort: {
        createdAt: -1,
      },
    });
  }

  async getTaskById(id: string) {
    return this.findById(id, {
      populate: [
        { path: "project" },
        { path: "assignedTo" },
        { path: "createdBy" },
      ],
    });
  }

  async findByProject(projectId: string) {
    return this.findAll({
      filter: {
        project: projectId,
      },
      populate: [
        { path: "assignedTo" },
        { path: "createdBy" },
      ],
      sort: {
        createdAt: -1,
      },
    });
  }

  async updateTask(
    id: string,
    data: Partial<ITask>
  ) {
    return this.update(id, data);
  }

  async deleteTask(id: string) {
    return this.delete(id);
  }
}

export default new TaskRepository();