import { dataSource } from "../../typeorm.config";
import { GradeEntity } from "../entities/grade.entity";
import { GradeMapper } from "../mappings/grade.mapper";
import Grade from "../../models/grade.model";

export const GradeRepository = dataSource.getRepository(GradeEntity).extend({
  async findAll(): Promise<Grade[] | null> {
    return (await this.find({ relations: ['class', 'user'] })).map(GradeMapper.toModel);
  },

  async findById(id: string): Promise<GradeEntity | null> {
    return await this.findOneBy({ id });
  },

  async findByUser(userId: string): Promise<Grade[] | null> {
    return (
      await this.find({
        where: {
          user: {
            id: userId
          }
        }
      })
    ).map(GradeMapper.toModel)
  },

  async findByClass(classId: string): Promise<Grade[] | null> {
    return (
      await this.find({
        where: {
          class: {
            id: classId
          }
        }
      })
    ).map(GradeMapper.toModel)
  },

  async saveObject(obj: GradeEntity): Promise<Grade> {
    return (
      GradeMapper.toModel(await this.save(obj))
    );
  },

  async removeObject(obj: GradeEntity): Promise<GradeEntity> {
    return await this.remove(obj);
  }
});