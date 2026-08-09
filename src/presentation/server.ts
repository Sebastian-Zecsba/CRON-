import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDAtasource } from "../infrastrucure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastrucure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";


const FileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDAtasource()
);


export class ServerApp{ 

    public static start() {
        console.log('Server started...')

        // TODO: Mandar email
        // const emailService = new EmailService();
        // emailService.sendEmailWtihFileSystemLogs(
        //     ['zecsba2019casarias@gmail.com', 'sebitascarias@gmail.com']
        // )

        // TODO: Timelpas 
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://code.zecsba.online/'

        //         new CheckService(
        //             FileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)
        //     }
        // );

        
    }

}