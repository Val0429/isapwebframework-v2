/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

export interface IGetResult {
    paging: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    },
    results: any[];
}
