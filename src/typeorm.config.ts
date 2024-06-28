import { DataSource } from "typeorm"

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "user",
  password: "password",
  database: "database",
  entities: ["src/database/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  migrationsTableName: "migrations",
  logging: false,
  synchronize: true,
});