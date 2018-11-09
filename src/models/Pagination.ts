export class ApiPagination<T> {
    found: number;
    page: number;
    perPage: number;
    total: number;
    rows: T[];
    keyword?: string;
}
