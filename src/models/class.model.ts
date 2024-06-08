import Department from "./department.model";

type Class = {
  id: string;
  name: string;
  department: Department;
  university: string;
  users: string[] | null;
  createdAt: Date;
  updatedAt: Date;
};

export default Class;