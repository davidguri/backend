import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, ManyToMany } from "typeorm";
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
  university!: UniversityEntity

  @ManyToMany(() => UserEntity, (users) => users.classes)
  users?: UserEntity[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}