export interface IGetResult {
    paging: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    },
    results: any[];
}
