import { Either, Left, Right } 
    from "../../../../core/dependencies/monads.ts";
import { Collection, InsertDocument, ObjectId, Filter, UpdateFilter } 
    from "../../../../core/dependencies/mongo.ts";
import { NovelEntity } 
    from "../../../../domain/entities/novel_entity.ts";
import { NovelService } 
    from "../../../../domain/repositories/services/novel_service.ts";
import { NovelTagService } 
    from "../../../../domain/repositories/services/novel_tag_service.ts";
import { NovelEntityFromSchema, NovelSchema } 
    from "../schemas/novel_schema.ts";

export {
    MongoNovelService,
}

class MongoNovelService extends NovelService {
    private readonly novelTagService: NovelTagService;
    private readonly novelCollection: Collection<NovelSchema>;

    constructor({novelCollection, novelTagService}: {
        novelCollection: Collection<NovelSchema>,
        novelTagService: NovelTagService,
    }) {
        super();
        this.novelCollection = novelCollection;
        this.novelTagService = novelTagService;
    }
    
    // TODO: Filter by name & tags
    override async getNovelList({ name, tagIdList } : { 
        name: string, 
        tagIdList: number[] 
    }) : Promise<Either<NovelEntity[], Error>> {

        const schemaList = await this.novelCollection.find().toArray();
        return Left(schemaList.map(e => NovelEntityFromSchema(e)));
    }
    
    override async getNovel({ id } : { 
        id: string
    }) : Promise<Either<NovelEntity, Error>> {
        
        const schema = await this
            .novelCollection
            .findOne({_id: new ObjectId(id)});
        return schema != undefined 
            ? Left(NovelEntityFromSchema(schema)) 
            : Right(Error('Novel Not Found'));
    }

    override async postNovel({ record }: { record: Record<string,unknown> })
        : Promise<Either<string, Error>> {
        
        const author: string | undefined = record['author']?.toString();
        const introduction: string | undefined = record['introduction']?.toString();
        const tagIdListString = record['tagIdList']?.toString()
        const tagIdList = tagIdListString?.split(';') ?? [];
        
        if (author == undefined || introduction == undefined) {
            return Right(Error('Missing author or introduction', {
                cause: 400,
            }));
        }

        const errorOption: Error | null = await this
            .novelTagService
            .checkIfTagListExisted({idList: tagIdList});
        if (errorOption != null) {
            return Right(errorOption);
        }

        const document: InsertDocument<NovelSchema> = {
            author: author,
            introduction: introduction,
            tagIdList: tagIdList,
        };
        const objectId = await this
            .novelCollection
            .insertOne(document);
        return Left(objectId.toString());
    }
    
    override async putNovel({ record }: { record: Record<string,unknown> })
        : Promise<Either<string, Error>> {
        
        const id: string | undefined = record['id']?.toString();
        const author: string | undefined = record['author']?.toString();
        const introduction: string | undefined = record['introduction']?.toString();
        const tagIdListString = record['tagIdList']?.toString()
        const tagIdList = tagIdListString?.split(';');
        
        if (id == undefined) {
            return Right(Error('Missing novel id', {
                cause: 400,
            }));
        }

        const filter: Filter<NovelSchema> = {
            _id: new ObjectId(id),
        };

        const setOption: Record<string, unknown> = {};
        if (author != undefined) setOption['author'] = author;
        if (introduction != undefined) setOption['introduction'] = introduction;
        if (tagIdList != undefined) setOption['tagIdList'] = tagIdList;
        const updateFilter: UpdateFilter<NovelSchema> = {
            $set: setOption,
        };

        const result = await this
            .novelCollection
            .updateOne(filter, updateFilter);
        
        const upsertedId = result.upsertedId?.toString();
        if (upsertedId == undefined) {
            return Right(Error('Updating novel failed', {
                cause: 500,
            }));
        }

        return Left(upsertedId);
    }
}
