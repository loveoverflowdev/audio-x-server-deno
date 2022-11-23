import { ObjectId } 
    from "../../../../core/dependencies/mongo.ts";
import { NovelChapterEntity } 
    from "../../../../domain/entities/novel_chapter_entity.ts";

export {
    type NovelChapterSchema,
    NovelChapterEntityFromSchema,
};

interface NovelChapterSchema {
    readonly _id: ObjectId;
    readonly novelId: string;
    readonly index: number;
    readonly name: string;
    readonly source: string;
}

function NovelChapterEntityFromSchema(schema: NovelChapterSchema): NovelChapterEntity {
    return new NovelChapterEntity({
        novelId: schema.novelId,
        index: schema.index,
        name: schema.name,
        source: schema.source,
    });
}
