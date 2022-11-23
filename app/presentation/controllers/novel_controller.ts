import { Context } from "../../core/dependencies/oak.ts";
import { ApiResponse } from "../../core/response/api_response.ts";
import { GetDummyNovelListUseCase } 
    from "../../domain/use_cases/get_dummy_novel_lise_use_case.ts";
import { PostNovelParameter, PostNovelUseCase } from "../../domain/use_cases/novel/post_novel_use_case.ts";

export {
    NovelController,
};

class NovelController {
    private readonly getDummyNovelListUseCase: GetDummyNovelListUseCase;
    private readonly postNovelUseCase: PostNovelUseCase;

    async postNovelList(context: Context): Promise<void> {
        const formBody = context.request.body({ type: 'form-data' })
        const formData = await formBody.value.read();
    
        const data = await this
            .postNovelUseCase
            .invoke(new PostNovelParameter({record: formData.fields}));
        
        data.match({
            left: (l) => {
                const data: ApiResponse = {
                    meta: {error: null},
                    data: {
                        id: l,
                    },
                };
                context.response.status = 200;
                context.response.body = data;
            },
            right: (r) => {
                const data: ApiResponse = {
                    meta: {error: r},
                    data: null,
                };
                context.response.status = typeof r.cause === 'number' 
                    ? r.cause 
                    : 404;
                context.response.body = data;
            }
        });
    }

    async getNovelList(context: Context): Promise<void> {
        const data = await this
            .getDummyNovelListUseCase
            .invoke();
        
        data.match({
            left: (l) => {
                const data: ApiResponse = {
                    meta: {error: null},
                    data: l.map(value => value.toRecord()),
                };
                context.response.status = 200;
                context.response.body = data;
            },
            right: (r) => {
                const data: ApiResponse = {
                    meta: {error: r},
                    data: null,
                };
                context.response.status = typeof r.cause === 'number' 
                    ? r.cause 
                    : 404;
                context.response.body = data;
            },
        });
    }

    constructor({
        getDummyNovelListUseCase, postNovelUseCase,
    } : {
        getDummyNovelListUseCase: GetDummyNovelListUseCase,
        postNovelUseCase: PostNovelUseCase,
    }) {
        this.getDummyNovelListUseCase = getDummyNovelListUseCase;
        this.postNovelUseCase = postNovelUseCase;
    }
}
