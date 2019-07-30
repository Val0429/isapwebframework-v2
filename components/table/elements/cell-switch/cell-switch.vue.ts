/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop } from "vue-property-decorator";
import { Switch as cSwitch } from '@coreui/vue';

@Component({
    components: { cSwitch }
})
export class CellSwitch extends Vue {
    @Prop({
        required: true
    })
    value!: any;
}
export default CellSwitch;
