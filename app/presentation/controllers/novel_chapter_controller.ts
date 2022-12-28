import { Context } 
    from "../../core/dependencies/oak.ts";
import { ApiResponse } from "../../core/response/api_response.ts";
import { GetNovelChapterListUseCase, GetNovelChapterListParamter } 
    from "../../domain/use_cases/novel_chapter/get_novel_chapter_list_use_case.ts";
import { PostNovelChapterParameter, PostNovelChapterUseCase } 
    from "../../domain/use_cases/novel_chapter/post_novel_chapter_use_case.ts";
import { PutNovelChapterParameter, PutNovelChapterUseCase } 
    from "../../domain/use_cases/novel_chapter/put_novel_chapter_use_case.ts";
import { Controller } from "./base/controller.ts";

export {
    NovelChapterController,
}

class NovelChapterController extends Controller {
    private readonly getNovelChapterListUseCase: GetNovelChapterListUseCase;
    private readonly postNovelChapterUseCase: PostNovelChapterUseCase;
    private readonly putNovelChapterUseCase: PutNovelChapterUseCase;

    async postNovelChapter(context: Context) {
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
            .postNovelChapterUseCase
            .invoke(new PostNovelChapterParameter({
                record: record,
            }));
        
        this.matchResponse(context, data, {
            onSuccess: (left) => {
                return {
                    result: left,
                }
            }
        });
    }

    async putNovelChapter(context: Context) {
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
            .putNovelChapterUseCase
            .invoke(new PutNovelChapterParameter({
                record: record,
            }));
        
        this.matchResponse(context, data, {
            onSuccess: (left) => {
                return {
                    result: left,
                }
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
        
        this.matchResponse(context, data, {
            onSuccess: (left) => {
                return left.map(e => e.toRecord());
            }
        });
    }

    constructor({getNovelChapterListUseCase, postNovelChapterUseCase, putNovelChapterUseCase} : {
        getNovelChapterListUseCase: GetNovelChapterListUseCase,
        postNovelChapterUseCase: PostNovelChapterUseCase,
        putNovelChapterUseCase: PutNovelChapterUseCase,
    }) {
        super();
        this.putNovelChapterUseCase = putNovelChapterUseCase;
        this.getNovelChapterListUseCase = getNovelChapterListUseCase;
        this.postNovelChapterUseCase = postNovelChapterUseCase;
    }
}
