import Department from "../../models/department.model";
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm"
import { Role } from "../../models/user.model";
import { UniversityEntity } from "./university.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string
  // in a database, strings are stored as varchar with specific length

  @Column()
  email!: string

  @ManyToOne(() => UniversityEntity, (university) => university.users, { nullable: true })
  university?: UniversityEntity | null

  @Column()
  role!: Role

  @Column({
    type: "enum", enum: Department, default: Department.Science
  })
  department!: Department

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}