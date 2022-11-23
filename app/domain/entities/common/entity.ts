export {
    Entity,
}

abstract class Entity {
    abstract toRecord(): Record<string, unknown>;
}
