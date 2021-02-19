/*
 * Created on Tue Feb 19 2021
 * Author: Val Liu
 * Copyright (c) 2021, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";

@Component
export class Topic extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label: string;
}
export default Topic;