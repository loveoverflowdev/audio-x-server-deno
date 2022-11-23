import { Router } from "../core/dependencies/oak.ts";
import { NovelRepositoryImpl } from "../data/repositories/novel_repository_impl.ts";
import { NovelRepository } from "../domain/repositories/novel_repository.ts";
import { GetDummyNovelListUseCase } from "../domain/use_cases/get_dummy_novel_lise_use_case.ts";
import { NovelController } from "../presentation/controllers/novel_controller.ts";

export {
    buildRouter,
}

function buildRouter(): Router {
    const novelRepository: NovelRepository = new NovelRepositoryImpl();
    const getDummyNovelListUseCase: GetDummyNovelListUseCase = new GetDummyNovelListUseCase({
        repository: novelRepository,
    });
    const novelController: NovelController = new NovelController({
        getDummyNovelListUseCase: getDummyNovelListUseCase,
    });
    return new Router()
        .get("/novel-list", (context) => 
            novelController.getNovelList(context))
        .get("/", context => {
            context.response.body = 'audio x api';           
        })
        .use((context) => {
            console.log('Request: ' + context.request.url);
            context.response.headers.set("Content-Type", "application/json");
        });
}
