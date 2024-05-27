import { universityMock } from "../mocks/university.mock";
import University from "../models/university.model";

export class UniversityController {
  static getUniversity(): University[] {
    return universityMock
  }

  static getUniversityById(id: string): University[] {
    return universityMock.filter(university => {
      return university.id === id;
    })
  }
}