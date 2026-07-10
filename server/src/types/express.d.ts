import { Types } from "mongoose";

declare global {
  namespace Express {
    interface UserPayload {
      _id: Types.ObjectId;
      email: string;
      role: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};