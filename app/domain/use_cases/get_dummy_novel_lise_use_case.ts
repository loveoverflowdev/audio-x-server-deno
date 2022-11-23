import { Either } from "../../core/dependencies/monads.ts";
import { NovelEntity } from "../entities/novel_entity.ts";
import { NovelRepository } from "../repositories/novel_repository.ts";

export {
    GetDummyNovelListUseCase,
}

class GetDummyNovelListUseCase {
    private repository: NovelRepository;
    
    constructor({repository} : {repository: NovelRepository}) {
        this.repository = repository;
    }

    invoke(): Promise<Either<NovelEntity[], Error>> {
        return this.repository.getDummyNovelList();
    }
}

/*
http://archive.org/download/DauPhaThuongKhungTH/01_Chương 0001-0050 Dau Pha Thuong Khung.mp3
*/
