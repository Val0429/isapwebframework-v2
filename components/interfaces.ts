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
