/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";

export interface ICard {
    "border-variant"?: string;
    "header-bg-variant"?: string;
    "footer-bg-variant"?: string;
    "hide-collapse-button"?: boolean;
}

@Component
export class Card extends Vue {
    @Prop({ type: Boolean, default: true })
    visible: boolean;

    @Prop({ type: String })
    label: string;

    @Prop({ type: Object as () => ICard, required: false, default: () => ({}) })
    data!: ICard;

    /// public method
    public open() {
        this.doUpdateVisible(true);
        this.innateVisible = true;
    }
    public close() {
        this.doUpdateVisible(false);
        this.innateVisible = false;
    }

    /// private props
    @Prop({ type: Boolean, default: false, required: false })
    noBodyPadding: boolean;

    /// private helpers
    private innateVisible: boolean = true;
    @Watch("visible", { immediate: true })
    private onVisibleChanged(newval: boolean, oldval: boolean) {
        this.innateVisible = newval;
    }
    private showHideIcon: boolean;

    @Emit('update:visible')
    private doUpdateVisible(value: boolean) {
        return value;
    }
}
export default Card;