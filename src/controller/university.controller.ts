import { Request, Response } from "express";
import { UniversityRepository } from "../database/repositories/university.repository";
import University from "../models/university.model";

export class UniversityController {
  static async getUniversities(): Promise<University[] | null> {
    return await UniversityRepository.findAll();
  }

  static async getUniversitiesById(id: string): Promise<University | null> {
    return await UniversityRepository.findById(id);
  }

  static async getUniversitiesByLocation(location: string): Promise<University[] | null> {
    return await UniversityRepository.findByLocation(location);
  }

  static async createUniversity(universityModel: University): Promise<University> {
    return await UniversityRepository.saveObject(universityModel);
  }

  static async updateUniversity(id: string, universityModel: University): Promise<University> {
    let university = await UniversityRepository.findById(id);

    if (!university) {
      throw new Error
    }

    const { id: universityId, createdAt, ...formatedUniversityModel } = universityModel;

    university = {
      ...university,
      ...formatedUniversityModel,
    }

    return await UniversityRepository.saveObject(university);
  }

  static async deleteUniversity(id: string): Promise<void> {
    const university = await UniversityRepository.findById(id);

    if (!university) {
      throw new Error
    }

    await UniversityRepository.removeObject(university);
  }
}