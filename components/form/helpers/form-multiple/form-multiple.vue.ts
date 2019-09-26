/*
 * Created on Tue Aug 19 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";
import lang from '@/../core/i18n';
import { MetaParser, IMetaResult } from "@/../core/server/parser/meta-parser";
import draggable from 'vuedraggable';

@Component({
    components: { draggable }
})
export class FormMultiple extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label!: string;

    @Prop({ type: String, required: false })
    placeholder!: string;

    @Prop({ type: String, required: false })
    invalid!: string;

    @Model('input', {
        type: Array,
        required: false,
        default: () => []
    })
    value!: any[];

    @Prop({ required: true })
    elementType: MetaParser | string;

    /// private helper
    private addInitial() {
        this.value.push(undefined);
    }
    private addOne(index: number) {
        this.value.splice(index+1, 0, undefined);
    }
    private removeOne(index: number) {
        this.value.splice(index, 1);
    }
    private updateValue(index: number, val) {
        let tmp = [
            ...this.value.slice(0, index),
            val,
            ...this.value.slice(index+1, this.value.length)
        ];
        this.$emit("input", tmp);
    }

    /// translation
    private static subscription;
    created() {
        /// do only once
        if (FormMultiple.subscription) return;
        FormMultiple.subscription = lang.getObservable()
            .subscribe( (value) => {
                document.documentElement.style
                    .setProperty('--form-multiple-text', `"${lang.translate("mb_FormMultipleClickToAdd")}"`);
            });
    }
}
export default FormMultiple;