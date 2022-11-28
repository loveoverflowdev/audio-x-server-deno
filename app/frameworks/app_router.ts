import { Router } from "../core/dependencies/oak.ts";
import { NovelChapterRepositoryImpl } from "../data/repositories/novel_chapter_repository_impl.ts";
import { NovelRepositoryImpl } from "../data/repositories/novel_repository_impl.ts";
import { NovelChapterRepository } from "../domain/repositories/novel_chapter_repository.ts";
import { NovelRepository } from "../domain/repositories/novel_repository.ts";
import { NovelChapterService } from "../domain/repositories/services/novel_chapter_service.ts";
import { NovelService } from "../domain/repositories/services/novel_service.ts";
import { GetNovelListUseCase } from "../domain/use_cases/novel/get_novel_list_use_case.ts";
import { PostNovelUseCase } from "../domain/use_cases/novel/post_novel_use_case.ts";
import { GetNovelChapterListUseCase } from "../domain/use_cases/novel_chapter/get_novel_chapter_list_use_case.ts";
import { PostNovelChapterUseCase } from "../domain/use_cases/novel_chapter/post_novel_chapter_use_case.ts";
import { PutNovelChapterUseCase } from "../domain/use_cases/novel_chapter/put_novel_chapter_use_case.ts";
import { NovelChapterController } from "../presentation/controllers/novel_chapter_controller.ts";
import { NovelController } from "../presentation/controllers/novel_controller.ts";

export {
    buildRouter,
}

function buildRouter({ novelService, novelChapterService } : {
    novelService: NovelService,
    novelChapterService: NovelChapterService,
}): Router {
    // Register repositories
    const novelRepository: NovelRepository = new NovelRepositoryImpl({
        novelService: novelService,
    });
    const novelChapterRepository: NovelChapterRepository = new NovelChapterRepositoryImpl({
        novelChapterService: novelChapterService,
    });

    // Register usecases
    const getNovelListUseCase: GetNovelListUseCase = new GetNovelListUseCase({
        novelRepository: novelRepository,
    });
    const postNovelUseCase: PostNovelUseCase = new PostNovelUseCase({
        novelRepository: novelRepository,
    });
    const getNovelChapterListUseCase: GetNovelChapterListUseCase = new GetNovelChapterListUseCase({
        novelChapterRepository: novelChapterRepository,
    });
    const postNovelChapterListUseCase: PostNovelChapterUseCase = new PostNovelChapterUseCase({
        novelChapterRepository: novelChapterRepository,
    });
    const putNovelChapterUseCase: PutNovelChapterUseCase = new PutNovelChapterUseCase({
        novelChapterRepository: novelChapterRepository,
    });

    // Register controllers
    const novelController: NovelController = new NovelController({
        getNovelListUseCase: getNovelListUseCase,
        postNovelUseCase: postNovelUseCase,
    });
    
    const novelChapterController: NovelChapterController = new NovelChapterController({
        postNovelChapterUseCase: postNovelChapterListUseCase,
        getNovelChapterListUseCase: getNovelChapterListUseCase,
        putNovelChapterUseCase: putNovelChapterUseCase,
    });
    
    const apiRouter = new Router()
        .get("/app/novel-list", (context) => 
            novelController.getNovelList(context, {
                name: context.request.url.searchParams.get('name') ?? '',
                tagIdListString: context.request.url.searchParams.get('tagIdList') ?? '',
            }),
        )
        .get("/app/novel-chapter-list/:novelId", (context) => 
            novelChapterController.getNovelChapterList(context, {
                novelId: context.params.novelId,
            }),
        )
        .post("/admin/novel", (context) => 
            novelController.postNovel(context),
        )
        .post("/admin/novel-chapter", (context) => 
            novelChapterController.postNovelChapter(context),
        )
        .put('/admin/novel-chapter', (context) =>
            novelChapterController.putNovelChapter(context),
        )
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
