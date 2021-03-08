/*
 * Created on Tue March 8 2021
 * Author: Val Liu
 * Copyright (c) 2021, iSAP Solution
 */

import { Vue } from 'vue-property-decorator';
import Server from '@/config/default/server';
import { BehaviorSubject } from 'rxjs';
import data from '@/package.json';
import { publish } from 'rxjs/internal/operators/publish';
import { refCount } from 'rxjs/internal/operators/refCount';
import { concatMap, share } from 'rxjs/operators';
import { Mutex } from '@/../core/server/utility/mutex';

declare module 'vue/types/vue' {
    export interface Vue {
        $info: IInfo;
    }
}

interface IInfoServer {
    name: string;
    version: string;
}

interface IInfoWeb {
    name: string;
    version: string;
}

interface IInfo {
    server?: IInfoServer;
    web?: IInfoWeb;
}

const info: IInfo = {
    server: {
        name: null,
        version: null
    },
    web: {
        name: data.name,
        version: data.version
    }
};
const mtxInfo: Mutex = new Mutex();
const sjInfo: BehaviorSubject<IInfo> = new BehaviorSubject<IInfo>(info);
let done = false;

export const InfoPlugin = {
    install: function(Vue: any) {
        if (Vue._isap_info_installed) return;
        Vue._isap_info_installed = true;

        Vue.mixin({
            subscriptions: () => {
                return {
                    $info: sjInfo
                }
            },

            async created() {
                try {
                    await mtxInfo.acquire();
                    if (done) return;
                    done = true;
                    let info = sjInfo.getValue();
                    if (info.server.version) return;

                    let apis = await this.$server.R("/apis", {}, undefined, undefined, true);
                    sjInfo.next({
                        ...info,
                        server: {
                            name: apis.serverName,
                            version: apis.serverVersion
                        }
                    });
                } finally {
                    mtxInfo.release();
                }
            },
        });
    },
};
