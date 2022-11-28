import { ObjectId } 
    from "../../../../core/dependencies/mongo.ts";
import { NovelEntity } 
    from "../../../../domain/entities/novel_entity.ts";
import { NovelChapterSchema } 
    from "./novel_chapter_schema.ts";

export {
    type NovelSchema,
    NovelEntityFromSchema,
};

interface NovelSchema {
    readonly _id: ObjectId | undefined;
    readonly name: string;
    readonly author: string;
    readonly introduction: string;
    readonly imageUrl: string;
    readonly chapterList: NovelChapterSchema[];
}

function NovelEntityFromSchema(schema: NovelSchema) : NovelEntity {
    return new NovelEntity({
        id: schema._id?.toString() ?? '',
        introduction: schema.introduction,
        author: schema.author,
        imageUrl: schema.imageUrl,
        name: schema.name,
    });
}
