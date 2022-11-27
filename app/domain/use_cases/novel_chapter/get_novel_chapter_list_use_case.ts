import { Either } from "../../../core/dependencies/monads.ts";
import { NovelChapterEntity } from "../../entities/novel_chapter_entity.ts";
import { NovelChapterRepository } from "../../repositories/novel_chapter_repository.ts";
import { UseCase } from "../common/use_case.ts";

export {
    GetNovelChapterListUseCase,
    GetNovelChapterListParamter,
}

class GetNovelChapterListParamter {
    readonly novelId: string | undefined;

    constructor({ novelId } : {
        novelId: string | undefined,
    }) {
        this.novelId = novelId;
    }
}

class GetNovelChapterListUseCase 
    implements UseCase<GetNovelChapterListParamter, NovelChapterEntity[]> {
    
    private readonly novelChapterRepository: NovelChapterRepository;
    
    constructor({novelChapterRepository} : {
        novelChapterRepository: NovelChapterRepository,
    }) {
        this.novelChapterRepository = novelChapterRepository;
    }

    invoke(params: GetNovelChapterListParamter): Promise<Either<NovelChapterEntity[],Error>> {
        return this.novelChapterRepository.getNovelChapterList({
            novelId: params.novelId,
        });
    }
}
