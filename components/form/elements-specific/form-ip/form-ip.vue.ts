/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";

const ipfilter = {
    bind: (el: any, a, element) => {
        el = el.getElementsByTagName('input')[0];
        let oldvalue = el.value;
        el.addEventListener('input', (evt) => {
            let newvalue = el.value;
            let regex = /^(([1-9][0-9]{0,2}|0)(\.(([1-9][0-9]{0,2}|0)?)?){0,3}?)?$/;
            main: do {
                if (!regex.test(newvalue)) break;
                let arytmp = newvalue.split(".");
                for (let part of arytmp) {
                    if (part.length === 0) continue;
                    let num = +part;
                    if (num < 0 || num > 255) break main;
                }

                oldvalue = newvalue;
                return;
            } while(0);
            let { selectionStart, selectionEnd } = el;
            el.value = oldvalue;
            element.context.$emit('input', el.value);   /// emit new value
            el.selectionStart = selectionStart-1;
            el.selectionEnd = selectionEnd-1;
        });
    }
};

@Component({
    directives: { ipfilter }
})
export class FormIp extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label!: string;

    @Model("input", {
        type: String,
        required: false
    })
    value!: string;

    @Prop({ type: String, required: false })
    placeholder!: string;

    @Prop({ type: String, required: false })
    invalid!: string;

    public validation(value: string): boolean {
        const regex = /^([1-9][0-9]{0,2}|0)(\.([1-9][0-9]{0,2}|0)){3}$/;
        if (!regex.test(value)) return false;
        let arytmp = value.split(".");
        for (let part of arytmp) {
            let num = +part;
            if (num < 0 || num > 255) return false;
        }
        return true;
    }
    public invalidMessage(): string {
        return this._("mb_ValidationIp");
    }
}
export default FormIp;