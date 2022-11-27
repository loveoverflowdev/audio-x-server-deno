import { Context } 
    from "../../core/dependencies/oak.ts";
import { ApiResponse } from "../../core/response/api_response.ts";
import { GetNovelChapterListUseCase, GetNovelChapterListParamter } 
    from "../../domain/use_cases/novel_chapter/get_novel_chapter_list_use_case.ts";
import { PostNovelChapterParameter, PostNovelChapterUseCase } 
    from "../../domain/use_cases/novel_chapter/post_novel_chapter_use_case.ts";

export {
    NovelChapterController,
}

class NovelChapterController {
    private readonly getNovelChapterListUseCase: GetNovelChapterListUseCase;
    private readonly postNovelChapterUseCase: PostNovelChapterUseCase;

    async postNovelChapter(context: Context) {
        const formBody = context.request.body({ type: 'form-data' })
        const formData = await formBody.value.read();
        const data = await this
            .postNovelChapterUseCase
            .invoke(new PostNovelChapterParameter({
                record: formData.fields,
            }));
        
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

    async getNovelChapterList(context: Context, { novelId } : {
        novelId: string | undefined,
    }): Promise<void> {
        const data = await this
            .getNovelChapterListUseCase
            .invoke(new GetNovelChapterListParamter({
                novelId: novelId,
            }));
        
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

    constructor({getNovelChapterListUseCase, postNovelChapterUseCase} : {
        getNovelChapterListUseCase: GetNovelChapterListUseCase,
        postNovelChapterUseCase: PostNovelChapterUseCase,
    }) {
        this.getNovelChapterListUseCase = getNovelChapterListUseCase;
        this.postNovelChapterUseCase = postNovelChapterUseCase;
    }
}
