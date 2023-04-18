require('dotenv').config();

class AppConfig{
    name: string = process.env.APP_NAME || 'MONEY LOVER';
    port: number = Number(process.env.SV_PORT);
    host: string = process.env.APP_HOST || '127.0.0.1';
    sessionKey: string = process.env.SESSION_KEY;
    sessionMaxAge: number = Number(process.env.SESSION_MAX_AGE);
    baseURL: string = process.env.BASE_URL || 'http://localhost:3000';
}

export default AppConfig;
