/*
 * Created on Tue Aug 26 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue } from 'vue-property-decorator';

declare module "vue/types/vue" {
    export interface Vue {
        $form(ref: string, key?: string): any;
        $vref(ref: string, key?: string): any;
    }
}

export const FormPlugin = {
    install: function(Vue: any) {
        if (Vue._isap_form_installed) return;
        Vue._isap_form_installed = true;

        Vue.mixin({
            methods: {
                $vref: function(this: Vue, ref: string, key?: string): any {
                    var me: any = this;
                    /// link to form
                    if (!me.$refs[ref]) {
                        /// do next tick
                        setTimeout(() => {
                            let watchRef = (me.$refs[ref] || {})._uid;
                            if (!watchRef || me._watchRef == watchRef) return;
                            me._watchRef = watchRef;
                            /// recover the link
                            this.$forceUpdate();
                        }, 0);
                        return;
                    }

                    /// calculate result
                    // let result = (<any>((this.$refs || {})[ref] || {})).result;
                    let result = (this.$refs || {})[ref];
                    if (result == null) return null;
                    // while (result instanceof Vue) result = result.result;
                    // if (result == null) return null;
                    if (!key) return result;

                    for (let k of key.split(".")) {
                        result = result[k];
                        if (result == null) return null;
                    }
                    return result;
                },

                $form: function(this: Vue, ref: string, key?: string): any {
                    // key = !key ? "result" : `result.${key}`;
                    // return this.$vref(ref, key);

                    var me: any = this;
                    /// link to form
                    if (!me.$refs[ref]) {
                        /// do next tick
                        setTimeout(() => {
                            let watchRef = (me.$refs[ref] || {})._uid;
                            if (!watchRef || me._watchRef == watchRef) return;
                            me._watchRef = watchRef;
                            /// recover the link
                            this.$forceUpdate();
                        }, 0);
                        return;
                    }

                    /// calculate result
                    let result = (<any>((this.$refs || {})[ref] || {})).result;
                    if (result == null) return null;
                    while (result instanceof Vue) result = result.result;
                    if (result == null) return null;
                    if (!key) return result;

                    for (let k of key.split(".")) {
                        result = result[k];
                        if (result == null) return null;
                    }
                    return result;
                }
            }
        })
    }
}
