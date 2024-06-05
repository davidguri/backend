import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm"
import { UserEntity } from "./user.entity"

@Entity("university")
export class UniversityEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  location!: string

  @OneToMany(() => UserEntity, (user) => user.university)
  users!: UserEntity[];

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}