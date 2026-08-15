import {
  Request,
  Response,
  NextFunction,
} from "express";

import clientService from "../services/Client.service";
import { ApiError } from "../../../utils/ApiError";

class ClientController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId =
        req.user!._id.toString();

      const client =
        await clientService.createClient(
          req.body,
          userId
        );

      return res.status(201).json({
        success: true,
        message:
          "Client created successfully",
        data: client,
      });
    } catch (error) {
      next(error);
    }
  }

  async getClients(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId =
        req.user!._id.toString();

      const search =
        typeof req.query.search === "string"
          ? req.query.search
          : "";

      const clients =
        await clientService.getClients(
          userId,
          search
        );

      /*
       * Client data is authenticated and user-specific.
       * Do not allow browser/proxy caching to turn
       * authenticated API responses into stale 304 data.
       */
      res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );

      res.setHeader(
        "Pragma",
        "no-cache"
      );

      res.setHeader(
        "Expires",
        "0"
      );

      return res.status(200).json({
        success: true,
        data: clients,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const client =
        await clientService.getClientById(
          String(req.params.id),
          req.user!._id.toString()
        );

      if (!client) {
        throw new ApiError(
          404,
          "Client not found"
        );
      }

      return res.status(200).json({
        success: true,
        data: client,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const client =
        await clientService.updateClient(
          String(req.params.id),
          req.user!._id.toString(),
          req.body
        );

      if (!client) {
        throw new ApiError(
          404,
          "Client not found"
        );
      }

      return res.status(200).json({
        success: true,
        message:
          "Client updated successfully",
        data: client,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const client =
        await clientService.deleteClient(
          String(req.params.id),
          req.user!._id.toString()
        );

      if (!client) {
        throw new ApiError(
          404,
          "Client not found"
        );
      }

      return res.status(200).json({
        success: true,
        message:
          "Client deleted successfully",
        data: client,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ClientController();
