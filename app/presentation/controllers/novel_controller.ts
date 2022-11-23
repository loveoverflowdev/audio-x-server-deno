import { Context } from "../../core/dependencies/oak.ts";
import { ApiResponse } from "../../core/response/api_response.ts";
import { GetDummyNovelListUseCase } 
    from "../../domain/use_cases/get_dummy_novel_lise_use_case.ts";

export {
    NovelController,
};

class NovelController {
    private getDummyNovelListUseCase: GetDummyNovelListUseCase;

    async getNovelList(context: Context): Promise<void> {
        const data = await this.getDummyNovelListUseCase.invoke();
        
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
                context.response.status = 404;
                context.response.body = data;
            },
        });
    }

    constructor({
        getDummyNovelListUseCase,
    } : {
        getDummyNovelListUseCase: GetDummyNovelListUseCase,
    }) {
        this.getDummyNovelListUseCase = getDummyNovelListUseCase;
    }
}
