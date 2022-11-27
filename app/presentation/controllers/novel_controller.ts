import { Context } 
    from "../../core/dependencies/oak.ts";
import { ApiResponse } 
    from "../../core/response/api_response.ts";
import { GetNovelListParameter, GetNovelListUseCase } 
    from "../../domain/use_cases/novel/get_novel_list_use_case.ts";
import { PostNovelParameter, PostNovelUseCase } 
    from "../../domain/use_cases/novel/post_novel_use_case.ts";

export {
    NovelController,
};

class NovelController {
    private readonly getNovelListUseCase: GetNovelListUseCase;
    private readonly postNovelUseCase: PostNovelUseCase;

    async postNovel(context: Context): Promise<void> {
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

    async getNovelList(context: Context, { name, tagIdListString } : {
        name: string | null,
        tagIdListString: string | null,
    }): Promise<void> {
        const tagIdList = tagIdListString?.split(",");
        const data = await this
            .getNovelListUseCase
            .invoke(new GetNovelListParameter({
                name: name,
                tagIdList: tagIdList,
            }),
        );
        
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
                    meta: {error: r.message},
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
        getNovelListUseCase, postNovelUseCase,
    } : {
        getNovelListUseCase: GetNovelListUseCase,
        postNovelUseCase: PostNovelUseCase,
    }) {
        this.getNovelListUseCase = getNovelListUseCase;
        this.postNovelUseCase = postNovelUseCase;
    }
}
