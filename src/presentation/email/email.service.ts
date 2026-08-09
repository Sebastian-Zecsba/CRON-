import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface sendEmailOption{ 
    to: string  | string[];
    subject: string;
    htmlBody: string;
    attachements: Attachment[]
}

interface Attachment {
    fileName: string,
    path: string
}

export class EmailService{ 

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: { 
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor(){}

    async sendEmail(options: sendEmailOption): Promise<boolean>{
        
        const { to, subject, htmlBody,attachements = []} = options;
        
        try {
            
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            });

            return true;
        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts'
            })

            return false;
        }
    }

    sendEmailWtihFileSystemLogs(to: string | string[]){

        const subject = 'Logs del servidor'
        const htmlBody = `
            <h3>Logs de Sistema - NOC</h3>
            <p>Aca podremos ver los logs del sistema que estamos monitorienando</p>
            <p>Ver logs adjuntos</p>  
            `
        const attachements: Attachment[] = [
            {fileName: 'logs-all.log', path: './logs/logs-all.log'},
            {fileName: 'logs-high.log', path: './logs/logs-high.log'},
            {fileName: 'logs-medium.log', path: './logs/logs-medium.log'}
        ];

        return this.sendEmail({
            to, subject, htmlBody, attachements
        })
    }

}