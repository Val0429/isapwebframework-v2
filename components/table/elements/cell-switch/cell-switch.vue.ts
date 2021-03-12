/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";

export interface ISwitchData {
    "label-on"?: string;
    "label-off"?: string;
}

@Component
export default class CellSwitch extends Vue {
    @Model('input', {
        type: Boolean,
        required: false
    })
    value: string;

    @Prop({
        type: String,
        required: false,
        default: 'primary'
    })
    variant: string;

    @Prop({
        type: String,
        required: false,
        default: 'md'
    })
    size: string;

    @Prop({ type: Object as () => ISwitchData, required: false, default: () => ({}) })
    data!: ISwitchData;

    private get classList() {
        return [
            "switch",
            this.data['label-on'] || this.data['label-off'] ? "switch-label" : "",
            this.size ? `switch-${this.size}` : "",
            this.variant ? `switch-${this.variant}` : "",
            "switch-3d",
            "form-check-label"
        ];
    }
}
