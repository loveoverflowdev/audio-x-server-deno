import { Database, MongoClient } 
    from "../../../core/dependencies/mongo.ts";

export {
    buildAudioDatabase,
};

async function buildAudioDatabase(): Promise<Database> {
    const client = new MongoClient();
    await client.connect("mongodb://127.0.0.1:27017");
    const db = client.database("audio_x");
    return db;
} 
