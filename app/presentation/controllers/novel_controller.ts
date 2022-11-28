import { Context } 
    from "../../core/dependencies/oak.ts";
import { ApiResponse } 
    from "../../core/response/api_response.ts";
import { GetNovelListParameter, GetNovelListUseCase } 
    from "../../domain/use_cases/novel/get_novel_list_use_case.ts";
import { PostNovelParameter, PostNovelUseCase } 
    from "../../domain/use_cases/novel/post_novel_use_case.ts";
import { Controller } from "./base/controller.ts";

export {
    NovelController,
};

class NovelController extends Controller {
    private readonly getNovelListUseCase: GetNovelListUseCase;
    private readonly postNovelUseCase: PostNovelUseCase;

    async postNovel(context: Context): Promise<void> {
        const record = await this.getRequestBodyRecord(context);
        if (record instanceof Error) {
            const data: ApiResponse = {
                meta: {error: record.message},
                data: null,
            };
            context.response.body = data;
            return;
        }

        const data = await this
            .postNovelUseCase
            .invoke(new PostNovelParameter({record: record}));
        
        this.matchResponse<string>(context, data, {
            onSuccess: (left) => {
                return {
                    id: left,
                };
            },
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
        
        this.matchResponse(context, data, {
            onSuccess: (left) => {
                return left.map(value => value.toRecord());
            }
        })
    }

    constructor({
        getNovelListUseCase, postNovelUseCase,
    } : {
        getNovelListUseCase: GetNovelListUseCase,
        postNovelUseCase: PostNovelUseCase,
    }) {
        super();
        this.getNovelListUseCase = getNovelListUseCase;
        this.postNovelUseCase = postNovelUseCase;
    }
}
