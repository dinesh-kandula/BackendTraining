import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { ExtendedRequest, Payload } from "../enums/email-payload";

dotenv.config();

export const verifyTokenMiddleware = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | NextFunction | void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ error: "Missing Authorization Token." });
  }

  jwt.verify(
    String(token),
    String(process.env.MY_SECRET_KEY) as jwt.Secret,
    (err: jwt.VerifyErrors | null, payload: Payload | any): any => {
      if (err) {
        return res.status(401).json({ error: "Invalid Token." });
      }
      req.email = payload.email;
      req.id = payload.id;
      return next();
    }
  );
};
