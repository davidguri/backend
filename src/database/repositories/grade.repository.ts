import { dataSource } from "../../typeorm.config";
import { GradeEntity } from "../entities/grade.entity";
import { GradeMapper } from "../mappings/grade.mapper";
import Grade from "../../models/grade.model";

export const GradeRepository = dataSource.getRepository(GradeEntity).extend({
  async findAll(): Promise<Grade[] | null> {
    const result = await this.find({ relations: ['classId', 'userId'] })
    return result;
  },

  async findById(id: string): Promise<Grade | null> {
    const grade = await this.findOne({ where: { id }, relations: ['userId', 'classId'] });
    return (grade ? GradeMapper.toModel(grade) : null);
  },

  async findByUser(userId: string): Promise<Grade[] | null> {
    return (
      await this.find({
        where: {
          userId: userId
        }
      })
    ).map(GradeMapper.toModel)
  },

  async findByClass(classId: string): Promise<Grade[] | null> {
    return (
      await this.find({
        where: {
          classId: classId
        }
      })
    ).map(GradeMapper.toModel)
  },

  async saveObject(obj: Grade): Promise<Grade> {
    return await this.save(GradeMapper.toEntity(obj))
  },

  async removeObject(obj: GradeEntity): Promise<GradeEntity> {
    return await this.remove(obj);
  }
});