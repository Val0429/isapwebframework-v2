/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";


@Component
export class FormHeader extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label!: string;
}
export default FormHeader;
