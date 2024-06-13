import { dataSource } from "../../typeorm.config";
import { UniversityEntity } from "../entities/university.entity";
import { UniversityMapper } from "../mappings/university.mapper";
import University from "../../models/university.model";

export const UniversityRepository = dataSource.getRepository(UniversityEntity).extend({
  async findAll(): Promise<UniversityEntity[] | null> {
    return (await this.find({ relations: ['users', 'classes'] }))?.map(UniversityMapper.toModel);
  },

  async findById(id: string): Promise<UniversityEntity | null> {
    const university = await this.findOne({ where: { id }, relations: ['users', 'classes'] });
    return (university ? UniversityMapper.toModel(university) : null);
  },

  async findByLocation(location: string): Promise<UniversityEntity[] | null> {
    return (
      (await this.findBy({ location: location }))?.map(UniversityMapper.toModel)
    );
  },

  async saveObject(obj: University): Promise<University> {
    return await this.save(UniversityMapper.toEntity(obj));
  },

  async removeObject(obj: UniversityEntity): Promise<UniversityEntity> {
    return await this.remove(obj);
  },
});