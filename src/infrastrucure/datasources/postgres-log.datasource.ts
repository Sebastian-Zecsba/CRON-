import { PrismaPg } from "@prisma/adapter-pg";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { envs } from "../../config/plugins/envs.plugin";
import { PrismaClient, SeveriLevel } from "../../generated/prisma/client";

const adapter = new PrismaPg(envs.POSTGRES_URL);
const prisma = new PrismaClient({adapter});

const severityEnum = { 
    low: SeveriLevel.LOW,
    medium: SeveriLevel.MEDIUM,
    high: SeveriLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level]

        const newLog = await prisma.logModel.create({ 
            data: { 
                ...log,
                level: level
            }
        })

    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel]

        const dbLogs = await prisma.logModel.findMany({
            where: {
                level: level
            }
        })

        return dbLogs.map(dbLog => LogEntity.fromObject(dbLog));
    } 
    
}