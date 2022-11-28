import { ObjectId } 
    from "../../../../core/dependencies/mongo.ts";
import { NovelEntity } 
    from "../../../../domain/entities/novel_entity.ts";
import { NovelChapterEntityFromSchema, NovelChapterSchema } 
    from "./novel_chapter_schema.ts";

export {
    type NovelSchema,
    NovelEntityFromSchema,
};

interface NovelSchema {
    readonly _id: ObjectId | undefined;
    readonly author: string;
    readonly introduction: string;
    readonly tagIdList: string[];
    readonly imageUrl: string;
    readonly chapterList: NovelChapterSchema[];
}

function NovelEntityFromSchema(schema: NovelSchema) : NovelEntity {
    return new NovelEntity({
        id: schema._id?.toString() ?? '',
        introduction: schema.introduction,
        author: schema.author,
        tagIdList: schema.tagIdList,
        imageUrl: schema.imageUrl,
        chapterList: schema.chapterList
            .map(e => NovelChapterEntityFromSchema(e)),
    });
}
