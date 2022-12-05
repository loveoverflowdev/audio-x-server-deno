import { Either } from "../../../core/dependencies/monads.ts";
import { NovelChapterRepository } from "../../repositories/novel_chapter_repository.ts";
import { UseCase } from "../base/use_case.ts";

export {
    PostNovelChapterUseCase,
    PostNovelChapterParameter,
}

class PostNovelChapterParameter {
    readonly record: Record<string, unknown>;

    constructor({record} : {record: Record<string, unknown>}) {
        this.record = record;
    }
}

class PostNovelChapterUseCase implements UseCase<PostNovelChapterParameter, string> {
    private readonly novelChapterRepository: NovelChapterRepository;

    constructor({novelChapterRepository} : {
        novelChapterRepository: NovelChapterRepository,
    }) {
        this.novelChapterRepository = novelChapterRepository;
    }

    invoke(params: PostNovelChapterParameter): Promise<Either<string,Error>> {
        return this.novelChapterRepository.postNovelChapter({
            record: params.record,
        });
    }
}
