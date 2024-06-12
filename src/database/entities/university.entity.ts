import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany, JoinColumn } from "typeorm";

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

  @OneToMany(() => UserEntity, (user) => user.universityId)
  @JoinColumn({ name: "users" })
  users!: string[];

  @OneToMany(() => ClassEntity, (classEntity) => classEntity.universityId)
  @JoinColumn({ name: "classes" })
  classes!: string[];

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}