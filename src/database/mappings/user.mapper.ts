import User from "../../models/user.model";
import { UserEntity } from "../entities/user.entity";

export class UserMapper {
  static toEntity(model: User): UserEntity {
    const user = new UserEntity();

    user.id = model.id;
    user.name = model.name;
    user.email = model.email;
    user.role = model.role;
    user.department = model.department;
    user.createdAt = model.createdAt;
    user.updatedAt = model.updatedAt;
    user.university = undefined;

    return user;
  }

  static toModel(entity: UserEntity): User {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      role: entity.role,
      department: entity.department,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      universityId: entity.university?.id,
    }
  }
}