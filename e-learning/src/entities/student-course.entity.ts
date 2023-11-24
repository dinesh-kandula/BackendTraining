import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Course } from "./course.entity";
import { Student } from "./student.entity";

@Entity()
export class StudentCourse {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Course, (course) => course.enrollments)
  course: Course;

  @ManyToOne(() => Student, (student) => student.enrollments)
  student: Student;

  @Column({type: "int"})
  score: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
  enrollment_date: Date;
}
