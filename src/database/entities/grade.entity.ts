import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm"

@Entity("grade")
export class GradeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  grade!: number

  @Column()
  percentage!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}