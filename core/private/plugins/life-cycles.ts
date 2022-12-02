/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue } from 'vue-property-decorator';

export const LifeCyclesPlugin = {
    install: function(Vue: any) {
        if (Vue._isap_life_cycles_installed) return;
        Vue._isap_life_cycles_installed = true;

        Vue.mixin({
            created() {
                this.$emit('created', this);
            },
            mounted() {
                this.$emit('mounted', this);
            },
            unmounted() {
                this.$emit('unmounted', this);
            }
        })
    }
}
