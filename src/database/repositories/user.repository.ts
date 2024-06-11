import { dataSource } from "../../typeorm.config";
import { UserEntity } from "../entities/user.entity";
import { Role } from "../../models/user.model";
import Department from "../../models/department.model";
import User from "../../models/user.model";
import { UserMapper } from "../mappings/user.mapper";

export const UserRepository = dataSource.getRepository(UserEntity).extend({
  async findAll(): Promise<User[] | null> {
    return (await this.find({ relations: ['university', 'classes'] }))?.map(UserMapper.toModel);
  },

  async findById(id: string): Promise<UserEntity | null> {
    return await this.findOne({ where: { id }, relations: ['university', 'classes'] });
  },

  async findByUniversity(universityId: string): Promise<User[] | null> {
    return (
      await this.find({
        where: {
          university: {
            id: universityId,
          }
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

  async saveObject(obj: UserEntity): Promise<User> {
    return (
      UserMapper.toModel(await this.save(obj))
    );
  },

  async removeObject(obj: UserEntity): Promise<UserEntity> {
    return await this.remove(obj);
  },
})

