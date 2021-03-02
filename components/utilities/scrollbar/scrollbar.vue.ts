/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit, Watch, Inject } from "vue-property-decorator";
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { elementResizeEvents } from './helpers/element-resize-event';

@Component({
    components: { VuePerfectScrollbar }
})
export class Scrollbar extends Vue {
    public top() {
        let scrollbar: any = this.$refs["scrollbar"];
        scrollbar.$el.scrollTop = 0;
        scrollbar.update();
    }

    private get psSettings() {
        // ToDo: find better rtl fix
        return {
            maxScrollbarLength: 200,
            minScrollbarLength: 40,
            wheelPropagation: false,
            interceptRailY: styles => ({ ...styles, height: 0 })
        }
    }

    private mounted() {
        let container: any = this.$refs['container'];
        let scrollbar: any = this.$refs["scrollbar"];
        let refnum = null;

        elementResizeEvents(container, async () => {
            let scrollMinHeight, scrollHeight, containerHeight;
            let count = 0;
            /// Val: update once for enlarge case.
            scrollbar.update();
            while (
                scrollMinHeight = scrollbar.$el.clientHeight,
                scrollHeight = scrollbar.$el.scrollHeight,
                containerHeight = container.clientHeight,
                
                !(scrollHeight === containerHeight ||
                (scrollHeight >= containerHeight && scrollMinHeight === scrollHeight))
            ) {
                scrollbar.update();
                await new Promise((resolve) => setTimeout(resolve, 100));
                if (++count > 50) {
                    console.warn("<iv-scrollbar> warning: updating too frequently. please call Val to fix this issue.", scrollbar.$el, container, scrollHeight, containerHeight, "count:", count);
                    break;
                }
            }
        });
    }
}
export default Scrollbar;