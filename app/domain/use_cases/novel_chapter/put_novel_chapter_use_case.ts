import { Either }
    from "../../../core/dependencies/monads.ts";
import { NovelChapterRepository } 
    from "../../repositories/novel_chapter_repository.ts";
import { UseCase } 
    from "../base/use_case.ts";

export {
    PutNovelChapterUseCase,
    PutNovelChapterParameter,
}

class PutNovelChapterParameter {
    readonly record: Record<string, unknown>;

    constructor({record} : {record: Record<string, unknown>}) {
        this.record = record;
    }
}

class PutNovelChapterUseCase implements UseCase<PutNovelChapterParameter, string> {
    private readonly novelChapterRepository: NovelChapterRepository;

    constructor({novelChapterRepository} : {
        novelChapterRepository: NovelChapterRepository,
    }) {
        this.novelChapterRepository = novelChapterRepository;
    }

    invoke(params: PutNovelChapterParameter): Promise<Either<string,Error>> {
        return this.novelChapterRepository.putNovelChapter({
            record: params.record,
        });
    }
}
