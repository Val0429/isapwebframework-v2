/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit, Watch, Inject } from "vue-property-decorator";

@Component
export class Permission extends Vue {
    @Prop({ type: String, required: false, default: null })
    url: string | string[];

    @Prop({ type: [String, Array], required: false, default: null })
    allow: string | string[];

    @Prop({ type: [String, Array], required: false, default: null })
    deny: string | string[];

    public static checkUrl(url: string | string[], $permissions: any): boolean {
        /// url check
        url = Array.isArray(url) ? url : [url];
        return url.reduce<boolean>((final, value) => {
            if (!final || !($permissions[value] || {})['Get']) return false;
            return final;
        }, true);
    }

    public static checkAllow(allow: string | string[], $user: any): boolean {
        let roles = (($user.user || {}).roles || []).map( value => value.name );
        if (roles.length === 0) return false;
        allow = Array.isArray(allow) ? allow : [allow];
        if ( allow.filter(val => roles.includes(val)).length > 0 ) return true;
        return false;
    }

    public static checkDeny(deny: string | string[], $user: any): boolean {
        let roles = (($user.user || {}).roles || []).map( value => value.name );
        if (roles.length === 0) return false;
        deny = Array.isArray(deny) ? deny : [deny];
        if ( deny.filter(val => roles.includes(val)).length > 0 ) return false;
        return true;
    }

    private isAllowed(): boolean {
        if (this.url) return Permission.checkUrl(this.url, this.$permissions);
        // /// url check
        // if (this.url) {
        //     let url = Array.isArray(this.url) ? this.url : [this.url];
        //     return url.reduce<boolean>((final, value) => {
        //         if (!final || !(this.$permissions[value] || {})['Get']) return false;
        //         return final;
        //     }, true);
        // }

        /// role check
        if (this.allow) return Permission.checkAllow(this.allow, this.$user);
        if (this.deny) return Permission.checkDeny(this.deny, this.$user);
        // let roles = ((this.$user.user || {}).roles || []).map( value => value.name );
        // if (roles.length === 0) return false;
        // if (this.allow) {
        //     let allow = Array.isArray(this.allow) ? this.allow : [this.allow];
        //     if ( allow.filter(val => roles.includes(val)).length > 0 ) return true;
        //     return false;
        // }
        // if (this.deny) {
        //     let deny = Array.isArray(this.deny) ? this.deny : [this.deny];
        //     if ( deny.filter(val => roles.includes(val)).length > 0 ) return false;
        //     return true;
        // }
        return true;
    }
}
export default Permission;

Vue.directive('permission', (el, binding, vnode) => {
    /// ex: allow, deny, url
    let arg = binding.arg;
    /// ex: ["Administrator"]
    let expression;
    eval(`expression = ${binding.expression}`);

    let context = (vnode as any).context;
    let $user = context.$user;
    let $permissions = context.$permissions;

    const check = () => {
        if (arg === 'url') return Permission.checkUrl(expression, $permissions);
        if (arg === 'allow') return Permission.checkAllow(expression, $user);
        if (arg === 'deny') return Permission.checkDeny(expression, $user);
    };

    if (!check()) {
        const comment = document.createComment(' ');
        Object.defineProperty(comment, 'setAttribute', {
            value: () => undefined
        });
        vnode.elm = comment;
        vnode.text = ' ';
        vnode.isComment = true;
        vnode.context = undefined;
        vnode.tag = undefined;
        vnode.data.directives = undefined;

        if (vnode.componentInstance)
            (vnode.componentInstance as any).$el = comment;
        if (el.parentNode)
            el.parentNode.replaceChild(comment, el);
    }

    //console.log('arg', arg, 'expression', expression, typeof expression);
    //console.log('el', el, binding, vnode);
    // console.log('en', context, $user, $permissions);
});