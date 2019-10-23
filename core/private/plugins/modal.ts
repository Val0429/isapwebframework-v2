/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue } from 'vue-property-decorator';

declare module "vue/types/vue" {
    export interface Vue {
        $modal(): void;
    }
}

export const ModalPlugin = {
    install: function(Vue: any) {
        if (Vue._isap_modal_installed) return;
        Vue._isap_modal_installed = true;

        Vue.mixin({
            methods: {
                $modal: function(this: Vue): void {
                    let component = this.$mount();
                    //let body = document.getElementsByTagName("body")[0];
                    let body = document.getElementById("app") || document.getElementsByTagName("body")[0];
                    body.appendChild(component.$el);
                    component.$set(component.$props, "visible", true);
                    component.$on('update:visible', (newvalue, oldvalue) => {
                        if (!newvalue && component) {
                            setTimeout( () => {
                                component.$el.parentNode && body.removeChild(component.$el);
                                component.$destroy();
                            }, 1000);
                        }
                    });
                }
            }
        })
    }
}
