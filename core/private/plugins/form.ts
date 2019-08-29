/*
 * Created on Tue Aug 26 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue } from 'vue-property-decorator';

declare module "vue/types/vue" {
    export interface Vue {
        $form(ref: string, keys?: string): any;
    }
}

export const FormPlugin = {
    install: function(Vue: any) {
        if (Vue._isap_form_installed) return;
        Vue._isap_form_installed = true;

        Vue.mixin({
            methods: {
                $form: function(this: Vue, ref: string, keys?: string): any {
                    var me: any = this;
                    /// link to form
                    setTimeout(() => {
                        let watchRef = (me.$refs[ref] || {})._uid;
                        if (!watchRef || me._watchRef == watchRef) return;
                        me._watchRef = watchRef;
                        /// recover the link
                        this.$forceUpdate();
                    }, 0);

                    /// calculate result
                    let result = (<any>((this.$refs || {})[ref] || {})).result;
                    if (result == null) return null;
                    while (result instanceof Vue) result = result.result;
                    if (result == null) return null;
                    if (!keys) return result;

                    for (let key of keys.split(".")) {
                        result = result[key];
                        if (result == null) return null;
                    }
                    return result;
                }
            }
        })
    }
}
