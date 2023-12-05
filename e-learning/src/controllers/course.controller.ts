import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Course } from "../entities/course.entity";
import courseService from "../services/course.service";

class CourseController {
  getCourseById = async (req: Request, res: Response): Promise<Response> => {
    let course: Course;
    try {
      course = await courseService.getCurrentCourse(parseInt(req.params.id));
      return res.status(200).json(course);
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  };

  // Get the list of all the Courses
  getAllCourses = async (req: Request, res: Response): Promise<Response> => {
    let courses: Course[];
    try {
      courses = await courseService.getCourses();
      return res.status(200).json(courses);
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  };

  addCourse = async (req: Request, res: Response): Promise<Response> => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ erros: result.array() });
    }

    let newCourse: Course;
    try {
      newCourse = await courseService.addCourse(req);
      return res.json(newCourse).status(201);
    } catch (error) {
      return res.json({ error: error }).status(500);
    }
  };
}

export default new CourseController();
