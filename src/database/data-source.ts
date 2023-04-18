import "reflect-metadata";
import { DataSource } from "typeorm";
import DataBaseConfig from "../config/database.config";

const dataBaseConfig = new DataBaseConfig();

const dataSource = new DataSource({
    type: "mysql",
    host: dataBaseConfig.host,
    port: dataBaseConfig.port,
    username: dataBaseConfig.username,
    password: dataBaseConfig.password,
    database: dataBaseConfig.database,
    synchronize: dataBaseConfig.synchronize,
    logging: dataBaseConfig.logging,
    entities: [dataBaseConfig.entities],
    migrations: [dataBaseConfig.migrations]
});

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });

export default dataSource;
