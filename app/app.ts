import { Application } from "./core/dependencies/oak.ts";
import * as AppRouter from "./frameworks/app_router.ts";
import { configAsync } from "./core/dependencies/dotenv.ts";
import * as MongoDb from "./frameworks/database/mongo/mongo_app_database.ts";

export {
    runApp,
};

async function runApp(): Promise<void> {
    await configAsync({ export: true });
    const appDatabase = await MongoDb.buildAudioDatabase();
    
    const router = AppRouter.buildRouter({
        novelService: MongoDb.buildNovelService(appDatabase),
        novelChapterService: MongoDb.buildNovelChapterService(appDatabase),
    });

    const port = parseInt(Deno.env.get('PORT') ?? '') ?? 3000;
    const hostname = Deno.env.get('HOSTNAME') ?? '127.0.0.1';
    console.log(`Server running on port ${port}`);

    return new Application()
        .use(router.routes())
        .use(router.allowedMethods())
        .listen({ hostname: hostname, port: port });
}
