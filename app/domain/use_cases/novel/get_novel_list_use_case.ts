import { Either } from "../../../core/dependencies/monads.ts";
import { NovelEntity } from "../../entities/novel_entity.ts";
import { NovelRepository } from "../../repositories/novel_repository.ts";
import { UseCase } from "../common/use_case.ts";

export {
    GetNovelListUseCase,
    GetNovelListParameter,
}

class GetNovelListParameter {
    name: string | undefined | null;
    tagIdList: string[] | undefined;

    constructor({name, tagIdList} : {
        name: string | undefined | null,
        tagIdList: string[] | undefined,
    }) {
        this.name = name;
        this.tagIdList = tagIdList;
    }
}

class GetNovelListUseCase implements UseCase<GetNovelListParameter, NovelEntity[]> {
    private readonly novelRepository: NovelRepository;
    
    constructor({novelRepository}: {novelRepository: NovelRepository}) {
        this.novelRepository = novelRepository;
    }

    invoke(params: GetNovelListParameter): Promise<Either<NovelEntity[],Error>> {
        return this.novelRepository.getNovelList({
            name: params.name,
            tagIdList: params.tagIdList,
        });
    }
}
