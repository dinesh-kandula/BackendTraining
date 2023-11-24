// review.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Course } from "./course.entity";
import { Student } from "./student.entity";

@Entity()
export class Review {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false, type: "longtext" })
  content: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  created_at: Date;

  @ManyToOne(() => Course, (course) => course.reviews)
  course: Course;

  @ManyToOne(() => Student, (student) => student.reviews)
  student: Student;
}
