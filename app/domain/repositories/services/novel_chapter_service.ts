import { Either } from "../../../core/dependencies/monads.ts";
import { NovelChapterEntity } from "../../entities/novel_chapter_entity.ts";

export {
    type NovelChapterService,
}

interface NovelChapterService {
    getNovelChapterList({novelId}: {novelId: string | undefined}) 
        : Promise<Either<NovelChapterEntity[], Error>>;
    
    postNovelChapter({record} : {record: Record<string, unknown>})
        : Promise<Either<string, Error>>;
    
    putNovelChapter({record} : {record: Record<string, unknown>})
        : Promise<Either<string, Error>>;
}
