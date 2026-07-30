import { BaseRepository } from "../../../common/database/BaseRepository";
import { QueryBuilder } from "../../../common/query/QueryBuilder";
import { SearchBuilder } from "../../../common/query/SearchBuilder";
import { FilterBuilder } from "../../../common/query/FilterBuilder";

import TaskModel, {
  ITask,
} from "../models/Task.model";

import { TaskQueryDto } from "../dto/TaskQuery.dto";

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

  async searchTasks(
    query: TaskQueryDto
  ) {
    const {
      page = 1,
      limit = 10,
      search,
      project,
      assignedTo,
      status,
      priority,
      sortBy = "createdAt",
      order = "desc",
    } = query;

    const pagination = QueryBuilder.build({
      page,
      limit,
      sortBy,
      order,
    });

    const searchFilter = SearchBuilder.build(
      search,
      [
        "title",
        "description",
      ]
    );

    const filters = FilterBuilder.build({
      project,
      assignedTo,
      status,
      priority,
    });

    const filter: Record<string, unknown> = {
      ...searchFilter,
      ...filters,
    };

    return this.paginate(
      filter,
      pagination.page,
      pagination.limit,
      pagination.sort,
      [
        { path: "project" },
        { path: "assignedTo" },
        { path: "createdBy" },
      ]
    );
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