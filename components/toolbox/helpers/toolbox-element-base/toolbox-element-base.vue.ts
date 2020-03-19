/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit, Watch } from 'vue-property-decorator';
import $ from 'jquery';

@Component
export class ToolboxElementBase extends Vue {
    @Prop({
        type: String,
        required: false,
    })
    title!: string;

    @Prop({
        type: String,
        required: false,
    })
    icon!: string;

    @Prop({
        type: String,
        required: false,
        default: 'iv-toolbox',
    })
    variant!: string;

    @Prop({
        type: String,
        required: false,
        default: 'md',
    })
    size!: string;

    @Prop({
        type: Boolean,
        required: false,
        default: false,
    })
    disabled!: boolean;

    @Prop({
        type: Boolean,
        required: false,
    })
    active: boolean;

    @Prop({
        type: Boolean,
        required: false,
        default: true,
    })
    visible!: boolean;

    @Emit()
    click(event) {
        event.stopPropagation();
        return;
    }

    constructor() {
        super();
        this.doHide = this.doHide.bind(this);
    }
    private classIcon(icon: string) {
        return `${icon} btn-${this.size}`;
    }
    private mounted() {
        $('body').on('click', this.doHide);
    }
    private destroy() {
        $('body').off('click', this.doHide);
    }
    private doHide() {
        this.show = false;
    }
    private show: boolean = false;
}
export default ToolboxElementBase;
