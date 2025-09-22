export interface Pagination {
    page: number;
    limit: number;
    count?: number;
}

export interface PaginatedResponse<T, S> {
    items: T[];
    pagination: Pagination;
    summary?: S
}