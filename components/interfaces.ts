/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { iSAPServerBase } from 'core/server/restful';

export interface IServer {
    server?: iSAPServerBase<any>;
    path: string;
}

export interface IServerTree {
    server: iSAPServerBase<any>;
    path: string;
    groupBy?: string;
    objectId?: string;
}
