import { Vue, Component, Prop, Model } from "vue-property-decorator";

const ipfilter = {
    bind: (el: any, a, b) => {
        el = el.getElementsByTagName('input')[0];
        let oldvalue = el.value;
        el.addEventListener('input', (evt) => {
            let newvalue = el.value;
            let regex = /^([1-9][0-9]{0,2}(\.(([1-9][0-9]{0,2}|0)(\.(([1-9][0-9]{0,2}|0)(\.([1-9]([0-9]{1,2})?)?)?)?)?)?)?)?$/;
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
}
export default FormIp;