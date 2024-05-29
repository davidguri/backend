import { DataSource } from "typeorm"

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "user",
  password: "password",
  database: "database",
  entities: ["src/entities/*.ts"],
  logging: false,
  synchronize: true,
});