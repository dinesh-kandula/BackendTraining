import { Request } from "express";
// import { UpdateResult, DeleteResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Course } from "../entities/course.entity";
// import bcrypt from "bcrypt";

class CourseSerivce {
  getCurrentCourse = async (id: number): Promise<Course> => {
    try {
      const courseRepository = AppDataSource.getRepository(Course);
      const course = await courseRepository.findOneBy({ id: id });
      if (course === null) {
        console.log("No course found with given Course Id");
        throw "No course found with given Course Id";
      } else {
        return course;
      }
    } catch (error) {
      console.error(`Error Getting Current course with id ${id}:`, error);
      throw error;
    }
  };

  getCourses = async () => {
    try {
      const courseRepository = AppDataSource.getRepository(Course);
      const courses = await courseRepository.find();
      return courses;
    } catch (error) {
      console.error("Error Getting all Courses Data:", error);
      throw error;
    }
  };

  addCourse = async (req: Request): Promise<Course> => {
    try {
      const courseRepository = AppDataSource.getRepository(Course);
      const course = new Course();

      if (course.id) {
        course.id = req.body.id;
      }
      course.name = req.body.name;
      course.duration = req.body.duration;
      course.instructor = req.body.instructorId;

      const newCourse = await courseRepository.save(course);
      return newCourse;
    } catch (error) {
      console.error("Error Adding new Course:", error);
      throw error;
    }
  };
}

export default new CourseSerivce();
