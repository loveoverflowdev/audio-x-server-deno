import { ObjectId } 
    from "../../../../core/dependencies/mongo.ts";
import { NovelEntity } 
    from "../../../../domain/entities/novel_entity.ts";

export {
    type NovelSchema,
    NovelEntityFromSchema,
};

interface NovelSchema {
    readonly _id: ObjectId | undefined;
    readonly author: string;
    readonly introduction: string;
    readonly tagIdList: string[];
}

function NovelEntityFromSchema(schema: NovelSchema) : NovelEntity {
    return new NovelEntity({
        id: schema._id?.toString() ?? '',
        introduction: schema.introduction,
        author: schema.author,
        tagIdList: schema.tagIdList,
    });
}
