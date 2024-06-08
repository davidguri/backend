import { dataSource } from "../../typeorm.config";
import { UserEntity } from "../entities/user.entity";
import { Role } from "../../models/user.model";
import Department from "../../models/department.model";

export const UserRepository = dataSource.getRepository(UserEntity).extend({
  findAll(): Promise<UserEntity[]> {
    return this.find({ relations: ['university'] });
  },

  findById(id: string): Promise<UserEntity | null> {
    return this.findOne({ where: { id }, relations: ['university'] });
  },

  findByRole(role: Role): Promise<UserEntity[] | null> {
    return this.findBy({ role: role });
  },

  findByDepartment(department: Department): Promise<UserEntity[] | null> {
    return this.findBy({ department: department });
  },

  saveObject(obj: UserEntity): Promise<UserEntity> {
    return this.save(obj);
  },

  removeObject(obj: UserEntity): Promise<UserEntity> {
    return this.remove(obj);
  },
})

