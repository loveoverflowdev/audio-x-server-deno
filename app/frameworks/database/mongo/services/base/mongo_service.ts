
export {
    MongoService,
}

class MongoService {

    parseRecord<T extends Record<string, unknown>>(
        record: Record<string, unknown>, 
        {pattern} : {pattern: T})
        : T | Error {
        const entries = Object.entries(pattern);
        // deno-lint-ignore no-explicit-any
        const result: any = {};
        for (const [key, value] of entries) {
            if  (typeof record[key] == typeof value) {
                result[key] = record[key];
            } else {
                return Error('Missing ${key}', {cause: 400});
            }
        }
        return result;
    }
}
