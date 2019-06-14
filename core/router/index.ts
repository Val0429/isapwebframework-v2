import Vue from 'vue';
import Router from 'vue-router';
import { RouteConfig } from 'vue-router';
import { BehaviorSubject } from 'rxjs';
import { observeOn, filter, first } from 'rxjs/operators';
import { AuthPluginData } from './../private/plugins/authentication';
import { isObjectEmpty } from './../utilities';

Vue.use(Router)

export interface IRegisterRouter {
    /**
     * client route path. ex: /home
     */
    path: string;
    /**
     * client route name. ex: Home, or _('w_Home')
     */
    name: string;
    /// font-awesome (https://fontawesome.com/icons?d=gallery) ex: fa-user, or isap icon ex: isap-icon-edit
    icon?: string;
    /// redirect to other path
    redirect?: string;
    /// custom data field, can be accessed by this.$route.meta
    meta?: any;
    /// reference path of server, to check permission. for boolean type, true means only required to login.
    permission?: string | boolean;

    disableContainer?: boolean;
}

interface IRegisterRouterInput {
    path: string;
    name: string;
    /// font-awesome (https://fontawesome.com/icons?d=gallery) ex: fa-user, or isap icon ex: isap-icon-edit
    icon?: string;
    redirect?: string;
    meta?: any;
    permission?: string | boolean;

    component: any;
    disableContainer?: boolean;
}

const routes: RouteConfig[] = [];
export function RegisterRouter(config: IRegisterRouter) {
    return (component?) => {
        let input: IRegisterRouterInput = {
            ...config, component
        }
        routeCache.push(input);
        resolveRoute(input);
    }
}
let loginRoute: IRegisterRouterInput;
export function RegisterLoginRouter(config: IRegisterRouter) {
    return (component?) => {
        let input: IRegisterRouterInput = {
            ...config, component
        }
        loginRoute = input;

        return RegisterRouter(config)(component);
    }
}
/// FindLogin ////////////////////////
export function FindLoginRouter(): IRegisterRouterInput {
    return loginRoute;
}
/// FindRouter ///////////////////////
const routeCache: IRegisterRouterInput[] = [];
export function FindRouter(options: Partial<IRegisterRouterInput>): IRegisterRouterInput[] {
    return routeCache.filter((route) => {
        let keys = Object.keys(options);
        for (let key of keys) {
            if (route[key] !== options[key]) return false;
        }
        return true;
    });
}
//////////////////////////////////////
const defComponent = { render: (c) => c('router-view') };
function resolveRoute(config: IRegisterRouterInput) {
    let { path, name, component, redirect, meta } = config;

    let insertRoute = (routes: RouteConfig[], paths: string[], level: number = 0) => {
        if (paths.length === 0) return;
        let last = paths.length === 1;
        let path = paths[0];
        /// find the route
        let idx = routes.findIndex( value => value.path === path || value.path === path.replace(/^\//, '') );
        if (last) {
            let data = {
                path: level === 0 ? `${path}` : path.replace(/^\//, ''), name, redirect, meta, component: component || defComponent
            }
            if (idx === -1) routes.push(data);
            else {
                let route = routes[idx];
                Object.assign(route, data);
            }
            return;

        } else {
            let data = {
                path: level === 0 ? `${path}` : path.replace(/^\//, ''),
                name: path,
                redirect,
                component: defComponent,
                children: []
            }
            let route: RouteConfig = data;
            if (idx === -1) routes.push(data);
            else {
                route = routes[idx];
                if (!route.children) route.children = [];
            }
            paths.shift();
            insertRoute(route.children, paths, level+1);
        }
    }
    
    /// 1) split paths
    //let paths = path.split('/').filter(v => v);
    let paths = path.match(/\/([^\/]+|$)/g);
    insertRoute(routes, paths);

}

const sjDefaultRoute: BehaviorSubject<any> = new BehaviorSubject(null);
export default new Promise<Router>( (resolve) => {
    setTimeout( () => {
        let router = new Router({
            mode: 'history',
            linkActiveClass: 'open active',
            base: process.env.BASE_URL,
            routes
        });
        resolve(router);
        sjDefaultRoute.next(router);

        initGuards(router);
    }, 0);
});

function initGuards(router: Router) {
    let loginRouter = FindLoginRouter();
    let loginPath = loginRouter.path;

    router.beforeEach(async (to, from, next) => {
        do {
            let toPath = to.path;
            /// 1) allow login page
            if (loginPath === toPath) return next();

            /// 2) for others, check permission
            /// 2.1) check route permission
            let routers = FindRouter({ path: toPath });
            if (routers.length === 0) break;
            let router = routers[routers.length-1];
            /// 2.2) allow if no permission
            let permission = router.permission;
            if (permission === false) return next();
            /// 2.3) fetch permissions
            if (isObjectEmpty(AuthPluginData.permissions)) {
            // if (!AuthPluginData.permissions) {
                try {
                    let data = await new Vue().$login();
                } catch(e) {
                    /// 2.3.1) if failed, redirect to login page
                    break;
                }
            }
            /// 2.4) pass permission === true || default
            if (permission === true || permission === undefined) return next();

            /// 3) do permission check
            let rule = (AuthPluginData.permissions[permission] || {})['Get'];
            /// 3.1) if failed, redirect to login
            if (!rule) break;

            return next();

        } while(0);

        return next(loginPath);
    });
}