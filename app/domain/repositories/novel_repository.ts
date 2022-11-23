import { Either } from "../../core/dependencies/monads.ts";
import { NovelEntity } from "../entities/novel_entity.ts";

export {
    NovelRepository,
}

abstract class NovelRepository {
    abstract getDummyNovelList(): Promise<Either<NovelEntity[], Error>>;
}
