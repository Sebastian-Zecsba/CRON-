import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDAtasource } from "../infrastrucure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastrucure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastrucure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";


const logRepository = new LogRepositoryImpl(
    // new FileSystemDAtasource()
    new MongoLogDatasource()
);

const emailService = new EmailService();


export class ServerApp{ 

    public static async start() {
        console.log('Server started...')

        // TODO: Mandar email
        
        // new SendEmailLogs(
        //     emailService, 
        //     FileSystemLogRepository
        // ).execute(
        //     ['zecsba2019casarias@gmail.com', 'sebitascarias@gmail.com']
        // )
        // emailService.sendEmailWtihFileSystemLogs(
        //     
        // )

        const logs = await logRepository.getLogs(LogSeverityLevel.low);
        console.log(logs)

        // TODO: Timelpas 
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://code.zecsba.online/';

        //         new CheckService(
        //             logRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)
        //     }
        // );

        
    }

}