import { gradeMock } from "../mocks/grade.mock";
import Grade from "../models/grade.model";

export class GradeController {
  static getGrade(): Grade[] {
    return gradeMock
  }

  static getGradeById(id: string): Grade[] {
    return gradeMock.filter(grade => {
      return grade.id === id;
    })
  }
}