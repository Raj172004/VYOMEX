import Project, { IProject } from "../models/Project.model";

import { CreateProjectDto } from "../dto/CreateProject.dto";
import { UpdateProjectDto } from "../dto/UpdateProject.dto";

class ProjectRepository {
  async create(data: Partial<IProject>) {
    return Project.create(data);
  }

  async findAll() {
    return Project.find()
      .populate("createdBy", "firstName lastName email")
      .populate("assignedTo", "firstName lastName email");
  }

  async findById(id: string) {
    return Project.findById(id)
      .populate("createdBy", "firstName lastName email")
      .populate("assignedTo", "firstName lastName email");
  }

  async update(
    id: string,
    data: UpdateProjectDto
  ) {
    return Project.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return Project.findByIdAndDelete(id);
  }
}

export default new ProjectRepository();