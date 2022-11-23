import { Either } from "../../core/dependencies/monads.ts";
import { NovelTagEntity } from "../entities/novel_tag_entity.ts";

abstract class NovelTagRepository {
    abstract getNovelTagList()
        : Promise<Either<NovelTagEntity, Error>>;
}
