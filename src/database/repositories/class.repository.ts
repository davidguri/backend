import { dataSource } from "../../typeorm.config";
import { ClassEntity } from "../entities/class.entity";
import Class from "../../models/class.model";
import { ClassMapper } from "../mappings/class.mapper";

export const ClassRepository = dataSource.getRepository(ClassEntity).extend({
  async findAll(): Promise<Class[]> {
    return (
      await this.find({ relations: ['university'] })
    )?.map(ClassMapper.toModel);
  },

  async findById(id: string): Promise<ClassEntity | null> {
    return await this.findOne({ where: { id }, relations: ['university', 'users'] });
  },

  async findByUser(userId: string): Promise<Class[] | null> {
    return (
      await this.find({ where: { users: { id: userId } }, relations: ['university', 'users'] })
    ).map(ClassMapper.toModel);
  },

  async findByUniversity(universityId: string): Promise<Class[] | null> {
    return (
      await this.find({ where: { university: { id: universityId } }, relations: ['university', 'users'] })
    ).map(ClassMapper.toModel);
  },

  async saveObject(obj: ClassEntity): Promise<Class> {
    return ClassMapper.toModel(await this.save(obj));
  },

  async removeObject(obj: ClassEntity): Promise<ClassEntity> {
    return await this.remove(obj);
  },
});