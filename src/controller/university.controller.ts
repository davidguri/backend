import { Request, Response } from "express";
import { UniversityRepository } from "../database/repositories/university.repository";
import { UniversityEntity } from "../database/entities/university.entity";
import { UniversityMapper } from "../database/mappings/university.mapper";
import University from "../models/university.model";

export class UniversityController {
  static async getUniversities(): Promise<University[] | null> {
    return await UniversityRepository.findAll();
  }

  static async getUniversitiesById(req: Request): Promise<University | null> {
    const { id } = req.params;

    return await UniversityRepository.findById(id);
  }

  static async getUniversitiesByLocation(req: Request): Promise<University[] | null> {
    const { location } = req.params;

    return await UniversityRepository.findByLocation(location);
  }

  static async createUniversity(req: Request): Promise<University> {
    const universityModel = req.body;

    return await UniversityRepository.saveObject(universityModel);
  }

  static async updateUniversity(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, location, users, classes, createdAt, updatedAt } = req.body;

    try {
      const university = await UniversityRepository.findById(id);

      if (!university) {
        res.status(404).json({ message: 'University not found :(' });
        return;
      }

      university.id = id;
      university.name = name;
      university.location = location;
      university.users = users;
      university.classes = classes;
      university.createdAt = createdAt;
      university.updatedAt = updatedAt;

      const updatedUniversity = await UniversityRepository.saveObject(university);
      res.json(updatedUniversity);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUniversity(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const university = await UniversityRepository.findById(id);

      if (!university) {
        res.status(404).json({ message: "University not found :(" });
        return;
      }

      await UniversityRepository.removeObject(university);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
}