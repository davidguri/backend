import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";

import { UserEntity } from "./user.entity";
import { ClassEntity } from "./class.entity";

@Entity("university")
export class UniversityEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  location!: string

  @OneToMany(() => UserEntity, (user) => user.university)
  users?: UserEntity[];

  @OneToMany(() => ClassEntity, (classEntity) => classEntity.university)
  classes?: ClassEntity[];

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}