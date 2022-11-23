import { Entity } from "./common/entity.ts";

export {
    ChapterEntity,
}

class ChapterEntity extends Entity {
    index: number;
    name: string;
    source: string;

    constructor({
        index, name, source,
    }: {
        index: number, name: string, source: string,
    }) {
        super();
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
