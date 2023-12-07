import { Request, Response, NextFunction } from "express";

import { AppDataSource } from "../data-source";
import { Student } from "../entities/student.entity";

export const verifyStudentExistsMiddlewareWithIdInParams = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const studentRepository = AppDataSource.getRepository(Student);
  const studentExists = await studentRepository.findOneBy({
    id: parseInt(req.params.id),
  });

  if (!studentExists) {
    return res
      .status(404)
      .json({ error: `Student not found with student Id : ${req.params.id}` });
  }
  return next();
};

export const verifyStudentEmailNotExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | NextFunction | void> => {
  const studentRepository = AppDataSource.getRepository(Student);
  const studentEmailExists = await studentRepository.findOneBy({
    email: req.body.email,
  });

  if (studentEmailExists) {
    return res.status(404).json({
      error: "Email already exists, you can try logging in with this email.",
    });
  }
  return next();
};

export const verifyStudentEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const studentRepository = AppDataSource.getRepository(Student);
  const studentEmailExists = await studentRepository.findOneBy({
    email: req.body.email,
  });

  if (!studentEmailExists) {
    return res.status(404).json({
      error: "Your not the registered student, Please register yourself",
    });
  }
  return next();
};
