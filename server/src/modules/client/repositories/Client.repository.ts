import ClientModel, {
  IClient,
} from "../models/Client.model";

class ClientRepository {
  create(data: Partial<IClient>) {
    return ClientModel.create(data);
  }

  findAll() {
    return ClientModel.find().populate("createdBy");
  }

  findById(id: string) {
    return ClientModel.findById(id).populate(
      "createdBy"
    );
  }

  update(
    id: string,
    data: Partial<IClient>
  ) {
    return ClientModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    ).populate("createdBy");
  }

  delete(id: string) {
    return ClientModel.findByIdAndDelete(id);
  }
}

export default new ClientRepository();