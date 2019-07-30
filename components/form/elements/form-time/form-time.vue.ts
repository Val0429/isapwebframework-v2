/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";
import { FormDatetimeType } from './../form-datetime';

@Component
export class FormTime extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label!: string;

    @Model('input', {
        type: Date,
        required: false,
    })
    value!: Date;

    @Prop({
        type: String,
        required: false,
        default: FormDatetimeType.Time
    })
    type!: FormDatetimeType;

    @Prop({ type: String, required: false })
    invalid!: string;
}
export default FormTime;