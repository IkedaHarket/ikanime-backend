import { LogSeverityLevel } from "../";

export interface LogEntityDtoProps{
    message:string;
    level:LogSeverityLevel;
    createdAt?: Date;
    origin:string;
}

export class CreateLogDto {

    public createdAt : Date;
    public level: LogSeverityLevel;
    public message: string;
    public origin: string;
    
    constructor({ message, level, origin, createdAt = new Date() }: LogEntityDtoProps){
        this.createdAt = createdAt;
        this.level = level;
        this.message = message;
        this.origin = origin;
    }

    static createFromUnknown(props:{[key:string]:any}): [ string?, CreateLogDto? ] {
        const { level, message, origin, createdAt = true } = props
        if(this.isNotValidSeveritylevel(level)) return [`Level is not valid`] 
        if(!message) return [`Message is required`] 
        if(!origin) return [`origin is required is required`] 
        
        return [undefined, new CreateLogDto({level, message, origin, createdAt})]
    }

    private static isValidSeverityLevel(severity:string): severity is LogSeverityLevel {
        return Object.values(LogSeverityLevel).includes(severity as LogSeverityLevel)
    }

    private static isNotValidSeveritylevel(severity:string): severity is LogSeverityLevel{
        return !this.isValidSeverityLevel(severity)
    }

}