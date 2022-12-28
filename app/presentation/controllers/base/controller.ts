import { Either } 
    from "../../../core/dependencies/monads.ts";
import { Context } 
    from "../../../core/dependencies/oak.ts";
import { ApiResponse } 
    from "../../../core/response/api_response.ts";
import { ErrorFromAny } from "../../../core/response/error_from_any.ts";

export {
    Controller,
}

class Controller {

    matchResponse<T>(context: Context, either: Either<T, Error>, {
        onSuccess
    } : {
        onSuccess: (left: T) => Record<string, unknown> | Record<string, unknown>[] | null,
    }) {
        either.match({
            left: (l) => {
                const data: ApiResponse = {
                    meta: {error: null},
                    data: onSuccess(l),
                };
                context.response.status = 200;
                context.response.body = data;
            },
            right: (r) => {
                const data: ApiResponse = {
                    meta: {error: r.message},
                    data: null,
                };
                context.response.status = typeof r.cause === 'number' 
                    ? r.cause 
                    : 404;
                context.response.body = data;
            }
        });
    }

    async getRequestBodyRecord(context: Context): Promise<Error | Record<string, unknown>> {
        if (context.request.headers.get('Content-Type') == null) {
            return Error('Missing Content-Type');
        }
        if (context.request.body().type === "undefined") {
            return Error('Missing request body');
        }

        try {
            const jsonString = await context
            .request
            .body({type: 'text'})
            .value

            try {
                return JSON.parse(jsonString);
            } catch (e) {
                return ErrorFromAny(e);
            }
        } catch (e) {
            return ErrorFromAny(e);
        }        
    }
}
