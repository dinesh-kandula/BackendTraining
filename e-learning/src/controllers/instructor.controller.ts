import { Request, Response } from "express";
import instructorService from "../services/instructor.service";
import { Instructor } from "../entities/instructor.entity";

class InstructorController {
  // Get the list of all the Instructors
  getInstructor = async (req: Request, res: Response): Promise<Response> => {
    let instructors: Instructor[];
    try {
      instructors = await instructorService.getInstructos();
      return res.status(200).json(instructors);
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  };
}

export default new InstructorController();
