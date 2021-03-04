/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

//import * as Rx from 'rxjs/Rx';
import { observeOn, filter, first, map } from 'rxjs/operators';
import { BehaviorSubject, Subject, asapScheduler, Observable } from 'rxjs';
import { Mutex } from './../utility/mutex';

import { request } from './../utility/request';
import WSSocket from 'isomorphic-ws';
import config from '@/config/default/serverConfig';
const debug = require('@/config/default/debug');

/// bridge Log /////////////////////
import * as Print from './../../utilities/print';
let Log = {
    Info: (title: string, message: string) => Print.Message(title, message, 'info'),
    Error: (title: string, message: string) => Print.Message(title, message, 'error'),
};
////////////////////////////////////

type ParseObject<T> = T;
type IncomingMessage = any;

export async function retry<T>(func: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void | Promise<void>, times: number = 10, hintname: string | null = null, rejectFilter: ((e: any) => boolean) | null = null): Promise<T> {
    let count: number = 0;
    let err;
    return new Promise<T>(async (resolve, reject) => {
        do {
            try {
                return resolve(await new Promise<T>((resolve, reject) => func(resolve, reject)));
            } catch (e) {
                err = e;
            }

            /// error log
            let test = Math.log10(count);
            if (test > 0 && Number.isInteger(test)) Log.Error('Critical Error', `${hintname ? `Function <${hintname}> ` : ''}Retry ${count} times with error: ${err}`);
            /// reject when there is an error happens
            if (rejectFilter && rejectFilter(err)) break;
        } while (times === 0 || ++count < times);
        return reject(err);
    });
}

export class Socket {
    io: WSSocket;
    private sendCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    static get(ws: WSSocket): any;
    static get(arg1: any, arg2?: any): Promise<Socket | null> {
        return new Promise((resolve) => {
            var ws: any, info: any, cb;
            if (!arg2) {
                if (arg1 instanceof WSSocket) {
                    ws = arg1;
                    info = {};
                    cb = (c: any) => {
                        c(ws);
                    };
                } else {
                    ws = (<any>arg1)._websocket; /// check response
                    if (!ws) {
                        resolve(null);
                        return;
                    }
                    info = ws.info;
                    cb = ws.cb;
                }
            } else {
                info = arg1;
                cb = arg2;
            }
            if (info.vsocket) {
                resolve(info.vsocket);
                return;
            }
            cb((socket: any) => {
                info.vsocket = new Socket(socket);
                resolve(info.vsocket);
            });
        });
    }

    private constructor(socket: WSSocket) {
        this.io = socket;
    }

    sendPromise(data: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.send(data, (err) => {
                if (!err) return resolve();
                reject(err);
            });
        });
    }

    send(data: any, cb?: (err: Error) => void): void;
    send(data: any, options: { mask?: boolean; binary?: boolean }, cb?: (err: Error) => void): void;
    send(data: any, arg2: any, arg3?: any) {
        typeof data === 'object' && (data = JSON.stringify(data));
        var cb = arg3 || arg2;
        cb = this.wrapper(cb);
        this.sendCount.next(this.sendCount.getValue() + 1);
        this.io.send.call(this.io, data, cb);
    }
    private wrapper(callback: (err: Error) => void): (err: Error) => void {
        return (err: Error): void => {
            callback && callback(err);
            this.sendCount.next(this.sendCount.getValue() - 1);
        };
    }

    public closeGracefully() {
        //let subscription = this.sendCount.observeOn(Rx.Scheduler.asap).subscribe( (value) => {
        let subscription = this.sendCount.pipe(observeOn(asapScheduler)).subscribe((value) => {
            if (value === 0) {
                this.io.close();
                subscription.unsubscribe();
            }
        });
    }
}

export interface IInputPagingBase {
    page?: number;
    pageSize?: number;
    all?: 'true' | 'false';
}

export type IInputPaging<T> = {
    paging?: IInputPagingBase;
} & T;

export interface IOutputPagingBase {
    total: number;
    totalPages?: number;
}

export type IOutputPaging<T> = {
    paging?: IInputPagingBase & IOutputPagingBase;
} & {
    results: T[];
};

export interface Option {
    paging?: boolean;
    parseObject?: boolean;
}

export interface ValidObject {
    objectId: string;
}

export type InputC<T> = T;
export type OutputC<
    T,
    K extends Option = {
        parseObject: true;
    },
    U = K extends { parseObject: false } ? T : ParseObject<T>
> = U;

export type InputR<
    T,
    K extends Option = {
        paging: true;
    },
    U = K extends { paging: false } ? Partial<T> : IInputPaging<Partial<T>>
> = U & Partial<ValidObject>;
export type OutputR<
    T,
    K extends Option = {
        paging: true;
        parseObject: true;
    },
    U = K extends { parseObject: false } ? T : ParseObject<T>,
    V = K extends { paging: false } ? U : IOutputPaging<U>
> = V;

export type InputU<T> = ValidObject & Partial<T>;
export type OutputU<
    T,
    K extends Option = {
        parseObject: true;
    },
    U = K extends { parseObject: false } ? T : ParseObject<T>
> = U;

export type InputD<T> = InputU<T>;
export type OutputD<
    T,
    K extends Option = {
        parseObject: true;
    }
> = OutputU<T, K>;

/// Server
export type ApisType = 'All' | 'Get' | 'Post' | 'Put' | 'Delete' | 'Ws';

/// Server Implement
export interface ApisRequestArg {
    [path: string]: [any, any, boolean];
}
export type ApisRequestBase = { [K in ApisType]?: ApisRequestArg };

type ApisExtractInput<T> = T extends [infer K, infer U, infer V] ? K : never;
type ApisExtractOutput<T> = T extends [infer K, infer U, infer V] ? U : never;
type ApisExtractLoginRequired<T> = T extends [infer K, infer U, infer V] ? V : never;
type ApisSessionRequired = { sessionId: string };

interface IiSAPServerBaseConfig {
    ip: string;
    port: number;
    ssl?: boolean;
    cgiPath?: string;
}
export interface IGeneralRequestError {
    errno: string;
    code: string;
    syscall: string;
    hostname: string;
    host: string;
    port: string;
}

export interface IGeneralRequestRejection {
    err: IGeneralRequestError;
    res: IncomingMessage;
    // body: any;
}

export interface ISubjectResponse {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    uri: string;
    params: any;
    response: any /*object*/;
}

export interface ISubjectError {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    uri: string;
    params: any;
    error: IGeneralRequestRejection;
    hideDefaultMessage?: boolean;
}

export interface IListenerDelete {
    path: string;
    objectId: string;
}

export class iSAPServerBase<T extends ApisRequestBase, W extends IiSAPServerBaseConfig = IiSAPServerBaseConfig> {
    protected config: W;
    protected sessionId: string | null = null;
    protected sjLogined: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private ssl: boolean;
    constructor(config: W) {
        this.config = config;
    }

    private makeUrl(uri: string, ws: boolean = false): string {
        let { ip, port, ssl, cgiPath } = this.config;
        let protocol = ws ? 'ws' : 'http';
        if (ssl) protocol += "s";
        return `${protocol}://${ip}:${port}${cgiPath?("/"+cgiPath):""}${uri}`;
    }

    /// caches of result / errors //////////////////////////////////
    private caches: { [index: string]: Promise<any> } = {};
    private getCacheHash(method: 'GET' | 'POST' | 'PUT' | 'DELETE', uri: string, data: any): string {
        return `${method} ${uri} ${JSON.stringify(data)}`;
    }
    private getCache(method: 'GET' | 'POST' | 'PUT' | 'DELETE', uri: string, data: any) {
        return this.caches[this.getCacheHash(method, uri, data)];
    }
    private setCache(method: 'GET' | 'POST' | 'PUT' | 'DELETE', uri: string, data: any, promise: Promise<any>) {
        this.caches[this.getCacheHash(method, uri, data)] = promise;
    }
    private withdrawCache(method: 'GET' | 'POST' | 'PUT' | 'DELETE', uri: string, data: any) {
        delete this.caches[this.getCacheHash(method, uri, data)];
    }
    public readonly sjResponse: Subject<ISubjectResponse> = new Subject();
    public readonly sjError: Subject<ISubjectError> = new Subject();
    ////////////////////////////////////////////////////////////////

    async C<K extends keyof T['Post'], U extends ApisExtractInput<T['Post'][K]>, V extends ApisExtractOutput<T['Post'][K]>, P extends ApisExtractLoginRequired<T['Post'][K]>, C extends P extends false ? U : ApisSessionRequired & U>(key: K, data?: U, help?: boolean, spec: 'POST' | 'PUT' = 'POST', hideDefaultMessage?: boolean): Promise<V> {
        if (!data) data = {} as any;
        /// apply sessionId
        this.sessionId && ((data as any).sessionId = this.sessionId);

        /// resolve cache
        let promise: Promise<V> = this.getCache(spec, key as string, data);
        if (promise) return promise;

        promise = new Promise<V>((resolve, reject) => {
            request(
                {
                    url: this.makeUrl(key as string) + (help ? '&help' : ''),
                    method: spec,
                    json: false,
                    body: data,
                    headers: {
                        'content-type': 'application/json',
                    },
                },
                (err, res, body) => {
                    /// withdraw cache
                    this.withdrawCache(spec, key as string, data);

                    if (err) return reject({ err });
                    if ((res as any).statusCode !== 200) return reject({ res, body });
                    if (help) return resolve(body);
                    /// handle sessionId
                    body = body ? JSON.parse(body) : {};
                    if (body.sessionId && /login/.test(key as string)) {
                        this.sessionId = body.sessionId;
                        this.sjLogined.next(true);
                    }
                    resolve(body);
                },
            );
        });
        promise.then( (response) => this.sjResponse.next({ method: spec, uri: key as any, params: data, response }) )
        .catch( (error) => this.sjError.next({ method: spec, uri: key as any, params: data, error, hideDefaultMessage }) );
        this.setCache(spec, key as string, data, promise);
        return promise;
    }

    Url<K extends keyof T['Get'], U extends ApisExtractInput<T['Get'][K]>>(key: K, data?: U, help?: boolean): string {
        if (!data) data = {} as any;
        let deepTrace = (prevKey: any, data?: any) => {
            if (!data) {
                data = prevKey;
                prevKey = null;
            }
            let isArray = Array.isArray(data);
            return Object.keys(data).reduce<string[]>((final, key) => {
                let value = data[key];
                if (!(value instanceof Object)) {
                    value = encodeURIComponent(value);
                    if (isArray) final.push(prevKey ? `${prevKey}=${value}` : `${key}=${value}`);
                    else final.push(prevKey ? `${prevKey}.${key}=${value}` : `${key}=${value}`);
                }
                else final.splice(0, 0, ...deepTrace(key, value));
                return final;
            }, []);
        };
        let params = deepTrace(data).join('&') + (help ? '&help' : '');
        return `${this.makeUrl(key as string)}?${params}`;
    }


    async R<K extends keyof T['Get'], U extends ApisExtractInput<T['Get'][K]>, V extends ApisExtractOutput<T['Get'][K]>, P extends ApisExtractLoginRequired<T['Get'][K]>, C extends P extends false ? U : ApisSessionRequired & U>(key: K, data?: U, help?: boolean, spec: 'GET' | 'DELETE' = 'GET', hideDefaultMessage?: boolean): Promise<V> {
        // await this.waitForLogin();

        if (!data) data = {} as any;
        /// apply sessionId
        this.sessionId && ((data as any).sessionId = this.sessionId);

        /// resolve cache
        let promise: Promise<V> = this.getCache(spec, key as string, data);
        if (promise) return promise;

        promise = new Promise<V>((resolve, reject) => {
            request(
                {
                    url: this.Url(key, data, help),
                    method: spec,
                    json: false,
                },
                (err, res, body) => {
                    /// withdraw cache
                    this.withdrawCache(spec, key as string, data);

                    if (err) return reject({ err });
                    if ((res as any).statusCode !== 200) return reject({ res, body });
                    if (help) return resolve(body);
                    /// handle sessionId
                    body = body ? JSON.parse(body) : {};
                    if (body.sessionId && /login/.test(key as string)) {
                        this.sessionId = body.sessionId;
                        this.sjLogined.next(true);
                    }
                    resolve(body);
                },
            );
        });
        promise.then( (response) => this.sjResponse.next({ method: spec, uri: key as any, params: data, response }) )
        .catch( (error) => this.sjError.next({ method: spec, uri: key as any, params: data, error, hideDefaultMessage }) );
        this.setCache(spec, key as string, data, promise);
        return promise;        
    }

    async U<K extends keyof T['Put'], U extends ApisExtractInput<T['Put'][K]>, V extends ApisExtractOutput<T['Put'][K]>, P extends ApisExtractLoginRequired<T['Put'][K]>, C extends P extends false ? U : ApisSessionRequired & U>(key: K, data: U, help?: boolean, hideDefaultMessage?: boolean): Promise<V> {
        return (this.C(key, data, help, 'PUT', hideDefaultMessage) as any) as V;
    }

    /// Provide deletion listener
    protected sjD: Subject<IListenerDelete> = new Subject<IListenerDelete>();
    async D<K extends keyof T['Delete'], U extends ApisExtractInput<T['Delete'][K]>, V extends ApisExtractOutput<T['Delete'][K]>, P extends ApisExtractLoginRequired<T['Delete'][K]>, C extends P extends false ? U : ApisSessionRequired & U>(key: K, data: U, help?: boolean, hideDefaultMessage?: boolean): Promise<V> {
        let deletion = (this.R(key, data, help, 'DELETE', hideDefaultMessage) as any) as V;
        this.sjD.next({ path: key as string, objectId: data.objectId });
        return deletion;
    }
    public listenD<K extends keyof T['Delete']>(path: string): Observable<string> {
        return this.sjD.pipe( filter(v => v.path === path) )
            .pipe( map(v => v.objectId) );
    }

    async WS<K extends keyof T['Ws'], U extends ApisExtractInput<T['Ws'][K]>, V extends ApisExtractOutput<T['Ws'][K]>, P extends ApisExtractLoginRequired<T['Ws'][K]>, C extends P extends false ? U : ApisSessionRequired & U>(key: K): Promise<Socket> {
        return new Promise<Socket>((resolve, reject) => {
            const url = `${this.makeUrl(key as string, true)}?sessionId=${this.sessionId}`;
            const ws = new WSSocket(url);
            ws.on('error', (err) => {
                reject({ err });
            });
            ws.on('open', async () => {
                let socket = await Socket.get(ws);
                let callback = (data: any) => {
                    let result = JSON.parse(data);
                    do {
                        if (result.statusCode === 200) {
                            resolve(socket);
                            break;
                        }
                        reject({
                            res: { statusCode: result.statusCode },
                            body: result.message,
                        });
                    } while (0);
                    socket.io.removeListener('message', callback);
                };
                socket.io.addListener('message', callback);
            });
        });
    }

    getSessionId(): string | null {
        return this.sessionId;
    }

    setSessionId(value: string) {
        this.sessionId = value;
        this.sjLogined.next(true);
    }

    private static defaultServer: iSAPServerBase<any> = null;
    public static getDefault<T>(this: { new(...args): T }): T {
        let conf: IiSAPServerBaseConfig = !debug.prodMode ? Object.assign({}, config) : { port: config.prodPort, cgiPath: config.cgiPath } as any;
        let { hostname, port, protocol } = window.location;
        conf.ip = conf.ip || hostname;
        conf.ssl = typeof conf.ssl === "boolean" ? conf.ssl : /^https/.test(protocol);
        conf.port = conf.port || +port || (conf.ssl ? 443 : 80);

        return ((this as any).defaultServer || ((this as any).defaultServer = new this(conf)));
    }
    public static sharedInstance<T>(this: { new(...args): T }): T {
        return (this as any).getDefault();
    }

    protected waitForLogin(): Promise<boolean> {
        return this.sjLogined
            .pipe(filter((v) => v))
            .pipe(first())
            .toPromise();
    }    
}

type ExtractInterface<T> = T extends iSAPServerBase<infer U, infer V> ? V : never;

interface IiSAPServerAutoConfig extends IiSAPServerBaseConfig {
    username: string;
    password: string;
    loginPath?: string;
}
export class iSAPAutoServerBase<T extends ApisRequestBase, W extends IiSAPServerAutoConfig = IiSAPServerAutoConfig> extends iSAPServerBase<T, W> {
    protected sjRequestLogin: Subject<void> = new Subject<void>();
    protected mtxLogin: Mutex = new Mutex();
    constructor(config: W) {
        super(config);
        config.loginPath = config.loginPath || '/users/login';
        this.sjRequestLogin.subscribe(() => this.doLogin());
    }

    private async doLogin() {
        if (this.mtxLogin.isLocked()) return;
        await this.mtxLogin.acquire();
        this.sjLogined.next(false);

        let { username, password } = this.config;
        this.C(
            this.config.loginPath as any,
            {
                username,
                password,
            } as any,
        )
            .then(() => {
                this.mtxLogin.release();
            })
            .catch((e: IGeneralRequestRejection) => {
                Log.Error(this.constructor.name, `Auto login failed: ${JSON.stringify(e)}`);
                this.mtxLogin.release();
                // setTimeout(() => this.doLogin(), 1000);
            });
    }

    private rejection(e: IGeneralRequestRejection): boolean {
        return e.res && e.res.statusCode === 403 ? true : false;
    }

    async C<K extends keyof T['Post'], U extends ApisExtractInput<T['Post'][K]>, V extends ApisExtractOutput<T['Post'][K]>, P extends ApisExtractLoginRequired<T['Post'][K]>, C extends P extends false ? U : ApisSessionRequired & U>(key: K, data?: U, help?: boolean, spec: 'POST' | 'PUT' = 'POST'): Promise<V> {
        return retry<V>(
            async (resolve, reject) => {
                if (key !== this.config.loginPath) {
                    this.sjLogined.getValue() === false && this.sjRequestLogin.next();
                    await this.waitForLogin();
                }
                super
                    .C(key, data, help, spec)
                    .then(resolve as any)
                    .catch(async (e: IGeneralRequestRejection) => {
                        /// don't do relogin if rejection
                        if (this.rejection(e)) return reject(e);
                        this.sjRequestLogin.next();
                        await this.waitForLogin();
                        reject(e);
                    });
            },
            0,
            'iSAPServerC',
            this.rejection,
        );
    }

    async R<K extends keyof T['Get'], U extends ApisExtractInput<T['Get'][K]>, V extends ApisExtractOutput<T['Get'][K]>, P extends ApisExtractLoginRequired<T['Get'][K]>, C extends P extends false ? U : ApisSessionRequired & U>(key: K, data?: U, help?: boolean, spec: 'GET' | 'DELETE' = 'GET'): Promise<V> {
        return retry<V>(
            async (resolve, reject) => {
                if (key !== this.config.loginPath) {
                    this.sjLogined.getValue() === false && this.sjRequestLogin.next();
                    await this.waitForLogin();
                }

                super
                    .R(key, data, help, spec)
                    .then(resolve as any)
                    .catch(async (e) => {
                        this.sjRequestLogin.next();
                        await this.waitForLogin();
                        reject(e);
                    });
            },
            0,
            'iSAPServerC',
        );
    }

    async WS<K extends keyof T['Ws'], U extends ApisExtractInput<T['Ws'][K]>, V extends ApisExtractOutput<T['Ws'][K]>, P extends ApisExtractLoginRequired<T['Ws'][K]>, C extends P extends false ? U : ApisSessionRequired & U>(key: K): Promise<Socket> {
        return retry<Socket>(async (resolve, reject) => {
            this.sjLogined.getValue() === false && this.sjRequestLogin.next();
            await this.waitForLogin();

            super
                .WS(key)
                .then(resolve)
                .catch((e) => {
                    console.log('reject!', e);
                    reject(e);
                });

            //let ws = await super.WS(key);

            // let callback = (data) => {
            //     let result = JSON.parse(data);
            //     do {
            //         if (result.statusCode===200) { resolve(ws); break; }
            //         reject(result);
            //     } while(0);
            //     ws.io.removeListener("message", callback);
            // }
            // ws.io.addListener("message", callback);
        });
    }
}
