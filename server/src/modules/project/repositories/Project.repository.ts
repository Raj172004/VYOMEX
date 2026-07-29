import { BaseRepository } from "../../../common/database/BaseRepository";

import ProjectModel, {
  IProject,
} from "../models/Project.model";

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