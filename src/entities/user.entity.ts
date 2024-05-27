import Department from "../models/department.model";
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm"
import { Role } from "../models/user.model";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string
  // in a database, strings are stored as varchar with specific length

  @Column()
  email!: string

  @Column()
  role!: Role

  @Column({
    type: "enum", enum: Department, default: Department.Science
  })
  department!: Department

  @CreateDateColumn()
  createdAt!: string

  @UpdateDateColumn()
  updatedAt!: string
}