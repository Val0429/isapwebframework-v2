/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export class CellString extends Vue {
    @Prop({
        required: true
    })
    value!: any;
}
export default CellString;
