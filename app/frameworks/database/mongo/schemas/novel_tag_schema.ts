import { ObjectId } 
    from "../../../../core/dependencies/mongo.ts";
import { NovelTagEntity } 
    from "../../../../domain/entities/novel_tag_entity.ts";

export {
    type NovelTagSchema,
    NovelTagEntityFromSchema,
};

interface NovelTagSchema {
    readonly _id: ObjectId | undefined;
    readonly name: string;
    readonly novelIdList: ObjectId[];
}

function NovelTagEntityFromSchema(schema: NovelTagSchema): NovelTagEntity {
    return new NovelTagEntity({
        id: schema._id?.toString() ?? '',
        name: schema.name,
        
    });
}
