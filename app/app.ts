import { Application } from "./core/dependencies/oak.ts";
import * as AppRouter from "./frameworks/app_router.ts";
import { config } from "./core/dependencies/dotenv.ts";

export {
    runApp,
};

function runApp(): Promise<void> {
    const router = AppRouter.buildRouter();
    const port = 8080;
    console.log(`Server running on port ${port}`);

    return new Application()
        .use(router.routes())
        .use(router.allowedMethods())
        .listen({ hostname: '127.0.0.1', port: port });
}
