import { Entity } from "./common/entity.ts";

export {
    NovelChapterEntity,
}

class NovelChapterEntity extends Entity {
    private readonly novelId: string;
    private readonly index: number;
    private readonly name: string;
    private readonly source: string;

    constructor({
        novelId, index, name, source,
    }: {
        novelId: string, index: number, name: string, source: string,
    }) {
        super();
        this.novelId = novelId;
        this.index = index;
        this.name = name;
        this.source = source;
    }

    override toRecord(): Record<string,unknown> {
        return {
            index: this.index,
            name: this.name,
            source: this.source,
        }
    }
}
