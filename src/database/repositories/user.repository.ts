import { dataSource } from "../../typeorm.config";
import { UserEntity } from "../entities/user.entity";

export const UserRepository = dataSource.getRepository(UserEntity).extend({
  findAll(): Promise<UserEntity[]> {
    return this.find();
  },

  findById(id: string): Promise<UserEntity | null> {
    return this.findOne({ where: { id } });
  },

  saveObject(obj: UserEntity): Promise<UserEntity> {
    return this.save(obj);
  },

  removeObject(obj: UserEntity): Promise<UserEntity> {
    return this.remove(obj);
  },
})

