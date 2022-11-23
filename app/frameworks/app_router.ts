import { Router } from "../core/dependencies/oak.ts";
import { NovelRepositoryImpl } from "../data/repositories/novel_repository_impl.ts";
import { NovelRepository } from "../domain/repositories/novel_repository.ts";
import { NovelService } from "../domain/repositories/services/novel_service.ts";
import { GetDummyNovelListUseCase } from "../domain/use_cases/get_dummy_novel_lise_use_case.ts";
import { PostNovelUseCase } from "../domain/use_cases/novel/post_novel_use_case.ts";
import { NovelController } from "../presentation/controllers/novel_controller.ts";

export {
    buildRouter,
}

function buildRouter({ novelService } : {
    novelService: NovelService,
}): Router {
    const novelRepository: NovelRepository = new NovelRepositoryImpl({
        novelService: novelService,
    });
    const getDummyNovelListUseCase: GetDummyNovelListUseCase = new GetDummyNovelListUseCase({
        repository: novelRepository,
    });
    const postNovelListUseCase: PostNovelUseCase = new PostNovelUseCase({
        novelRepository: novelRepository,
    });
    const novelController: NovelController = new NovelController({
        getDummyNovelListUseCase: getDummyNovelListUseCase,
        postNovelUseCase: postNovelListUseCase,
    });
    
    const apiRouter = new Router()
        .get("/app/novel-list", (context) => 
            novelController.getNovelList(context))
        .post("/admin/novel-list", (context) => 
            novelController.postNovelList(context))
        .get("/", context => {
            context.response.body = 'audio x api';           
        })
        .use((context) => {
            console.log('Request: ' + context.request.url);
            context.response.headers.set("Content-Type", "application/json");
        });
    
    return new Router()
        .use('/api', apiRouter.routes(), apiRouter.allowedMethods());
}
