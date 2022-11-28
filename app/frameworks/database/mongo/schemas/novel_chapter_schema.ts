import { NovelChapterEntity } 
    from "../../../../domain/entities/novel_chapter_entity.ts";

export {
    type NovelChapterSchema,
    NovelChapterEntityFromSchema,
};

interface NovelChapterSchema {
    readonly name: string;
    readonly source: string;
}

function NovelChapterEntityFromSchema(schema: NovelChapterSchema): NovelChapterEntity {
    return new NovelChapterEntity({
        name: schema.name,
        source: schema.source,
    });
}
