import { classMock } from "../mocks/class.mock";
import Class from "../models/class.model";

export class ClassController {
  static getClass(): Class[] {
    return classMock
  }

  static getClassById(id: string): Class[] {
    return classMock.filter(classElement => {
      return classElement.id === id;
    })
  }
}