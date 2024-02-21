import 'dotenv/config';
import { get } from 'env-var';

export class Envs {
    static PORT: number = get('PORT').required().asPortNumber()
    static POSTGRES_URL: string = get('POSTGRES_URL').required().asString()
    static POSTGRES_USER: string = get('POSTGRES_USER').required().asString()
    static POSTGRES_DB: string = get('POSTGRES_DB').required().asString()
    static POSTGRES_PASSWORD: string = get('POSTGRES_PASSWORD').required().asString()
    static BASE_URL : string = get('BASE_URL').required().asString()
}