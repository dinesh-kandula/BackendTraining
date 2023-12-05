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
    id: parseInt(req.params.instructorId),
  });

  if (!instructorExists) {
    return res.status(404).json({
      error: `Instructor not found with Instructor Id : ${req.params.id}`,
    });
  }
  return next();
};
