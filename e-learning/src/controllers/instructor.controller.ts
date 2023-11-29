import { Request, Response } from "express";
import instructorService from "../services/instructor.service";
import { Instructor } from "../entities/instructor.entity";
import { validationResult } from "express-validator";

class InstructorController {
  // Get the list of all the Instructors
  getInstructor = async (req: Request, res: Response): Promise<Response> => {
    let instructors: Instructor[];
    try {
      instructors = await instructorService.getInstructor();
      return res.status(200).json(instructors);
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  };

  createInstructor = async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ erros: result.array() });
    }

    let newInstrcutor: Instructor;
    try {
      newInstrcutor = await instructorService.createInstructor(req);
      return res.json(newInstrcutor).status(201);
    } catch (error) {
      return res.json({ error: error }).status(500);
    }
  };

  updateInstructor = async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ erros: result.array() });
    }

    let updatedResult;
    try {
      updatedResult = await instructorService.updateInstructor(req);
      return res.json(updatedResult).status(200);
    } catch (error) {
      return res.json({ error: error }).status(500);
    }
  };

  deleteInstructor = async (req: Request, res: Response) => {};
}

export default new InstructorController();
