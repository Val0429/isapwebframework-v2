/*
 * Created on Tue Nov 19 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";
import { Sketch } from 'vue-color';

@Component({
    components: { 'sketch-picker': Sketch }
})
export class FontColor extends Vue {
    @Model('input', {
        type: [String, Object],
        required: false,
        default: FontColor.defaultValue
    })
    value: any;

    private static defaultValue = "#000";
    private innateValue: any = FontColor.defaultValue;
    @Watch('value')
    onValueChanged(newval: any) {
        if (!newval) return this.innateValue = FontColor.defaultValue;
        this.innateValue = newval;
    }

    private show: boolean = false;

    @Emit('input')
    private outputColor(color) {
        let hex = color.hex8;
        this.innateValue = hex;
        return hex;
    }
}
export default FontColor;