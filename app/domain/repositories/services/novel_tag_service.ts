import { Either } from "https://deno.land/x/monads@v0.5.10/index.ts";
import { NovelTagEntity } from "../../entities/novel_tag_entity.ts";

export {
    NovelTagService,
}

abstract class NovelTagService {
    abstract getNovelTagList()
        : Promise<Either<NovelTagEntity[], Error>>;

    abstract getNovelTag({id} : {id: string})
        : Promise<Either<NovelTagEntity, Error>>;

    abstract checkIfTagListExisted({idList} : {idList: string[]}) 
        : Promise<Error | null>;
}
