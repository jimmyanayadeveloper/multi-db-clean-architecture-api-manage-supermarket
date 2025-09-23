import { CustomError } from "../../../domain/errors/custom.error";

export type DtoResult<T> = { ok: true, value: T } | { ok: false, error: CustomError };