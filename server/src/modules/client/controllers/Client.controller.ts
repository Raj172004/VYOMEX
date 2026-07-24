import { Request, Response, NextFunction } from "express";

import clientService from "../services/Client.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const client = await clientService.createClient(
      req.body,
      req.user!._id.toString()
    );

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clients = await clientService.getClients();

    res.json({
      success: true,
      data: clients,
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;

    const client = await clientService.getClientById(id);

    res.json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;

    const client = await clientService.updateClient(
      id,
      req.body
    );

    res.json({
      success: true,
      message: "Client updated successfully",
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;

    await clientService.deleteClient(id);

    res.json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};