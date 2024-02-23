import { LogSeverityLevel } from "../";


export class CreateLogDto {

    public level: LogSeverityLevel;
    public message: string;
    public origin: string;
    
    private constructor( message: string , level: LogSeverityLevel , origin: string){
        this.level = level;
        this.message = message;
        this.origin = origin;
    }

    static create( object: { [key:string]: any } ): [ string?, CreateLogDto? ] {
        const { level, message, origin } = object
        if(this.isNotValidSeveritylevel(level)) return [`level is not valid`] 
        if(!message) return [`message is required`] 
        if(!origin) return [`origin is required`] 
        
        return [undefined, new CreateLogDto( message, level, origin )]
    }

    private static isValidSeverityLevel(severity:string): severity is LogSeverityLevel {
        return Object.values(LogSeverityLevel).includes(severity as LogSeverityLevel)
    }

    private static isNotValidSeveritylevel(severity:string): severity is LogSeverityLevel{
        return !this.isValidSeverityLevel(severity)
    }

}