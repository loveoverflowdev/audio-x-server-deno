// import { NovelController } from "./app/presentation/controllers/novel_controller.ts";
// import { NovelRepositoryImpl } from "./app/data/repositories/novel_repository_impl.ts";
// import { NovelRepository } from "./app/domain/repositories/novel_repository.ts";
// import { GetDummyNovelListUseCase } from "./app/domain/use_cases/get_dummy_novel_lise_use_case.ts";

// const novelRepository: NovelRepository = new NovelRepositoryImpl();
// const getDummyNovelListUseCase: GetDummyNovelListUseCase = new GetDummyNovelListUseCase({
//     repository: novelRepository,
// });
// const novelController: NovelController = new NovelController({
//     getDummyNovelListUseCase: getDummyNovelListUseCase,
// });

// console.log(
//     await getDummyNovelListUseCase.invoke());

const setOption: Record<string, unknown> = {};
setOption['author'] = 'adads';
setOption['autho'] = undefined;
setOption['number'] = 'adasd';

// const a: unknown = 123;
// console.log(typeof a === 'number');

console.log(setOption['number']);

// deno run --allow-net --allow-env --allow-read index.ts