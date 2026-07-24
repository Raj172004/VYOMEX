import Task, { ITask } from "../models/Task.model";

class TaskRepository {
  async create(data: Partial<ITask>) {
    return Task.create(data);
  }

  async findAll() {
    return Task.find()
      .populate("project")
      .populate("assignedTo")
      .populate("createdBy");
  }

  async findById(id: string) {
    return Task.findById(id)
      .populate("project")
      .populate("assignedTo")
      .populate("createdBy");
  }

  async update(
    id: string,
    data: Partial<ITask>
  ) {
    return Task.findByIdAndUpdate(id, data, {
      new: true,
    })
      .populate("project")
      .populate("assignedTo")
      .populate("createdBy");
  }

  async delete(id: string) {
    return Task.findByIdAndDelete(id);
  }
}

export default new TaskRepository();