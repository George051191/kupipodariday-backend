import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'student',
  password: 'student',
  database: 'kupipodariday',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: [],
  synchronize: true,
});

AppDataSource.initialize();
