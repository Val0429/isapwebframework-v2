/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";

@Component
export default class Spacer extends Vue {
    @Prop({
        type: String,
        required: true,
    })
    height!: string;
}