/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

export interface Config {
    /// for debug only. normally client & server share different port
    /// if without specific ip / port / ssl, will use current browser url
    ip?: string;
    port?: number;
    ssl?: boolean;
    cgiPath?: string;

    /// for release only. use case for one server host two clients, you will need to specify different port.
    prodPort?: number;

    /// only allow server framework > THIS to do login
    serverFrameworkVersionGreaterThan: string;
    /// hide server error popup?
    hideDefaultServerErrorModal?: boolean;
}
