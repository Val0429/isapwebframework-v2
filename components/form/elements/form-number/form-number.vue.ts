/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";

export interface IFormNumberRange {
    min: number;
    max: number;
}

@Component
export class FormNumber extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label!: string;

    @Model("input", {
        required: false
    })
    value!: number;

    @Prop({ type: String, required: false })
    placeholder!: string;

    @Prop({
        type: String,
        required: false,
        default: "number"
    })
    type!: string;

    @Prop({ type: String, required: false })
    invalid!: string;

    @Prop({ type: Number, required: false })
    min!: number;

    @Prop({ type: Number, required: false })
    max!: number;

    /// private helper
    private getValue(): string {
        let value = this.value;
        do {
            if (value == undefined) return undefined;
            if (typeof value === 'number') return String(value);
            if (typeof value === 'string') {
                if (/^[0-9]+(\.[0-9]+)?$/.test(value)) return value;
            }
            return '';
        } while(0);
    }
}
export default FormNumber;