import Department from "../models/department.model";
import User, { Role } from "../models/user.model";

export const userMock: User[] = [
  {
    id: "",
    name: "david",
    email: "davidguri2006@gmail.com",
    role: Role.Student,
    department: Department.Engineering,
    createdAt: new Date(),
    updatedAt: new Date(),
    universityId: "",
    classes: null,
    password: "hello"
  },

  {
    id: "1",
    name: "david",
    email: "davidguri2006@gmail.com",
    role: Role.Student,
    department: Department.Science,
    createdAt: new Date(),
    updatedAt: new Date(),
    universityId: "",
    classes: null,
    password: "hello"
  },
]