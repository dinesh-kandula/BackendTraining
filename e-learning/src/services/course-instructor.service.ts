import { AppDataSource } from "../data-source";
import { Course } from "../entities/course.entity";
import { Instructor } from "../entities/instructor.entity";

class CourseInstructorSerivce {
  getCoursesTaughtByInstructor = async (
    instructorId: number
  ): Promise<Course[]> => {
    try {
      const courseRepository = AppDataSource.getRepository(Course);
      const courses = await courseRepository
        .createQueryBuilder("course")
        .select([
          "course.id AS course_id",
          "course.name AS course_name",
          "course.duration AS course_duration",
          "instructor.fullName AS instructor_name",
        ])
        .innerJoin(
          Instructor,
          "instructor",
          "course.instructorId = instructor.id"
        )
        .where("instructor.id = :id", { id: instructorId })
        .getRawMany();
      return courses;
    } catch (error) {
      console.error("Error Getting all Courses Data:", error);
      throw error;
    }
  };
}

export default new CourseInstructorSerivce();
