import { Either } from "../../../core/dependencies/monads.ts";
import { NovelEntity } from "../../entities/novel_entity.ts";
import { NovelRepository } from "../../repositories/novel_repository.ts";
import { UseCase } from "../base/use_case.ts";

export {
    GetNovelListUseCase,
    GetNovelListParameter,
}

class GetNovelListParameter {
    searchText: string | undefined | null;
    tagId: string | undefined | null;

    constructor({searchText, tagId} : {
        searchText: string | undefined | null,
        tagId: string | undefined | null,
    }) {
        this.searchText = searchText;
        this.tagId = tagId;
    }
}

class GetNovelListUseCase implements UseCase<GetNovelListParameter, NovelEntity[]> {
    private readonly novelRepository: NovelRepository;
    
    constructor({novelRepository}: {novelRepository: NovelRepository}) {
        this.novelRepository = novelRepository;
    }

    invoke(params: GetNovelListParameter): Promise<Either<NovelEntity[], Error>> {
        return this.novelRepository.getNovelList({
            searchText: params.searchText,
            tagId: params.tagId,
        });
    }
}
