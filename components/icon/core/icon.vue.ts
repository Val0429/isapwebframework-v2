/*
 * Created on Tue Oct 5 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { generateIcon } from "@/../core/utilities";

@Component
export default class Icon extends Vue {
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

    @Prop({ type: String, required: false })
    icon: string;

    /// private helper
    private get classIcon() {
        return `d-inline-block ${generateIcon(this.icon)} icon-${this.size} ${this.variant}`;
    }
}
