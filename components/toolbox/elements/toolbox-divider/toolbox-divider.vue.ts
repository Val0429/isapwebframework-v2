/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit } from "vue-property-decorator";

@Component
export class ToolboxDivider extends Vue {
    @Prop({
        type: Boolean,
        required: false,
        default: true
    })
    visible!: boolean;
}
export default ToolboxDivider;
