/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import { FormDatetimeType } from './../form-datetime';

@Component
export class FormDate extends Vue {
    @Prop({
        type: String,
        required: false,
    })
    label!: string;

    @Model('input', {
        type: [Date, String],
        required: false,
    })
    value!: Date | string;

    @Prop({
        type: String,
        required: false,
        default: FormDatetimeType.Date,
    })
    type!: FormDatetimeType;

    @Prop({ type: String, required: false })
    invalid!: string;

    newDate: Date | null = null;

    private inputDate(event: any) {
        this.newDate = event;
        this.$emit('input', event);
    }
}
export default FormDate;
