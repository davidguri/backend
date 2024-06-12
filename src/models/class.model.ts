import Department from "./department.model";

type Class = {
  id: string;
  name: string;
  department: Department;
  universityId: string;
  users: string[];
  createdAt: Date;
  updatedAt: Date;
};

export default Class;