import { DataSource } from 'typeorm';

export const databaseProvider = [
  {
    provide: 'DATA_SOURCE',
    userFactory: async () => {
      const dataSource = new DataSource({
        // TODO: get from config service
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'P@ssw0rd',
        database: 'nest_example',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // shouldn't be used in production - otherwise you can lose production data.
      });
      return dataSource.initialize();
    },
    useExisting: async () => {}, // need this to run?
  },
];
