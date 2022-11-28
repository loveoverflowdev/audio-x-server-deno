import { Either } from "../../../core/dependencies/monads.ts";
import { NovelEntity } from "../../entities/novel_entity.ts";

export {
    NovelService,
};

abstract class NovelService {
    abstract getNovelList({name, tagId}: {
        name: string | undefined | null, 
        tagId: string | undefined,
    }) : Promise<Either<NovelEntity[], Error>>;

    abstract getNovel({id} : {id: string})
        : Promise<Either<NovelEntity, Error>>;

    abstract postNovel({record} : {record: Record<string, unknown>})
        : Promise<Either<string, Error>>;
        
    abstract putNovel({record} : {record: Record<string, unknown>})
        : Promise<Either<string, Error>>;
}
