import Class from "../../models/class.model";
import { ClassEntity } from "../entities/class.entity";
import { UniversityEntity } from "../entities/university.entity";
import { UserEntity } from "../entities/user.entity";

export class ClassMapper {
  static toEntity(model: Class, university: UniversityEntity, users: UserEntity[] = []): ClassEntity {
    const classObj = new ClassEntity;

    classObj.id = model.id;
    classObj.name = model.name;
    classObj.department = model.department;
    classObj.createdAt = model.createdAt;
    classObj.updatedAt = model.updatedAt;
    classObj.university = university;
    classObj.users = users || null;


    return classObj;
  }

  static toModel(entity: ClassEntity): Class {
    return {
      id: entity.id,
      name: entity.name,
      department: entity.department,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      university: entity.university.id,
      users: entity.users?.map(user => user.id) || null
    }
  }
}