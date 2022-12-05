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
import { MongoService } from "./base/mongo_service.ts";

export {
    MongoNovelChapterService,
}

class MongoNovelChapterService extends MongoService 
    implements NovelChapterService {
    
    private readonly novelCollection: Collection<NovelSchema>;

    constructor({ novelCollection} : {
        novelCollection: Collection<NovelSchema>,
    }) {
        super();
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
        const validatedParams = this.parseRecord(record, {
            pattern: {
                novelId: '',
                name: '',
                source: '',
            }
        });

        if (validatedParams instanceof Error) {
            return Right(validatedParams);
        }

        const novelChapterSchema: NovelChapterSchema = {
            name: validatedParams.name,
            source: validatedParams.source,
        };

        const result = await this
            .novelCollection
            .updateOne({
                _id: new ObjectId(validatedParams.novelId),
            }, {
                $push: {chapterList: {
                    $each: [novelChapterSchema],
                }}
            });
        return Left(`upsertedId: ${result.upsertedId}; modifiedCount: ${result.modifiedCount}; matchedCount: ${result.matchedCount}`);
    }

    async putNovelChapter({ record }: { record: Record<string,unknown>; })
    : Promise<Either<string,Error>> {        
        const validatedParams = this.parseRecord(record, {
            pattern: {
                index: 0,
                novelId: '',
                name: '',
                source: '',
            }
        });

        if (validatedParams instanceof Error) {
            return Right(validatedParams);
        }

        const novelChapterSchema: NovelChapterSchema = {
            name: validatedParams.name,
            source: validatedParams.source,
        };
        const novelSchema = await this
            .novelCollection
            .findOne({_id: new ObjectId(validatedParams.novelId)})
        const novelChapterSchemaList = novelSchema?.chapterList ?? [];

        if (novelChapterSchemaList.length > validatedParams.index) {
            novelChapterSchemaList[validatedParams.index] = novelChapterSchema;
        } else {
            return Right(Error('Invalid Chapter Index: index > novelChapterSchemaList.length'))
        }

        const result = await this
            .novelCollection
            .updateOne({
                _id: new ObjectId(validatedParams.novelId),
            }, {
                $set: {
                    chapterList: novelChapterSchemaList,
                },
            });
        return Left(`upsertedId: ${result.upsertedId}; modifiedCount: ${result.modifiedCount}; matchedCount: ${result.matchedCount}`);
    }
}
