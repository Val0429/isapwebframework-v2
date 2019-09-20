/*
 * Created on Tue Sep 19 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";
import { FindRouter } from '@/../core/router';

@Component
export class ToolboxCustom extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label: string;

    @Prop({
        type: String,
        required: true
    })
    icon: string;

    @Prop({
        type: String,
        required: false,
        default: 'light'
    })
    variant!: string;

    @Prop({
        type: String,
        required: false,
        default: 'sm'
    })
    size!: string;

    @Prop({
        type: Boolean,
        required: false,
        default: false
    })
    disabled!: boolean;

    @Prop({
        type: Boolean,
        required: false,
        default: true
    })
    visible!: boolean;

    @Emit()
    click(event) { return; }

    /// private helper
    private get classIcon() {
        let classes = ['fa', 'isap-toolbox-icon'];
        let icon = this.icon;
        if (/^isap/.test(icon)) ['isap-icon'].forEach( v => classes.push(v) );
        classes.push(icon);
        return classes;
    }
}
export default ToolboxCustom;