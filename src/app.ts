import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { ServerApp } from "./presentation/server";

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "./generated/prisma/client";

(async() => {
    main()
})();


async function main(){

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    const adapter = new PrismaPg(envs.POSTGRES_URL);
    const prisma = new PrismaClient({ adapter });

    const newLog = await prisma.logModel.create({
        data: { 
            level: 'HIGH',
            message: 'Test message',
            origin: 'App.ts'
        }
    })
    console.log(newLog);

    // ServerApp.start();
}