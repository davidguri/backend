import Department from "../../models/department.model";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable
} from "typeorm";
import { Role } from "../../models/user.model";

import { UniversityEntity } from "./university.entity";
import { ClassEntity } from "./class.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @ManyToOne(() => UniversityEntity, (university) => university.users)
  @JoinColumn({ name: "universityId" })
  universityId!: string

  @ManyToMany(() => ClassEntity, (classObject) => classObject.users)
  @JoinTable()
  classes!: string[]

  @Column()
  role!: Role

  @Column()
  password!: string

  @Column({
    type: "enum", enum: Department, default: Department.Science
  })
  department!: Department

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}