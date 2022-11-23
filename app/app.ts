import { Application } from "./core/dependencies/oak.ts";
import * as AppRouter from "./frameworks/app_router.ts";
import { config } from "./core/dependencies/dotenv.ts";
import * as MongoDb from "./frameworks/database/mongo/mongo_app_database.ts";
import { NovelSchema } from "./frameworks/database/mongo/schemas/novel_schema.ts";
import { NovelService } from "./domain/repositories/services/novel_service.ts";
import { Database } from "./core/dependencies/mongo.ts";
import { MongoNovelService } from "./frameworks/database/mongo/services/mongo_novel_service.ts";
import { MongoNovelTagService } from "./frameworks/database/mongo/services/mongo_novel_tag_service.ts";
import { NovelTagService } from "./domain/repositories/services/novel_tag_service.ts";
import { NovelTagScheme } from "./frameworks/database/mongo/schemas/novel_tag_schema.ts";

export {
    runApp,
};

async function runApp(): Promise<void> {
    const appDatabase = await MongoDb.buildAudioDatabase();
    
    const router = AppRouter.buildRouter({
        novelService: buildNovelService(appDatabase)
    });

    const port = 8080;
    console.log(`Server running on port ${port}`);

    return new Application()
        .use(router.routes())
        .use(router.allowedMethods())
        .listen({ hostname: '127.0.0.1', port: port });
}

function buildNovelService(database: Database): NovelService {
    const novelCollection = database.collection<NovelSchema>("novel");
    const novelTagService = buildNovelTagService(database);
    return new MongoNovelService({
        novelCollection: novelCollection,
        novelTagService: novelTagService,
    });
}

function buildNovelTagService(database: Database): NovelTagService {
    const novelTagCollection = database.collection<NovelTagScheme>("novel_tag");
    return new MongoNovelTagService({
        novelTagCollection: novelTagCollection,
    });
}
