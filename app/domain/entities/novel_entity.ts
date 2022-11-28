import { Entity } from "./common/entity.ts";

export {
    NovelEntity,
}

class NovelEntity extends Entity {
    private readonly id: string;
    private readonly name: string;
    private readonly author: string;
    private readonly imageUrl: string;
    private readonly introduction: string;

    constructor({
        id, author, introduction, imageUrl, name,
    }: {
        id: string, 
        author: string, 
        introduction: string, 
        imageUrl: string,
        name: string,
    }) {
        super();
        this.id = id;
        this.author = author;
        this.introduction = introduction;
        this.imageUrl = imageUrl;
        this.name = name;
    }

    override toRecord(): Record<string,unknown> {
        return {
            id: this.id,
            author: this.author,
            imageUrl: this.imageUrl,
            introduction: this.introduction,
            name: this.name,
        };
    }
}
