import { Vue } from 'vue-property-decorator';

export const LifeCyclesPlugin = {
    install: function(Vue: any) {
        if (Vue._isap_life_cycles_installed) return;
        Vue._isap_life_cycles_installed = true;

        Vue.mixin({
            mounted() {
                this.$emit('mounted', true);
            }
        })
    }
}
