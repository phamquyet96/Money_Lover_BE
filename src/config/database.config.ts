require('dotenv').config();

class DataBaseConfig {

    type: string = process.env.DB_CONNECTION || 'mysql';
    host: string = process.env.DB_HOST || 'money-lover.cj7s8lykq5di.ap-southeast-1.rds.amazonaws.com';
    port: number = Number(process.env.DB_PORT) || 3306;
    username: string = process.env.DB_USER || 'root';
    password: string = process.env.DB_PASS || '12345678';
    database: string = process.env.DB_NAME || 'money_lover';
    synchronize: boolean = true;// chú ý chuyển khi khởi tạo database **** chuyển sang true
    logging: boolean = false;
    entities: string = "./dist/models/*.js";
    migrations: string = "./dist/database/migrations/*.js";


}

export default DataBaseConfig;