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
import { MongoService } from "./base/mongo_service.ts";

export {
    MongoNovelService,
}

class MongoNovelService extends MongoService 
    implements NovelService {
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

    async getNovelList({ searchText, tagId } : { 
        searchText: string | undefined | null, 
        tagId: string | undefined | null,
    }) : Promise<Either<NovelEntity[], Error>> {
        const filter = searchText ? {
            $or: [
                {"author": {$regex : searchText, $options : 'i'}},
                {"introduction": {$regex : searchText, $options : 'i'}},
                {"name": {$regex : searchText, $options : 'i'}},
                {"extra": {$regex : searchText, $options : 'i'}},
            ]
        } : {};

        console.log(filter);

        if (!tagId) {
            const novelSchemaList = await this
                .novelCollection.find(filter)
                .toArray();
            return Left(novelSchemaList.map(e => NovelEntityFromSchema(e)));
        }

        const novelTagSchema = await this
            .novelTagCollection
            .findOne({_id: new ObjectId(tagId)});
        
        if (!novelTagSchema) {
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

    async getNovel({ id, searchText = undefined }: { 
        id: string;
        searchText?: string | undefined ,
    }) : Promise<Either<NovelEntity, Error>> {
        const filter = searchText ? {
            $or: [
                {"author": {$regex : searchText, $options : 'i'}},
                {"introduction": {$regex : searchText, $options : 'i'}},
                {"name": {$regex : searchText, $options : 'i'}},
                
            ]
        } : {};


        const schema = await this.novelCollection.findOne({
            _id: new ObjectId(id),
            filter,
        });
        if (!schema) {
            return Right(Error(`Novel Not Found At Id: ${id}`));
        }
        return Left(NovelEntityFromSchema(schema));
    }

    async postNovel({ record }: { record: Record<string,unknown> })
        : Promise<Either<string, Error>> {
        
        const validatedParams = this.parseRecord(record, {
            pattern: {
                name: '',
                author: '',
                introduction: '',
                imageUrl: '',
            }
        });

        if (validatedParams instanceof Error) {
            return Right(validatedParams);
        }

        const document: InsertDocument<NovelSchema> = {
            author: validatedParams.author,
            introduction: validatedParams.introduction,
            imageUrl: validatedParams.imageUrl,
            name: validatedParams.name,
            chapterList: [],
        };
        const result = await this
            .novelCollection
            .insertOne(document);
        
        return Left(result.toString());
    }
    
    async putNovel({ record }: { record: Record<string,unknown> })
        : Promise<Either<string, Error>> {

        const validatedParams = this.parseRecord(record, {
            pattern: {
                id: '',
                name: '',
                author: '',
                introduction: '',
                imageUrl: '',
            }
        });

        if (validatedParams instanceof Error) {
            return Right(validatedParams);
        }

        const result = await this
            .novelCollection
            .updateOne({
                _id: new ObjectId(validatedParams.id),
            }, {
                $set: {
                    author: validatedParams.author,
                    introduction: validatedParams.introduction,
                    name: validatedParams.name,
                    imageUrl: validatedParams.imageUrl,
                },
            });
        
        return Left(`upsertedId: ${result.upsertedId}; modifiedCount: ${result.modifiedCount}; matchedCount: ${result.matchedCount}`);
    }
}
