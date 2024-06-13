import { dataSource } from "../../typeorm.config";
import { UserEntity } from "../entities/user.entity";
import { Role } from "../../models/user.model";
import Department from "../../models/department.model";
import User from "../../models/user.model";
import { UserMapper } from "../mappings/user.mapper";

export const UserRepository = dataSource.getRepository(UserEntity).extend({
  async findAll(): Promise<User[] | null> {
    return (await this.find({ relations: ['universityId', 'classes'] }))?.map(UserMapper.toModel);
  },

  async findById(id: string): Promise<User | null> {
    const user = await this.findOne({ where: { id }, relations: ['universityId', 'classes'] });
    return (user ? UserMapper.toModel(user) : null);
  },

  async findByUniversity(universityId: string): Promise<User[] | null> {
    return (
      await this.find({
        where: {
          universityId: universityId,
        }
      })
    )?.map(UserMapper.toModel)
  },

  async findByRole(role: Role): Promise<User[] | null> {
    return (
      await this.find({
        where: { role: role }
      })
    ).map(UserMapper.toModel);
  },

  async findByDepartment(department: Department): Promise<User[] | null> {
    return (
      await this.findBy({
        department: department
      })
    ).map(UserMapper.toModel);
  },

  async saveObject(obj: User): Promise<User> {
    return await this.save(UserMapper.toEntity(obj))
  },

  async removeObject(obj: User): Promise<User> {
    return await this.remove(UserMapper.toEntity(obj));
  },
})

