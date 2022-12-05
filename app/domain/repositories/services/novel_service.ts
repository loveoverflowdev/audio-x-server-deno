import { Either } from "../../../core/dependencies/monads.ts";
import { NovelEntity } from "../../entities/novel_entity.ts";

export {
    type NovelService,
};

interface NovelService {
    getNovelList({ searchText, tagId } : { 
        searchText: string | undefined | null, 
        tagId: string | undefined | null,
    }) : Promise<Either<NovelEntity[], Error>>;

    getNovel({ id, searchText = undefined }: { 
        id: string;
        searchText?: string | undefined ,
    }) : Promise<Either<NovelEntity, Error>>;

    postNovel({record} : {record: Record<string, unknown>})
        : Promise<Either<string, Error>>;
        
    putNovel({record} : {record: Record<string, unknown>})
        : Promise<Either<string, Error>>;
}
