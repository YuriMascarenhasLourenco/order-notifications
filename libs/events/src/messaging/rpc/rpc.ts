export type RpcOk<T> = { ok: true; data: T };
export type RpcErr = { ok: false; errorCode: string; message: string };
export type RpcResult<T> = RpcOk<T> | RpcErr;
