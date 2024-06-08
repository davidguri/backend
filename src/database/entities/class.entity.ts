import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";
import Department from "../../models/department.model";

import { UniversityEntity } from "./university.entity";

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

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}