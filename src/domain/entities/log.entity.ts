import { measureMemory } from "node:vm";

export enum LogSeverityLevel{
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOption{
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string; 
}

export class LogEntity { 

    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;
    public origin: string; 

    constructor(options: LogEntityOption){
        const { message, level, origin, createdAt = new Date() } = options;

        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json: string ): LogEntity => {
        const { message, level, createdAt, origin } = JSON.parse(json)
        const log = new LogEntity({
            message: message, 
            level: level, 
            origin: origin,
            createdAt: createdAt
        });
        

        return log;
    }

}