import { Either } from "../../core/dependencies/monads.ts";
import { NovelEntity } from "../entities/novel_entity.ts";

export {
    type NovelRepository,
}

interface NovelRepository {
    getDummyNovelList()
        : Promise<Either<NovelEntity[], Error>>;
    
    getNovelList({name, tagIdList}: {
        name: string | undefined | null, 
        tagIdList: string[] | undefined,
    }): Promise<Either<NovelEntity[], Error>>;

    getNovel({id} : {id: string})
        : Promise<Either<NovelEntity[], Error>>;

    postNovel({ record }: { record: Record<string,unknown> })
        : Promise<Either<string, Error>>;
    
    putNovel({ record }: { record: Record<string,unknown> })
        : Promise<Either<string, Error>>;  
}
