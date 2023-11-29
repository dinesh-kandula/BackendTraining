// import { Request } from "express";
import { UpdateResult, DeleteResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Student } from "../entities/student.entity";
import { Gender } from "../enums/gender";

class StudentSerivce {
  getCurrentStudent = async (id: number): Promise<Student> => {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const student = await studentRepository.findOneBy({ id: id });
      if (student === null) {
        console.log("No Id found with given Student Id");
        throw "No Id found with given Student Id";
      } else {
        return student;
      }
    } catch (error) {
      console.error(`Error getting current student with id ${id}:`, error);
      throw error;
    }
  };

  getStudents = async (): Promise<Student[]> => {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const students = await studentRepository.find();
      return students;
    } catch (error) {
      console.error(`Error Getting all students data`, error);
      throw error;
    }
  };

  createStudent = async (body: {
    fullName: string;
    email: string;
    age: number;
    gender: string;
  }): Promise<Student> => {
    try {
      // Define Repository and Entity Instance
      const studentRepository = AppDataSource.getRepository(Student);
      const studentEntity = new Student();

      // Assign values to the instance of students from the request
      studentEntity.fullName = body.fullName;
      studentEntity.email = body.email;
      studentEntity.age = body.age;
      // Map gender input to the corresponding enum value
      switch (body.gender.toUpperCase()) {
        case "M":
          studentEntity.gender = Gender.male;
          break;
        case "F":
          studentEntity.gender = Gender.female;
          break;
        default:
          studentEntity.gender = Gender.other;
          break;
      }

      // Save in the Repository
      const savedStudent = await studentRepository.save(studentEntity);
      return savedStudent;
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    }
  };

  updateStudent = async (
    id: number,
    fullName: string
  ): Promise<UpdateResult> => {
    let updateStudent: UpdateResult;
    try {
      // Define Repository and Entity Instance
      const studentRepository = AppDataSource.getRepository(Student);
      updateStudent = await studentRepository
        .createQueryBuilder()
        .update()
        .set({ fullName: fullName })
        .where("id = :id", { id: id })
        .execute();
      return updateStudent;
    } catch (error) {
      console.error(`Error updating student with id ${id}:`, error);
      throw error;
    }
  };

  deleteStudent = async (id: number): Promise<DeleteResult> => {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const studentEntity = await this.getCurrentStudent(id);
      const deletedStudent = await studentRepository.delete(studentEntity);
      return deletedStudent;
    } catch (error) {
      console.error(`Error Deleting student with id ${id}:`, error);
      throw error;
    }
  };
}

export default new StudentSerivce();
