import { Either, Left, Right } 
    from "../../../../core/dependencies/monads.ts";
import { Collection, InsertDocument, ObjectId } 
    from "../../../../core/dependencies/mongo.ts";
import { NovelEntity } 
    from "../../../../domain/entities/novel_entity.ts";
import { NovelService } 
    from "../../../../domain/repositories/services/novel_service.ts";
import { NovelEntityFromSchema, NovelSchema } 
    from "../schemas/novel_schema.ts";
import { NovelTagSchema } from "../schemas/novel_tag_schema.ts";

export {
    MongoNovelService,
}

class MongoNovelService extends NovelService {
    private readonly novelCollection: Collection<NovelSchema>;
    private readonly novelTagCollection: Collection<NovelTagSchema>;

    constructor({novelCollection, novelTagCollection}: {
        novelCollection: Collection<NovelSchema>,
        novelTagCollection: Collection<NovelTagSchema>,
    }) {
        super();
        this.novelTagCollection = novelTagCollection;
        this.novelCollection = novelCollection;
    }
    
    // TODO: Filter by name & tags
    // TODO: Test tag search
    override async getNovelList({ name, tagId } : { 
        name: string | undefined | null, 
        tagId: string | undefined | null,
    }) : Promise<Either<NovelEntity[], Error>> {
        if (tagId == undefined || tagId == null) {
            const novelSchemaList = await this.novelCollection.find().toArray();
            return Left(novelSchemaList.map(e => NovelEntityFromSchema(e)));
        }

        const novelTagSchema = await this
            .novelTagCollection
            .findOne({_id: new ObjectId(tagId)});
        
        if (novelTagSchema == undefined) {
            return Right(Error(`novel tag with id: ${tagId} not found`, {
                cause: 404,
            }));
        }

        const novelEntityList: NovelEntity[] = [];
        for (const tagId of novelTagSchema.novelIdList) {
            const novelResult = await this.getNovel({
                id: tagId.toString(),
            });
            if (novelResult.isLeft()) {
                novelEntityList.push(novelResult.unwrapLeft());
            } else {
                return Right(novelResult.unwrapRight());
            }
        }
        
        return Left(novelEntityList);
    }

    override async getNovel({ id }: { id: string; })
        : Promise<Either<NovelEntity, Error>> {
        
        const schema = await this.novelCollection.findOne({
            _id: new ObjectId(id),
        });
        if (schema == undefined) {
            return Right(Error(`Novel Not Found At Id: ${id}`));
        }
        return Left(NovelEntityFromSchema(schema));
    }

    override async postNovel({ record }: { record: Record<string,unknown> })
        : Promise<Either<string, Error>> {
        
        const name: string | undefined = record['name']?.toString();
        const author: string | undefined = record['author']?.toString();
        const introduction: string | undefined = record['introduction']?.toString();
        const imageUrl: string | undefined = record['imageUrl']?.toString();

        if (author == undefined 
            || introduction == undefined
            || imageUrl == undefined
            || name == undefined
        ) {
            return Right(Error('Missing author or introduction, imageUrl, name', {
                cause: 400,
            }));
        }

        const document: InsertDocument<NovelSchema> = {
            author: author,
            introduction: introduction,
            imageUrl: imageUrl,
            name: name,
            chapterList: [],
        };
        const result = await this
            .novelCollection
            .insertOne(document);
        
        return Left(result.toString());
    }
    
    override async putNovel({ record }: { record: Record<string,unknown> })
        : Promise<Either<string, Error>> {
        
        const name: string | undefined = record['name']?.toString();
        const id: string | undefined = record['id']?.toString();
        const author: string | undefined = record['author']?.toString();
        const introduction: string | undefined = record['introduction']?.toString();
        const imageUrl: string | undefined = record['imageUrl']?.toString();

        if (id == undefined) {
            return Right(Error('Missing novel id', {
                cause: 400,
            }));
        }

        const setOption: Record<string, unknown> = {};
        if (author != undefined) setOption['author'] = author;
        if (introduction != undefined) setOption['introduction'] = introduction;
        if (name != undefined) setOption['name'] = name;
        if (imageUrl != undefined) setOption['imageUrl'] = imageUrl;

        const result = await this
            .novelCollection
            .updateOne({
                _id: new ObjectId(id),
            }, {
                $set: setOption,
            });
        
        return Left(`upsertedId: ${result.upsertedId}; modifiedCount: ${result.modifiedCount}; matchedCount: ${result.matchedCount}`);
    }
}
