/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Watch, Mixins } from "vue-property-decorator";

@Component
export class FormMergeBindings extends Vue {
    @Prop({
        type: Object,
        required: false
    })
    attrs!: any;

    @Prop({
        type: Object,
        required: false
    })
    listeners!: Object;

    private render(createElement) {
        let childs = this.$slots.default.map( (vnode) => {
            let children = vnode.children || vnode.text;
            let co: any = vnode.componentOptions || {};
            let attrs = { ...this.attrs, ...vnode.data.attrs, ...co.propsData };
            let _class = attrs.class;
            delete attrs.class;
            return createElement(co.tag,
                { ...vnode.data,
                    attrs,
                    class: _class,
                    on: { ...this.listeners, ...vnode.data.on, ...co.listeners },
                    slots: { ...this.$slots, default: undefined },
                    scopedSlots: this.$scopedSlots
                },
                children);
        });
        return createElement('fragment', childs);

        // let vnode = this.$slots.default[0];
        // let children = vnode.children || vnode.text;
        // let co: any = vnode.componentOptions || {};
        // let attrs = { ...this.attrs, ...vnode.data.attrs, ...co.propsData };
        // let _class = attrs.class;
        // delete attrs.class;
        // return createElement(co.tag,
        //     { ...vnode.data,
        //         attrs,
        //         class: _class,
        //         on: { ...this.listeners, ...vnode.data.on, ...co.listeners } },
        //     children);
    }
}
export default FormMergeBindings;