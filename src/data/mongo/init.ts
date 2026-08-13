import mongoose from "mongoose";

interface ConnectionsOptions { 
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase{ 

    static async connect(options: ConnectionsOptions){ 
        const { mongoUrl, dbName } = options;


        try {
            
            await mongoose.connect(mongoUrl, { 
                dbName: dbName,
            }) ;

            console.log('Mongoo conneted!')
        } catch (error) {
            console.log('Mongo conneection error')
            throw error;
        }

    }

}