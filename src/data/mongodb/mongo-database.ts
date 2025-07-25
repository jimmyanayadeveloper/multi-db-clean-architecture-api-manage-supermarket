import mongoose from "mongoose";

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDataBase {
    static async connect(options: Options) {
        const { dbName, mongoUrl } = options;
        try {
            /* mongoose.connect('mongodb://127.0.0.1:27017/test'); */
            await mongoose.connect(mongoUrl, { dbName: dbName });
            console.log("Mongo connected");

        } catch (error) {
            console.error("Mongo connection error");
            throw error;
        }
    }
}