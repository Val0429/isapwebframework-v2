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

        const getChilds = (source, slots?, scopedSlots?) => {
            let childs = source.map( (vnode) => {
                let children = vnode.children || vnode.text;
                let co: any = vnode.componentOptions || {};
                let attrs = { ...this.attrs, ...vnode.data.attrs, ...co.propsData };
                let _class = attrs.class;
                delete attrs.class;
                if (co.tag === 'iv-permission') {
                    /// allow iv-permission to work!
                    return createElement(co.tag,
                        { ...vnode.data,
                            attrs,
                            class: _class,
                            on: { ...this.listeners, ...vnode.data.on, ...co.listeners },
                            slots: { ...slots, default: undefined },
                            scopedSlots: { ...scopedSlots, default: undefined },
                        }, getChilds(vnode.componentOptions.children, slots, scopedSlots));
                } else {
                    return createElement(co.tag,
                        { ...vnode.data,
                            attrs,
                            class: _class,
                            on: { ...this.listeners, ...vnode.data.on, ...co.listeners },
                            slots: { ...slots, default: undefined },
                            scopedSlots: scopedSlots
                        },
                        children);
                }
            });
            return childs;
        }
        return createElement('fragment', getChilds(this.$slots.default, this.$slots, this.$scopedSlots));

        // let childs = this.$slots.default.map( (vnode) => {
        //     let children = vnode.children || vnode.text;
        //     let co: any = vnode.componentOptions || {};
        //     let attrs = { ...this.attrs, ...vnode.data.attrs, ...co.propsData };
        //     let _class = attrs.class;
        //     delete attrs.class;
        //     // return createElement(co.tag,
        //     //     { ...vnode.data,
        //     //         attrs,
        //     //         class: _class,
        //     //         on: { ...this.listeners, ...vnode.data.on, ...co.listeners },
        //     //         slots: { ...this.$slots, default: undefined },
        //     //         scopedSlots: this.$scopedSlots
        //     //     },
        //     //     children);
        //     // console.log('!!!', co.tag, this.$slots, children);
        //     if (co.tag !== 'iv-permission') {
        //         return createElement(co.tag,
        //             { ...vnode.data,
        //                 attrs,
        //                 class: _class,
        //                 on: { ...this.listeners, ...vnode.data.on, ...co.listeners },
        //                 slots: { ...this.$slots, default: undefined },
        //                 scopedSlots: this.$scopedSlots
        //             },
        //             children);
        //     } else {
        //         console.log('...', this.$scopedSlots, childs, '3', vnode);
        //         return createElement(co.tag,
        //             { ...vnode.data,
        //                 attrs,
        //                 class: _class,
        //                 on: { ...this.listeners, ...vnode.data.on, ...co.listeners },
        //             });
        //             //}, createElement("iv"));
        //     }
        // });
        // return createElement('fragment', childs);

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