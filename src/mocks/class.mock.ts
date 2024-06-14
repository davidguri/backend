import Class from "../models/class.model";
import Department from "../models/department.model";

export const classMock: Class[] = [
  {
    id: "0",
    name: "string",
    department: Department.Science,
    universityId: "hello",
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]