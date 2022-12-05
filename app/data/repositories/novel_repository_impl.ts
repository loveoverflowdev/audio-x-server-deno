import { Either } from "../../core/dependencies/monads.ts";
import { NovelEntity } from "../../domain/entities/novel_entity.ts";
import { NovelRepository } from "../../domain/repositories/novel_repository.ts";
import { NovelService } from "../../domain/repositories/services/novel_service.ts";

export {
    NovelRepositoryImpl,
}

class NovelRepositoryImpl implements NovelRepository {
    private readonly novelService: NovelService;
    
    constructor({ novelService } : { novelService: NovelService }) {
        this.novelService = novelService;
    }

    getNovelList({searchText, tagId}: {
        searchText: string | undefined | null, 
        tagId: string | undefined | null,
    }): Promise<Either<NovelEntity[], Error>> {
        return this.novelService.getNovelList({
            searchText: searchText, 
            tagId: tagId,
        });
    }

    getNovel({ id }: { id: string; }): Promise<Either<NovelEntity[], Error>> {
        throw new Error("Method not implemented.");
    }

    postNovel({ record }: { record: Record<string,unknown>; }): Promise<Either<string, Error>> {
        return this.novelService.postNovel({
            record: record,
        });
    }

    // TODO: 
    putNovel({ record }: { record: Record<string,unknown>; }): Promise<Either<string,Error>> {
        throw new Error("Method not implemented.");
    }
}
