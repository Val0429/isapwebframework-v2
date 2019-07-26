import { Vue } from 'vue-property-decorator';
import Server from '@/config/default/server';
import { filter } from 'rxjs/operators';
import { FindLoginRouter } from './../../router';
import { AlertResponse } from '@/../components/modal/alert-response';
import config from '@/config/default/serverConfig';
import { versionCompare } from '@/../core/utilities';
import { BehaviorSubject } from 'rxjs';
import data from '@/package.json';
const kSessionId = `${data.name}:sessionId`;

declare module 'vue/types/vue' {
    export interface Vue {
        $server: Server;
        $user: any;
        $permissions: any;
        $login: (auth?: ILogin) => any;
        $logout: (logoutPath?: string) => void;
        $goHome: () => void;
    }
}

interface ILogin {
    username: string;
    password: string;
}

export const AuthPluginData = {
    server: null,
    user: null,
    permissions: null,
};
Vue.set(AuthPluginData, 'server', Server.getDefault());
// Vue.set(AuthPluginData, "user", null);
// Vue.set(AuthPluginData, "permissions", null);
Vue.set(AuthPluginData, 'user', {});
Vue.set(AuthPluginData, 'permissions', {});

export const sjPermissions: BehaviorSubject<any> = new BehaviorSubject(null);

export const AuthPlugin = {
    install: function(Vue: any) {
        if (Vue._isap_auth_installed) return;
        Vue._isap_auth_installed = true;

        Vue.mixin({
            data: function() {
                return {
                    $server: AuthPluginData.server,
                    $user: AuthPluginData.user,
                    $permissions: AuthPluginData.permissions,
                };
            },

            methods: {
                $logout: async function(this: Vue, logoutPath?: string) {
                    logoutPath = logoutPath || '/users/logout';

                    main: do {
                        try {
                            /// 1) request logout
                            let data = await this.$server.R(logoutPath as any, {});
                            break main;
                        } catch (e) {
                            if ((e.res || {}).statusCode === 401) break main;
                            throw e;
                        }
                    } while (0);

                    /// 2) clean auth
                    /// clean user
                    Object.keys(AuthPluginData.user).forEach((key) => {
                        //Vue.set(AuthPluginData.user, key, undefined);
                        //delete AuthPluginData.user[key];
                        Vue.delete(AuthPluginData.user, key);
                    });
                    // Vue.set(AuthPluginData, 'user', {});
                    /// assign permissions
                    Object.keys(AuthPluginData.permissions).forEach((key) => {
                        // Vue.set(AuthPluginData.permissions, key, undefined);
                        // delete AuthPluginData.permissions[key];
                        Vue.delete(AuthPluginData.permissions, key);
                    });
                    // Vue.set(AuthPluginData, 'permissions', {});
                    sjPermissions.next(AuthPluginData.permissions);

                    /// 3) clean local storage
                    localStorage.removeItem(kSessionId);
                },

                $login: async function(this: Vue, auth?: ILogin) {
                    let router = FindLoginRouter();
                    let loginPath: any = router.permission || '/users/login';
                    let storedSessionId = localStorage.getItem(kSessionId);
                    if (!auth && !storedSessionId) throw 'sessionIdNotExists';
                    if (!auth) auth = { sessionId: storedSessionId } as any;

                    /// 1) request login
                    let data: any;
                    try {
                        data = await this.$server.C(loginPath, auth);
                    } catch (e) {
                        /// if session invalid, delete it
                        if ((auth as any).sessionId) localStorage.removeItem(kSessionId);
                        throw e;
                    }
                    let { sessionId } = data;

                    /// 2) request APIs
                    let apis: any = await this.$server.R('/apis' as any, { sessionId });
                    let apiVersion = apis.frameworkVersion;
                    let limitVersion = config.serverFrameworkVersionGreaterThan;
                    if (versionCompare(limitVersion, apiVersion) < 0) {
                        let message = this._('mb_VersionNotEnough', { version: limitVersion });
                        new AlertResponse({
                            propsData: {
                                label: this._('mb_VersionLimitation'),
                                value: message,
                            },
                        }).$modal();
                        throw message;
                    }

                    /// 3) assign
                    /// assign user
                    Object.keys(AuthPluginData.user).forEach((k) => Vue.delete(AuthPluginData.user, k));
                    // Object.keys(data).forEach((k) => Vue.set(AuthPluginData.user, k, data[k]));
                    Object.assign(AuthPluginData.user, data);
                    // Vue.set(AuthPluginData, "user", rUser);
                    /// assign permissions
                    Object.keys(AuthPluginData.permissions).forEach((k) => delete AuthPluginData.permissions[k]);
                    Object.assign(AuthPluginData.permissions, apis.APIs);
                    // Vue.set(AuthPluginData, "permissions", apis.APIs);
                    sjPermissions.next(AuthPluginData.permissions);
                    /// store sessionId
                    localStorage.setItem(kSessionId, sessionId);

                    return data;
                },

                $goHome: function(this: Vue) {
                    this.$router.push('//');
                },
            },

            created() {
                this.$server = this.$data.$server;
                this.$user = this.$data.$user;
                this.$permissions = this.$data.$permissions;
            },
        });
    },
};
