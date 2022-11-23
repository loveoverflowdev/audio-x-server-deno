import { Either, Left } from "../../core/dependencies/monads.ts";
import { NovelEntity, NovelTag } from "../../domain/entities/novel_entity.ts";
import { NovelRepository } from "../../domain/repositories/novel_repository.ts";

export {
    NovelRepositoryImpl,
}

class NovelRepositoryImpl extends NovelRepository {
    override getDummyNovelList(): Promise<Either<NovelEntity[], Error>> {
        return Promise.resolve(Left([
            new NovelEntity({
                author: 'string',
                introduction: 'string',
                tag: NovelTag.MartialArt,
                chapterList: [],
            }),
            new NovelEntity({
                author: 'string',
                introduction: 'string',
                tag: NovelTag.MartialArt,
                chapterList: [],
            }),
            new NovelEntity({
                author: 'string',
                introduction: 'string',
                tag: NovelTag.MartialArt,
                chapterList: [],
            }),
            new NovelEntity({
                author: 'string',
                introduction: 'string',
                tag: NovelTag.MartialArt,
                chapterList: [],
            }),
            new NovelEntity({
                author: 'string',
                introduction: 'string',
                tag: NovelTag.MartialArt,
                chapterList: [],
            }),
        ]));
    }
}
