// import { Request } from "express";

import { AppDataSource } from "../data-source";
import { Instructor } from "../entities/instructor.entity";

class InstructorService {
  getInstructos = async () => {
    const instructorRepository = AppDataSource.getRepository(Instructor);
    const instructors = await instructorRepository.find();
    return instructors;
  };
}

export default new InstructorService();
