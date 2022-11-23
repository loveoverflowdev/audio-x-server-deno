import { Entity } from "./common/entity.ts";

export {
    NovelTagEntity, 
}

class NovelTagEntity extends Entity {
    private readonly id: string;
    private readonly name: string;

    constructor({id, name} : {
        id: string,
        name: string,
    }) {
        super();
        this.id = id;
        this.name = name;
    }

    override toRecord(): Record<string,unknown> {
        return {
            id: this.id,
            name: this.name,
        };
    }
}
