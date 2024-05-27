import Department from "./department.model";

type ClassType = {
  id: number;
  name: string;
  department: Department;
  createdAt: Date;
  updatedAt: Date;
};

export default ClassType;