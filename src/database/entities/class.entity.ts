import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm"
import Department from "../../models/department.model"

@Entity("class")
export class ClassEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  department!: Department

  @CreateDateColumn()
  createdAt!: string

  @UpdateDateColumn()
  updatedAt!: string
}