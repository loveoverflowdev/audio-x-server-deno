import { Entity } from "./common/entity.ts";

export {
    NovelEntity,
}

class NovelEntity extends Entity {
    private readonly id: string;
    private readonly author: string;
    // TODO: add image URl
    private readonly introduction: string;
    private readonly tagIdList: string[];

    constructor({
        id, author, introduction, tagIdList,
    }: {
        id: string, author: string, introduction: string, tagIdList: string[],
    }) {
        super();
        this.id = id;
        this.author = author;
        this.introduction = introduction;
        this.tagIdList = tagIdList;
    }

    override toRecord(): Record<string,unknown> {
        return {
            id: this.id,
            author: this.author,
            introduction: this.introduction,
            tagIdList: this.tagIdList,
        };
    }
}
