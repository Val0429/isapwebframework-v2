/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit, Watch, Inject } from "vue-property-decorator";
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

@Component({
    components: { VuePerfectScrollbar }
})
export class Scrollbar extends Vue {
    private get psSettings() {
        // ToDo: find better rtl fix
        return {
            maxScrollbarLength: 200,
            minScrollbarLength: 40,
            wheelPropagation: false,
            interceptRailY: styles => ({ ...styles, height: 0 })
        }
    }
}
export default Scrollbar;