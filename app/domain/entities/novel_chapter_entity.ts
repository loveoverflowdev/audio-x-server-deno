import { Entity } from "./common/entity.ts";

export {
    NovelChapterEntity,
}

class NovelChapterEntity extends Entity {
    private readonly name: string;
    private readonly source: string;

    constructor({
        name, source,
    }: {
        name: string, source: string,
    }) {
        super();
        this.name = name;
        this.source = source;
    }

    override toRecord(): Record<string,unknown> {
        return {
            name: this.name,
            source: this.source,
        }
    }
}
