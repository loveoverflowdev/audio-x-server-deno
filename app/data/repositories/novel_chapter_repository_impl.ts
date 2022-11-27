import { Either } 
    from "../../core/dependencies/monads.ts";
import { NovelChapterEntity } 
    from "../../domain/entities/novel_chapter_entity.ts";
import { NovelChapterRepository } 
    from "../../domain/repositories/novel_chapter_repository.ts";
import { NovelChapterService } 
    from "../../domain/repositories/services/novel_chapter_service.ts";

export {
    NovelChapterRepositoryImpl,
}

class NovelChapterRepositoryImpl implements NovelChapterRepository {
    private readonly novelChapterService: NovelChapterService;

    constructor({novelChapterService} : {
        novelChapterService: NovelChapterService,
    }) {
        this.novelChapterService = novelChapterService;
    }

    async getNovelChapterList({ novelId }: { novelId: string | undefined })
    : Promise<Either<NovelChapterEntity[] ,Error>> {
        const response = await this
            .novelChapterService
            .getNovelChapterList({
                novelId: novelId,
            });
        return response;
    }

    async postNovelChapter({ record }: { record: Record<string,unknown>; })
    : Promise<Either<string,Error>> {
        const response = await this
            .novelChapterService
            .postNovelChapter({
                record: record,
            });
        return response;
    }

    async putNovelChapter({ record }: { record: Record<string,unknown>; })
    : Promise<Either<string,Error>> {
        const response = await this
            .novelChapterService
            .putNovelChapter({
                record: record,
            });
        return response;
    }
}
