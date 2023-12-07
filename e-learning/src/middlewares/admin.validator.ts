import { Request, Response, NextFunction } from "express";

import { AppDataSource } from "../data-source";
import { Admin } from "../entities/admin.entity";
import { ExtendedRequest } from "../enums/email-payload";

export const verifyAdminExistsMiddlewareWithIdInParams = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const adminRepository = AppDataSource.getRepository(Admin);
  const adminExists = await adminRepository.findOneBy({
    id: parseInt(req.params.id),
  });

  if (!adminExists) {
    return res
      .status(404)
      .json({ error: `Admin not found with Admin Id : ${req.params.id}` });
  }
  return next();
};

export const verifyAdminEmailNotExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | NextFunction | void> => {
  const adminRepository = AppDataSource.getRepository(Admin);
  const adminEmailExists = await adminRepository.findOneBy({
    email: req.body.email,
  });

  if (adminEmailExists) {
    return res.status(404).json({
      error: "Email already exists, you can try logging in with this email.",
    });
  }
  return next();
};

export const verifyAdminEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adminRepository = AppDataSource.getRepository(Admin);
  const adminEmailExists = await adminRepository.findOneBy({
    email: req.body.email,
  });

  if (!adminEmailExists) {
    return res.status(404).json({
      error: "Your not the registered admin, Please register yourself",
    });
  }
  return next();
};

export const verifyAdminEmailExistsMiddlewareAfterToken = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const adminRepository = AppDataSource.getRepository(Admin);
  const adminEmailExists = await adminRepository.findOneBy({
    email: req.email,
  });

  if (!adminEmailExists) {
    return res.status(404).json({
      error: "Your not the registered admin, Please register yourself",
    });
  }
  return next();
};
