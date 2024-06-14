import { DataSource } from "typeorm"

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT || '5432'),
  username: process.env.PG_UNAME,
  password: process.env.PG_PWD,
  database: process.env.PG_DB,
  entities: ["src/database/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  migrationsTableName: "migrations",
  logging: false,
  synchronize: true,
});