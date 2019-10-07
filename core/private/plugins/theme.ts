/*
 * Created on Tue Oct 2 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue } from 'vue-property-decorator';
import { BehaviorSubject } from 'rxjs';
import config from '@/config/default/container';

declare module "vue/types/vue" {
    export interface Vue {
        $theme: typeof Vue;
    }
}

const sjTheme = new BehaviorSubject<typeof Vue>(config.container);

export const ThemePlugin = {
    install: function(Vue: any) {
        if (Vue._isap_theme_installed) return;
        Vue._isap_theme_installed = true;

        Vue.mixin({
            subscriptions: () => {
                return {
                    $theme: sjTheme
                }
            }
        });
    }
}
