import { Either } 
    from "../../../core/dependencies/monads.ts";

export {
    type UseCase,
}

interface UseCase<Params, Result> {
    invoke(params: Params): Promise<Either<Result, Error>>;
}
