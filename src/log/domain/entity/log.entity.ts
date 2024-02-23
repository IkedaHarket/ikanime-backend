import { LogSeverityLevel } from "../";

export interface LogProps{
    id:string
    message:string;
    level:LogSeverityLevel;
    createdAt?: Date;
    origin:string;
}

export class Log{
    public readonly id: string
    public createdAt : Date;
    public level: LogSeverityLevel;
    public message: string;
    public origin: string;
    
    constructor({ id, message, level, origin, createdAt = new Date() }: LogProps){
        this.id = id
        this.createdAt = createdAt;
        this.level = level;
        this.message = message;
        this.origin = origin;
    }
    
}