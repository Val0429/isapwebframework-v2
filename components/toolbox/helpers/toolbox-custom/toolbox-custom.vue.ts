/*
 * Created on Tue Sep 19 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";
import { FindRouter } from '@/../core/router';
import { generateIcon } from '@/../core/utilities';

@Component
export class ToolboxCustom extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label: string;

    @Prop({
        type: String,
        required: false
    })
    icon: string;

    @Prop({
        type: String,
        required: false,
    })
    variant!: string;

    @Prop({
        type: String,
        required: false,
        default: 'md'
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
        required: false
    })
    active: boolean;

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
        if (!this.icon) return;
        return generateIcon(this.icon);
    }
}
export default ToolboxCustom;