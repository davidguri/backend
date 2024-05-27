import { userMock } from "../mocks/user.mock";
import User from "../models/user.model";

export class UserController {
  static getUsers(): User[] {
    return userMock
  }

  static getUsersById(id: string): User[] {
    return userMock.filter(user => {
      return user.id === id;
    })
  }
}