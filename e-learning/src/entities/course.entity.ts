import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany
} from "typeorm";
import { Student } from "./student.entity";
import { Instructor } from "./instructor.entity";
import { Review } from "./review.entity";
import { StudentCourse } from "./student-course.entity";

@Entity()
export class Course {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false})
  duration: string;

  @ManyToOne(() => Instructor, (instructor) => instructor.courses)
  instructor: Instructor;

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];

  @OneToMany(() => StudentCourse, (enrollment) => enrollment.course)
  enrollments: StudentCourse[];

  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[];
}
