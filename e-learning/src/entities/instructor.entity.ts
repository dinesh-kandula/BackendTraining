import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Course } from "./course.entity";

enum Gender {
  male = "M",
  female = "F",
  other = "O",
}

@Entity("instructor")
export class Instructor {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  fullName: string;

  @Column({ type: "enum", enum: Gender })
  gender: Gender;

  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];
}
