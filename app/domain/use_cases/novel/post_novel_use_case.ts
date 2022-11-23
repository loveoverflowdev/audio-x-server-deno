import { Either } from "../../../core/dependencies/monads.ts";
import { NovelRepository } from "../../repositories/novel_repository.ts";
import { UseCase } from "../common/use_case.ts";

export {
    PostNovelParameter,
    PostNovelUseCase,
}

class PostNovelParameter {
    readonly record: Record<string, unknown>;

    constructor({record} : {record: Record<string, unknown>}) {
        this.record = record;
    }
}

class PostNovelUseCase implements UseCase<PostNovelParameter, string> {

    private readonly novelRepository: NovelRepository;
    
    constructor({novelRepository}: {novelRepository: NovelRepository}) {
        this.novelRepository = novelRepository;
    }
    
    invoke(params: PostNovelParameter): Promise<Either<string, Error>> {
        return this.novelRepository.postNovel({record: params.record});
    }
}
