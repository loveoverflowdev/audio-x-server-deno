import { Database, MongoClient } 
    from "../../../core/dependencies/mongo.ts";
import { NovelChapterService } 
    from "../../../domain/repositories/services/novel_chapter_service.ts";
import { NovelService } 
    from "../../../domain/repositories/services/novel_service.ts";
import { NovelTagService } 
    from "../../../domain/repositories/services/novel_tag_service.ts";
import { NovelSchema } 
    from "./schemas/novel_schema.ts";
import { NovelTagSchema } 
    from "./schemas/novel_tag_schema.ts";
import { MongoNovelChapterService } 
    from "./services/mongo_novel_chapter_service.ts";
import { MongoNovelService } 
    from "./services/mongo_novel_service.ts";
import { MongoNovelTagService } 
    from "./services/mongo_novel_tag_service.ts";

export {
    buildAudioDatabase,
    
    buildNovelService,
    buildNovelTagService,
    buildNovelChapterService,
};

async function buildAudioDatabase(): Promise<Database> {
    const client = new MongoClient();
    await client.connect("mongodb://127.0.0.1:27017");
    const db = client.database("audio_x");
    return db;
} 

function buildNovelService(database: Database): NovelService {
    const novelCollection = database
        .collection<NovelSchema>("novel");
    const novelTagCollection = database
        .collection<NovelTagSchema>("novel_tag");
    return new MongoNovelService({
        novelCollection: novelCollection,
        novelTagCollection: novelTagCollection,
    });
}

function buildNovelChapterService(database: Database): NovelChapterService {
    const novelCollection = database
        .collection<NovelSchema>("novel");
    return new MongoNovelChapterService({
        novelCollection: novelCollection,
    });
}

function buildNovelTagService(database: Database): NovelTagService {
    const novelTagCollection = database
        .collection<NovelTagSchema>("novel_tag");
    return new MongoNovelTagService({
        novelTagCollection: novelTagCollection,
    });
}
