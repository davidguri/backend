import { dataSource } from "../../typeorm.config";
import { ClassEntity } from "../entities/class.entity";
import Class from "../../models/class.model";
import { ClassMapper } from "../mappings/class.mapper";

export const ClassRepository = dataSource.getRepository(ClassEntity).extend({
  async findAll(): Promise<Class[]> {
    return (
      await this.find({ relations: ['universityId'] })
    )?.map(ClassMapper.toModel);
  },

  async findById(id: string): Promise<ClassEntity | null> {
    const classObj = await this.findOne({ where: { id }, relations: ['universityId', 'users'] });
    return (classObj ? ClassMapper.toModel(classObj) : null);
  },

  async findByUser(userId: string): Promise<Class[] | null> {
    return (
      await this.find({ where: { users: userId }, relations: ['universityId', 'users'] })
    ).map(ClassMapper.toModel);
  },

  async findByUniversity(universityId: string): Promise<Class[] | null> {
    return (
      await this.find({ where: { universityId: universityId }, relations: ['universityId', 'users'] })
    ).map(ClassMapper.toModel);
  },

  async saveObject(obj: Class): Promise<Class> {
    return ClassMapper.toModel(await this.save(obj));
  },

  async removeObject(obj: ClassEntity): Promise<ClassEntity> {
    return await this.remove(obj);
  },
});