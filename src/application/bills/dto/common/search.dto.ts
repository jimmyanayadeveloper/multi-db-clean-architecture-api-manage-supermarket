import { DtoResult } from "../../../../domain/bills/interfaces/response-dto";

export interface SearchDto {
    term?: string;
}
/* 
export function parseSearch(query: any): DtoResult<SearchDto> {
    const term = typeof query?.term === "string" ? query.term.trim() : undefined;
    if (term && term.length < 2) {
        return { ok: false, error: "Term must have at least 2 chars" };
    }
    return { ok: true, value: { term } }
} */