import { Either, Left, Right } 
    from "../../../../core/dependencies/monads.ts";
import { Collection, InsertDocument, ObjectId } 
    from "../../../../core/dependencies/mongo.ts";
import { NovelTagEntity } 
    from "../../../../domain/entities/novel_tag_entity.ts";
import { NovelTagService } 
    from "../../../../domain/repositories/services/novel_tag_service.ts";
import { NovelTagEntityFromSchema, NovelTagSchema } 
    from "../schemas/novel_tag_schema.ts";

export {
    MongoNovelTagService,
}

class MongoNovelTagService extends NovelTagService {

    private readonly novelTagCollection: Collection<NovelTagSchema>;

    constructor({novelTagCollection}: {
        novelTagCollection: Collection<NovelTagSchema>,
    }) {
        super();
        this.novelTagCollection = novelTagCollection;
    }
    
    override async postNovelTag({record}: {record: Record<string, unknown>})
    : Promise<Either<string, Error>> {
        const name = record['name']?.toString();
        const novelIdList: string[] = record['novelIdList'] instanceof Array
            ? record['novelIdList'].map(e => e.toString()) 
            : [];

        if (name == undefined) {
            return Right(Error('Missing name', {
                cause: 400,
            }));
        }

        const document: InsertDocument<NovelTagSchema> = {
            name: name,
            novelIdList: novelIdList.map(e => new ObjectId(e)),
        };
        const result = await this
            .novelTagCollection
            .insertOne(document);
        
        return Left(result.toString());
    }
    
    override async putNovelTag({record}: {record: Record<string, unknown>})
    : Promise<Either<string, Error>> {
        const id = record['id']?.toString();
        const name = record['name']?.toString();
        const novelIdList: string[] = record['novelIdList'] instanceof Array
            ? record['novelIdList'].map(e => e.toString()) 
            : [];

        if (id == undefined) {
            return Right(Error('Missing id', {
                cause: 400,
            }));
        }

        const setOption: Record<string, unknown> = {};
        if (name != undefined) setOption['name'] = name;
        if (novelIdList != undefined) setOption['novelIdList'] = novelIdList;

        const result = await this
            .novelTagCollection
            .updateOne({
                _id: new ObjectId(id)
            }, {
                $set: setOption,
            });
        
        return Left(result.toString());
    }
    
    override async getNovelTagList()
        : Promise<Either<NovelTagEntity[],Error>> {
        
        const schemaList = await this
            .novelTagCollection
            .find()
            .toArray();
        return Left(schemaList.map(e => NovelTagEntityFromSchema(e)));
    }

    override async getNovelTag({ id }: { id: string })
        : Promise<Either<NovelTagEntity, Error>> {
        
        const schema = await this
            .novelTagCollection
            .findOne({_id: new ObjectId(id)});
        return schema != undefined 
            ? Left(NovelTagEntityFromSchema(schema)) 
            : Right(Error(`novel tag with id: ${id} not found`, {
                cause: 404,
            })
        );
    }

    override async checkIfTagListExisted({ idList }: { idList: string[] })
        : Promise<Error | null> {
        for (const id in idList) {
            const tag = await this
                .getNovelTag({
                    id: id,
            });
            const error: Error | null = tag.right().match<Error | null>({
                some: (error) => error,
                none: null,
            });
            if (error != null) {
                return error;
            }
        }
        return null;
    }
}
