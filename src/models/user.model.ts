import Department from "./department.model";

export enum Role {
  Student = "student",
  Teacher = "teacher",
  Admin = "admin"
}

type User = {
  id: string;
  name: string;
  email: string;
  universityId: string;
  classes: string[] | null;
  role: Role;
  department: Department;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export default User;