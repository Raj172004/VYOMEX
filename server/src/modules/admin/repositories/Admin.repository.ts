import { User } from "../../user/models/User.model";
import Client from "../../client/models/Client.model";
import Project from "../../project/models/Project.model";
import Task from "../../task/models/Task.model";
import { Invoice } from "../../invoice/models/Invoice.model";

class AdminRepository {
  async getDashboardStats() {
    const [
      totalUsers,
      totalClients,
      totalProjects,
      totalTasks,
      totalInvoices,
    ] = await Promise.all([
      User.countDocuments(),
      Client.countDocuments(),
      Project.countDocuments(),
      Task.countDocuments(),
      Invoice.countDocuments(),
    ]);

    return {
      totalUsers,
      totalClients,
      totalProjects,
      totalTasks,
      totalInvoices,
    };
  }
}

export default new AdminRepository();