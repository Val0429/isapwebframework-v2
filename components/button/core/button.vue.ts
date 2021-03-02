/*
 * Created on Tue Oct 5 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { generateIcon } from "@/../core/utilities";

@Component
export class Button extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label: string;

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

    @Emit('click')
    private doClick(e) { return e; }

    /// private helper
    private get classIcon() {
        return `${generateIcon(this.icon)} icon-${this.size}`;
    }
    private get classWithIcon() {
        if (!this.icon) return "";
        return `with-icon-${this.size}`;
    }
}
export default Button;