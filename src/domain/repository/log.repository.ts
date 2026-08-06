import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

// Permite llamar metodos que esten en datasource, mediante el reposotorio. 

export abstract class LogRepository {  
    abstract saveLog(log: LogEntity ): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;
}