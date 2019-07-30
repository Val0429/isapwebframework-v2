/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export class CellDate extends Vue {
    @Prop({
        required: true
    })
    value!: any;
}
export default CellDate;
Vue.component('cell-date', CellDate);
