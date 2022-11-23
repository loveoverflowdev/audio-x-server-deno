import { ObjectId } 
    from "../../../../core/dependencies/mongo.ts";
import { NovelTagEntity } 
    from "../../../../domain/entities/novel_tag_entity.ts";


export {
    type NovelTagScheme,
    NovelTagEntityFromSchema,
};

interface NovelTagScheme {
    readonly _id: ObjectId | undefined;
    readonly name: string;
}

function NovelTagEntityFromSchema(schema: NovelTagScheme): NovelTagEntity {
    return new NovelTagEntity({
        id: schema._id?.toString() ?? '',
        name: schema.name,
    });
}
