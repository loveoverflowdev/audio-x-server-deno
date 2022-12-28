export {
    type ApiResponse,
}

interface ApiResponse {
    meta: MetaResponse;
    data: Record<string, unknown> | Record<string, unknown>[] | null;
}

interface MetaResponse {
    error: string | null;
}
