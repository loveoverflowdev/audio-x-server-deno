import { Entity } from "./common/entity.ts";

export {
    NovelEntity,
}

class NovelEntity extends Entity {
    private readonly id: string;
    private readonly author: string;
    private readonly imageUrl: string;
    private readonly introduction: string;
    private readonly tagIdList: string[];

    constructor({
        id, author, introduction, tagIdList, imageUrl,
    }: {
        id: string, 
        author: string, 
        introduction: string, 
        tagIdList: string[],
        imageUrl: string,
    }) {
        super();
        this.id = id;
        this.author = author;
        this.introduction = introduction;
        this.tagIdList = tagIdList;
        this.imageUrl = imageUrl;
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
