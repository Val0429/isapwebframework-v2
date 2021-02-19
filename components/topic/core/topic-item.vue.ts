/*
 * Created on Tue Feb 19 2021
 * Author: Val Liu
 * Copyright (c) 2021, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";
import { generateIcon } from "@/../core/utilities";

@Component
export class TopicItem extends Vue {
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

    @Prop({ type: String, required: false })
    icon: string;

    @Prop({
        type: String,
        required: false
    })
    url: string;

    /// private helper
    private get classIcon() {
        return `${generateIcon(this.icon)} icon`;
    }
    private get classBorder() {
        return `border-item col btn-${this.variant}`;
    }
}
export default TopicItem;