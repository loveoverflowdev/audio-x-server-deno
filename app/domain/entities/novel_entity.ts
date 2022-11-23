import { ChapterEntity } from "./chapter_entity.ts";
import { Entity } from "./common/entity.ts";

export {
    NovelEntity,
    NovelTag,
}

class NovelEntity extends Entity {
    author: string;
    introduction: string;
    tag: NovelTag;
    chapterList: ChapterEntity[];

    constructor({
        author, introduction, tag, chapterList,
    }: {
        author: string, introduction: string, tag: NovelTag, chapterList: ChapterEntity[],
    }) {
        super();
        this.author = author;
        this.introduction = introduction;
        this.tag = tag;
        this.chapterList = chapterList;
    }

    override toRecord(): Record<string,unknown> {
        return {
            author: this.author,
            introduction: this.introduction,
            tag: this.tag,
            chapterList: this.chapterList,
        };
    }
}

enum NovelTag {
    MartialArt,
    Mystery,
    Romance,
    Adult,
    Xuanhuan,
    Fantasy,
    School,
    Tragedy,
}
