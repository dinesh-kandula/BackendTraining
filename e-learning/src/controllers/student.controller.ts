import { Request, Response } from "express";
import { validationResult } from "express-validator";

import studentService from "../services/student.service";
import { Student } from "../entities/student.entity";
import { UpdateResult } from "typeorm";
import { ExtendedRequest } from "../enums/email-payload";

class StudentController {
  addStudent = async (req: Request, res: Response): Promise<Response> => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ erros: result.array() });
    }
    let newStudents: {};

    try {
      newStudents = await studentService.createStudent(req);
      return res.json(newStudents).status(201);
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  };

  loginStudent = async (req: Request, res: Response): Promise<Response> => {
    try {
      const loginResult: {
        message: string;
        result: boolean;
      } = await studentService.loginStudent(req);

      if (loginResult.result) {
        return res.status(200).json(loginResult);
      } else {
        return res.status(401).json(loginResult);
      }
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  };

  getCurrentStudent = async (req: ExtendedRequest, res: Response) => {
    let student: Student;
    try {
      student = await studentService.getCurrentStudentByEmail(req);
      return res.status(200).json(student);
    } catch (error) {
      return res.json({ error: `Internal Server Error ${error}` }).status(500);
    }
  };

  // Get the list of all the students
  getStudents = async (req: Request, res: Response): Promise<Response> => {
    let students: Student[];
    try {
      students = await studentService.getStudents();
      return res.status(200).json(students);
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  };

  updateStudent = async (req: Request, res: Response): Promise<Response> => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ erros: result.array() });
    }

    let updateStudent: UpdateResult;
    try {
      updateStudent = await studentService.updateStudent(
        parseInt(req.params.id),
        req.body.fullName
      );
      return res.status(200).json({ updatedStudent: updateStudent });
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  };

  deleteStudent = async (req: Request, res: Response): Promise<Response> => {
    let deleteResult;
    try {
      deleteResult = studentService.deleteStudent(parseInt(req.params.id));
      return res.status(200).json(deleteResult);
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  };
}

export default new StudentController();
