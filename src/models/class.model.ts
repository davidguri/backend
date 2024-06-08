import Department from "./department.model";

type Class = {
  id: string;
  name: string;
  department: Department;
  universityId: string;
  userId: string[] | null;
  createdAt: Date;
  updatedAt: Date;
};

export default Class;