/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";

const licensefilter = {
    bind: (el: any, a, b) => {
        el = el.getElementsByTagName('input')[0];
        let oldvalue = el.value;
        el.addEventListener('input', (evt) => {
            let newvalue = el.value;
            let regex = /^([a-z0-9]{1,5}((\-([a-z0-9]{1,5})?){1,4})?)?$/i;
            let regex6 = /([a-z0-9]{5})([a-z0-9])/i;
            let regexb = /([a-z0-9]{5})(-)/i;
            do {
                if (!regex.test(newvalue)) {
                    if (regex6.test(newvalue)) {
                        newvalue = newvalue.replace(regex6, (a,b,c) => `${b}-${c}`);
                        continue;
                    }
                    break;
                }
                newvalue = newvalue.toUpperCase();
                el.value = oldvalue = newvalue;
                /// emit value
                b.parent.componentInstance.$emit("input", el.value);
                return;

            } while(1);

            let { selectionStart, selectionEnd } = el;
            el.value = oldvalue;
            el.selectionStart = selectionStart-1;
            el.selectionEnd = selectionEnd-1;
            /// emit value
            b.parent.componentInstance.$emit("input", el.value);
        });
    }
};

@Component({
    directives: { licensefilter }
})
export class FormLicense extends Vue {
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
        const regex = /^(?:[a-z0-9]{5}\-){4}[a-z0-9]{5}$/i;
        if (!regex.test(value)) return false;
        return true;
    }
    public invalidMessage(): string {
        return this._("mb_ValidationLicense");
    }    
}
export default FormLicense;