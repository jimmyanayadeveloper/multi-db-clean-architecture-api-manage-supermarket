import { DtoResult } from "../../../domain/bills/interfaces/response-dto";
import { Pagination } from "../../../domain/common/pagination";

export function parsePagination(query: any): Pagination {
    const rawPage = Number(query?.page);
    const rawLimit = Number(query?.limit);
    const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
    const limit = Number.isInteger(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 100) : 10;
    return { page, limit }
}