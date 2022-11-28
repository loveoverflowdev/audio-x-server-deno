
export {
    ErrorFromAny,
}

// deno-lint-ignore no-explicit-any
function ErrorFromAny(canBeError: any | unknown): Error {
    if (canBeError instanceof Error) {
        return canBeError;
    }
    return Error(canBeError.toString());
}
