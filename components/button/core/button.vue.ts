/*
 * Created on Tue Oct 5 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Emit } from "vue-property-decorator";

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

    @Emit()
    private click(e) { return e; }

    @Emit()
    private dblclick(e) { return e; }

    /// private helper
    private get classWithIcon() {
        let classes = [];
        do {
            if (!this.icon) break;
            classes.push( `with-icon-${this.size}` );
            if (this.$slots.default || this.label) {
                classes.push("has-content");
            }
        } while(0);
        return classes.join(" ");
    }
}
export default Button;