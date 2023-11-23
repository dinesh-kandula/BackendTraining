import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Techv1@3",
  database: "dinnu",
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  "extra": {
    "authSwitchHandler": function ({ pluginName, pluginData }, cb) {
      if (pluginName === 'caching_sha2_password') {
        // Use the MySQL native password plugin
        return cb(null, Buffer.from([0x01]));
      }
      return cb(new Error(`Unsupported authentication plugin: ${pluginName}`));
    }
  }
});

AppDataSource.initialize();
