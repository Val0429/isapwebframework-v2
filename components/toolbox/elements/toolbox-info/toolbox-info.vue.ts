/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";

@Component
export class ToolboxInfo extends Vue {
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
}
export default ToolboxInfo;