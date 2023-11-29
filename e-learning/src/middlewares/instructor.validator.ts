import { Request, Response, NextFunction } from "express";

import { AppDataSource } from "../data-source";
import { Instructor } from "../entities/instructor.entity";

export const verifyInstructorExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const instructorRepository = AppDataSource.getRepository(Instructor);
  const instructorExists = await instructorRepository.findOneBy({
    id: parseInt(req.params.id),
  });

  if (!instructorExists) {
    return res.status(404).json({
      error: `Instructor not found with Instructor Id : ${req.params.id}`,
    });
  }
  return next();
};

export const verifyInstructorEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const instructorRepository = AppDataSource.getRepository(Instructor);
  const instructorEmailExists = await instructorRepository.findOneBy({
    email: req.body.email,
  });

  if (instructorEmailExists) {
    return res.status(404).json({
      error: "Email already exists, you can try logging in with this email.",
    });
  }
  return next();
};
