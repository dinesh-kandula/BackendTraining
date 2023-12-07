import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  fullName: string;

  @Column({ type: "varchar", length: 300, nullable: false, unique: true })
  email: string;

  @Column({ type: "text", nullable: false })
  passsword: string;

  @Column({ type: "text", nullable: false })
  salt: string;
}
