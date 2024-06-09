import { dataSource } from "../../typeorm.config";
import { UserEntity } from "../entities/user.entity";
import { Role } from "../../models/user.model";
import Department from "../../models/department.model";

export const UserRepository = dataSource.getRepository(UserEntity).extend({
  findAll(): Promise<UserEntity[] | null> {
    return this.find({ relations: ['university', 'classes'] });
  },

  findById(id: string): Promise<UserEntity | null> {
    return this.findOne({ where: { id }, relations: ['university', 'classes'] });
  },

  findByRole(role: Role): Promise<UserEntity[] | null> {
    return this.find({ where: { role: role } });
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

