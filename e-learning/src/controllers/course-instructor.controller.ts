import { Request, Response } from "express";
import { Course } from "../entities/course.entity";
import courseInstructorService from "../services/course-instructor.service";

class CourseInstructorController {
  // Fetch all the courses that are being taught by “instructorId”.
  getCoursesTaughtByInstructor = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let courses: Course[];
    try {
      courses = await courseInstructorService.getCoursesTaughtByInstructor(parseInt(req.params.instructorId));
      return res.status(200).json(courses);
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  };
}

export default new CourseInstructorController();
