import { CustomError } from "../../errors/custom.error";

export type DtoResult<T> = { ok: true, value: T } | { ok: false, error: CustomError };