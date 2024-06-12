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
import Department from "../../models/department.model";

import { UniversityEntity } from "./university.entity";
import { UserEntity } from "./user.entity";

@Entity("class")
export class ClassEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  department!: Department

  @ManyToOne(() => UniversityEntity, (university) => university.classes)
  @JoinColumn({ name: "universityId" })
  universityId!: string

  @ManyToMany(() => UserEntity, (users) => users.classes)
  @JoinTable()
  users!: string[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}