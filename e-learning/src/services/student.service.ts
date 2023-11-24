// import { Request } from "express";

import { AppDataSource } from "../data-source";
import { Student } from "../entities/student.entity";

class StudentSerivce {
  getStudents = async () => {
    const studentRepository = AppDataSource.getRepository(Student);
    const students = await studentRepository.find();
    return students;
  };
}

export default new StudentSerivce();
