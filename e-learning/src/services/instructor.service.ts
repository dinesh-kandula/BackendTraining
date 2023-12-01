import { Request } from "express";

import { AppDataSource } from "../data-source";
import { Instructor } from "../entities/instructor.entity";
import { UpdateResult, DeleteResult } from "typeorm";
import { Gender } from "../enums/gender";

class InstructorService {
  getCurrentInstructor = async (id: number): Promise<Instructor> => {
    try {
      const instructorRepository = AppDataSource.getRepository(Instructor);
      const instructor = await instructorRepository.findOneBy({ id: id });
      if (instructor === null) {
        console.log("No Id found with given Instructor Id");
        throw "No Id found with given Instructor Id";
      } else {
        return instructor;
      }
    } catch (error) {
      console.error(`Error Getting Current student with id ${id}:`, error);
      throw error;
    }
  };

  getInstructor = async () => {
    try {
      const instructorRepository = AppDataSource.getRepository(Instructor);
      const instructors = await instructorRepository.find();
      return instructors;
    } catch (error) {
      console.error("Error Getting all Instructors Data:", error);
      throw error;
    }
  };

  createInstructor = async (req: Request): Promise<Instructor> => {
    try {
      const instructorRepository = AppDataSource.getRepository(Instructor);
      const instructor = new Instructor();

      instructor.fullName = req.body.fullName;
      instructor.email = req.body.email;
      // Map gender input to the corresponding enum value
      switch (req.body.gender.toUpperCase()) {
        case "M":
          instructor.gender = Gender.male;
          break;
        case "F":
          instructor.gender = Gender.female;
          break;
        default:
          instructor.gender = Gender.other;
          break;
      }

      const newInstrcutor = await instructorRepository.save(instructor);
      return newInstrcutor;
    } catch (error) {
      console.error("Error Creating Instructor:", error);
      throw error;
    }
  };

  updateInstructor = async (req: Request): Promise<UpdateResult> => {
    try {
      const instructorRepository = AppDataSource.getRepository(Instructor);
      let updatedInstructor: UpdateResult;
      updatedInstructor = await instructorRepository
        .createQueryBuilder()
        .update()
        .set({ fullName: req.body.fullName })
        .where({ id: req.params.id })
        .execute();
      return updatedInstructor;
    } catch (error) {
      console.error("Error Updating Instructor:", error);
      throw error;
    }
  };

  deleteInstructor = async (id: number) => {
    try {
      const instructorRepository = AppDataSource.getRepository(Instructor);
      const instructorEntity = await this.getCurrentInstructor(id);
      const deletedResult: DeleteResult = await instructorRepository.delete(
        instructorEntity
      );
      return deletedResult;
    } catch (error) {
      console.error(`Error Deleting Instructor with id ${id}:`, error);
      throw error;
    }
  };
}

export default new InstructorService();
