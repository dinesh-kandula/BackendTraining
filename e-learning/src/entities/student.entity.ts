import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Course } from "./course.entity";
import { Review } from "./review.entity";
import { StudentCourse } from "./student-course.entity";

enum Gender {
  male = "M",
  female = "F",
  other = "O",
}

@Entity("student")
export class Student {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  fullName: string;

  @Column({ type: "varchar", length: 300, nullable: false, unique: true })
  email: string;

  @Column({ type: "int", nullable: false })
  age: number;

  @Column({ type: "enum", enum: Gender })
  gender: Gender;

  @ManyToMany(() => Course, (course) => course.students)
  courses: Course[];

  @OneToMany(() => Review, (review) => review.student)
  reviews: Review[];

  @OneToMany(() => StudentCourse, (enrollment) => enrollment.student)
  enrollments: StudentCourse[];
}
