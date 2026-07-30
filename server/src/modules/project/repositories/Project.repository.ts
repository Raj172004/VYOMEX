import { BaseRepository } from "../../../common/database/BaseRepository";
import { QueryBuilder } from "../../../common/query/QueryBuilder";
import { SearchBuilder } from "../../../common/query/SearchBuilder";
import { FilterBuilder } from "../../../common/query/FilterBuilder";

import ProjectModel, {
  IProject,
} from "../models/Project.model";

import { ProjectQueryDto } from "../dto/ProjectQuery.dto";

class ProjectRepository extends BaseRepository<IProject> {
  constructor() {
    super(ProjectModel);
  }

  async findByTitle(title: string) {
    return this.findOne({ title });
  }

  async findByClient(clientId: string) {
    return this.findAll({
      filter: {
        client: clientId,
      },
      populate: [
        {
          path: "client",
        },
      ],
      sort: {
        createdAt: -1,
      },
    });
  }

  async getAllProjects() {
    return this.findAll({
      populate: [
        {
          path: "client",
        },
        {
          path: "createdBy",
        },
        {
          path: "assignedTo",
        },
      ],
      sort: {
        createdAt: -1,
      },
    });
  }

  async searchProjects(
    query: ProjectQueryDto
  ) {
    const {
      page = 1,
      limit = 10,
      search,
      client,
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
      client,
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
        {
          path: "client",
        },
        {
          path: "createdBy",
        },
        {
          path: "assignedTo",
        },
      ]
    );
  }

  async getProjectById(id: string) {
    return this.findById(id, {
      populate: [
        {
          path: "client",
        },
        {
          path: "createdBy",
        },
        {
          path: "assignedTo",
        },
      ],
    });
  }

  async updateProject(
    id: string,
    data: Partial<IProject>
  ) {
    return this.update(id, data);
  }

  async deleteProject(id: string) {
    return this.delete(id);
  }
}

export default new ProjectRepository();