import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { UserEntity } from "./user.entity"
import { ClassEntity } from "./class.entity"

@Entity("grade")
export class GradeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  grade!: number

  @Column()
  percentage!: number

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  userId!: string

  @OneToOne(() => ClassEntity)
  @JoinColumn({ name: "classId" })
  classId!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}