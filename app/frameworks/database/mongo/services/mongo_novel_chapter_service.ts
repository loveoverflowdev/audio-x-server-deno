import { Either, Left, Right } 
    from "../../../../core/dependencies/monads.ts";
import { NovelChapterService } 
    from "../../../../domain/repositories/services/novel_chapter_service.ts";
import { NovelChapterEntityFromSchema, NovelChapterSchema }
    from "../schemas/novel_chapter_schema.ts";
import { NovelChapterEntity } 
    from "../../../../domain/entities/novel_chapter_entity.ts";
import { Collection, InsertDocument, ObjectId } 
    from "../../../../core/dependencies/mongo.ts";

export {
    MongoNovelChapterService,
}

class MongoNovelChapterService implements NovelChapterService {
    private readonly novelChapterCollection: Collection<NovelChapterSchema>;

    constructor({ novelChapterCollection} : {
        novelChapterCollection: Collection<NovelChapterSchema>,
    }) {
        this.novelChapterCollection = novelChapterCollection;
    }

    async getNovelChapterList({ novelId }: { novelId: string | undefined })
    : Promise<Either<NovelChapterEntity[], Error>> {
        const schemaList = await this
            .novelChapterCollection
            .find({novelId: novelId})
            .toArray();
        return Left(schemaList.map(e => NovelChapterEntityFromSchema(e)));
    }

    async postNovelChapter({ record }: { record: Record<string, unknown> })
    : Promise<Either<string, Error>> {
        
        const novelId: string | undefined = record['novelId']?.toString();
        const index: number | undefined = parseInt(record['index']?.toString() ?? '0')
        const name: string | undefined = record['name']?.toString();
        const source: string | undefined = record['source']?.toString();
        console.log(record);
        console.log(novelId, index, name, source);
        if (novelId == undefined || index == undefined 
            || source == undefined) {
            return Right(Error('Missing novelId or index, source', {
                cause: 400,
            }));
        }

        const document: InsertDocument<NovelChapterSchema> = {
            novelId: novelId,
            index: index,
            name: name ?? '',
            source: source,
        };
        const objectId = await this
            .novelChapterCollection
            .insertOne(document);
        return Left(objectId.toString());
    }

    async putNovelChapter({ record }: { record: Record<string,unknown>; })
    : Promise<Either<string,Error>> {
        throw new Error("Method not implemented.");
    }
}
