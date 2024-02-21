import 'dotenv/config';
import { get } from 'env-var';

export class Envs {
    static PORT: number = get('PORT').required().asPortNumber()
}