import { Either, Left, Right } 
    from "../../../../core/dependencies/monads.ts";
import { Collection, ObjectId } 
    from "../../../../core/dependencies/mongo.ts";
import { NovelTagEntity } 
    from "../../../../domain/entities/novel_tag_entity.ts";
import { NovelTagService } 
    from "../../../../domain/repositories/services/novel_tag_service.ts";
import { NovelTagEntityFromSchema, NovelTagScheme } 
    from "../schemas/novel_tag_schema.ts";

export {
    MongoNovelTagService,
}

class MongoNovelTagService extends NovelTagService {
    private readonly novelTagCollection: Collection<NovelTagScheme>;

    constructor({novelTagCollection}: {
        novelTagCollection: Collection<NovelTagScheme>,
    }) {
        super();
        this.novelTagCollection = novelTagCollection;
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
