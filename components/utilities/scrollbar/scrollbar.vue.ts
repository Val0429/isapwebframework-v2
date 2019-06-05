import { Vue, Component, Prop, Model, Emit, Watch, Inject } from "vue-property-decorator";
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

@Component({
    components: { VuePerfectScrollbar }
})
export class Scrollbar extends Vue {
    private psSettings() {
        // ToDo: find better rtl fix
        return {
            maxScrollbarLength: 200,
            minScrollbarLength: 40,
            suppressScrollX: getComputedStyle(document.querySelector('html')).direction !== 'rtl',
            wheelPropagation: false,
            interceptRailY: styles => ({ ...styles, height: 0 })
        }
    }
}
export default Scrollbar;