/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";

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
}
export default FormNumber;