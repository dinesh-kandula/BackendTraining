import { Request, Response } from "express";
import StudentService from "../services/student.service";
import { Student } from "../entities/student.entity";

class StudentController {
  // Get the list of all the students
  getStudents = async (req: Request, res: Response): Promise<Response> => {
    let students: Student[];
    try {
      students = await StudentService.getStudents();
      return res.status(200).json(students);
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  };
}

export default new StudentController();
