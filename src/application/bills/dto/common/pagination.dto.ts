import { DtoResult } from "../../../../domain/bills/interfaces/response-dto";


export interface PaginationDto {
    page: number;
    limit: number;
}

export function parsePagination(query: any): DtoResult<PaginationDto> {
    const rawPage = Number(query?.page);
    const rawLimit = Number(query?.limit);
    const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
    const limit = Number.isInteger(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 100) : 10;
    return { ok: true, value: { page, limit } }
}