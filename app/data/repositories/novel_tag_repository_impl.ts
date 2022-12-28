import { Either } from "../../core/dependencies/monads";
import { NovelTagEntity } from "../../domain/entities/novel_tag_entity";
import { NovelTagRepository } 
    from "../../domain/repositories/novel_tag_repository.ts";
import { NovelTagService } 
    from "../../domain/repositories/services/novel_tag_service.ts";


class NovelTagRepositoryImpl implements NovelTagRepository {
    private readonly novelTagService: NovelTagService;

    constructor({novelTagService} : {
        novelTagService: NovelTagService,
    }) {
        this.novelTagService = novelTagService;
    }

    getNovelTagList(): Promise<Either<NovelTagEntity,Error>> {
        throw new Error("Method not implemented.");
    }
}
