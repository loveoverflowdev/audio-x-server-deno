import { Entity } from "./common/entity.ts";
import { NovelChapterEntity } from "./novel_chapter_entity.ts";

export {
    NovelEntity,
}

class NovelEntity extends Entity {
    private readonly id: string;
    private readonly author: string;
    private readonly imageUrl: string;
    private readonly introduction: string;
    private readonly tagIdList: string[];
    private readonly chapterList: NovelChapterEntity[];

    constructor({
        id, author, introduction, tagIdList, imageUrl, chapterList,
    }: {
        id: string, 
        author: string, 
        introduction: string, 
        tagIdList: string[],
        imageUrl: string,
        chapterList: NovelChapterEntity[],
    }) {
        super();
        this.id = id;
        this.author = author;
        this.introduction = introduction;
        this.tagIdList = tagIdList;
        this.imageUrl = imageUrl;
        this.chapterList = chapterList;
    }

    override toRecord(): Record<string,unknown> {
        return {
            id: this.id,
            author: this.author,
            introduction: this.introduction,
            tagIdList: this.tagIdList,
            chapterList: this.chapterList.map(e => e.toRecord()),
        };
    }
}
