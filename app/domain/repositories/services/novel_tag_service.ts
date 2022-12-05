import { Either } from "https://deno.land/x/monads@v0.5.10/index.ts";
import { NovelTagEntity } from "../../entities/novel_tag_entity.ts";

export {
    type NovelTagService,
}

interface NovelTagService {
    postNovelTag({record} : {record: Record<string, unknown>})
        : Promise<Either<string, Error>>;
    putNovelTag({record} : {record: Record<string, unknown>})
        : Promise<Either<string, Error>>;

    getNovelTagList()
        : Promise<Either<NovelTagEntity[], Error>>;

    getNovelTag({id} : {id: string})
        : Promise<Either<NovelTagEntity, Error>>;

    checkIfTagListExisted({idList} : {idList: string[]}) 
        : Promise<Error | null>;
}
