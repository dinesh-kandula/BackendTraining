import { Request } from "express";

export interface Payload {
  email: string;
  id: number;
}

export interface ExtendedRequest extends Request {
  email?: string;
  id?: number;
}
