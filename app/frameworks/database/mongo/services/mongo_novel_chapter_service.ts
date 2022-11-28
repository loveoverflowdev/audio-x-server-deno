import { Either, Left, Right } 
    from "../../../../core/dependencies/monads.ts";
import { NovelChapterService } 
    from "../../../../domain/repositories/services/novel_chapter_service.ts";
import { NovelChapterEntityFromSchema, NovelChapterSchema }
    from "../schemas/novel_chapter_schema.ts";
import { NovelChapterEntity } 
    from "../../../../domain/entities/novel_chapter_entity.ts";
import { Collection, ObjectId } 
    from "../../../../core/dependencies/mongo.ts";
import { NovelSchema } 
    from "../schemas/novel_schema.ts";
import { ErrorFromAny } from "../../../../core/response/error_from_any.ts";

export {
    MongoNovelChapterService,
}

class MongoNovelChapterService implements NovelChapterService {
    private readonly novelCollection: Collection<NovelSchema>;

    constructor({ novelCollection} : {
        novelCollection: Collection<NovelSchema>,
    }) {
        this.novelCollection = novelCollection;
    }

    async getNovelChapterList({ novelId }: { novelId: string | undefined })
    : Promise<Either<NovelChapterEntity[], Error>> {
        try {
            const novelSchema = await this
            .novelCollection
            .findOne({_id: new ObjectId(novelId)});
        return Left(novelSchema
            ?.chapterList
                .map(e => NovelChapterEntityFromSchema(e)) 
                ?? [],
            );
        } catch (e) {
            return Right(ErrorFromAny(e));
        }
    }

    async postNovelChapter({ record }: { record: Record<string, unknown> })
    : Promise<Either<string, Error>> {
        
        const novelId: string | undefined = record['novelId']?.toString();
        const name: string | undefined = record['name']?.toString();
        const source: string | undefined = record['source']?.toString();
        if (novelId == undefined ||  source == undefined) {
            return Right(Error('Missing novelId or source', {
                cause: 400,
            }));
        }

        const novelChapterSchema: NovelChapterSchema = {
            name: name ?? '',
            source: source,
        };

        const result = await this
            .novelCollection
            .updateOne({
                _id: new ObjectId(novelId),
            }, {
                $push: {chapterList: {
                    $each: [novelChapterSchema],
                }}
            });
        return Left(`upsertedId: ${result.upsertedId}; modifiedCount: ${result.modifiedCount}; matchedCount: ${result.matchedCount}`);
    }

    async putNovelChapter({ record }: { record: Record<string,unknown>; })
    : Promise<Either<string,Error>> {
        
        const index: number | undefined = parseInt(record['index']?.toString() ?? '')
        const novelId: string | undefined = record['novelId']?.toString();
        const name: string | undefined = record['name']?.toString();
        const source: string | undefined = record['source']?.toString();
        if (novelId == undefined || source == undefined || isNaN(index)) {
            return Right(Error('Missing novelId or source, index: number', {
                cause: 400,
            }));
        }

        const novelChapterSchema: NovelChapterSchema = {
            name: name ?? '',
            source: source,
        };
        const novelSchema = await this
            .novelCollection
            .findOne({_id: new ObjectId(novelId)})
        const novelChapterSchemaList = novelSchema?.chapterList ?? [];

        if (novelChapterSchemaList.length > index) {
            novelChapterSchemaList[index] = novelChapterSchema;
        } else {
            return Right(Error('Invalid Chapter Index: index > novelChapterSchemaList.length'))
        }

        const result = await this
            .novelCollection
            .updateOne({
                _id: new ObjectId(novelId),
            }, {
                $set: {
                    chapterList: novelChapterSchemaList,
                },
            });
        return Left(`upsertedId: ${result.upsertedId}; modifiedCount: ${result.modifiedCount}; matchedCount: ${result.matchedCount}`);
    }
}
