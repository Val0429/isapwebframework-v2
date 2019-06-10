import { Vue, Component, Prop, Model, Watch, Emit } from "vue-property-decorator";
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { BehaviorSubject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ICard } from 'components/cards/card/card.vue';
import { Form } from './../../form';
import { StepProgress } from './../../step-progress';

@Component({
    components: { VuePerfectScrollbar },
    provide() {
        return { modalParent: this }
    }    
})
export class Modal extends Vue {
    @Prop({ type: String })
    label: string;

    @Prop({ type: Boolean, required: false })
    visible: boolean;

    @Prop({ type: Object as () => ICard, required: false, default: () => ({
        "border-variant": "light",
        "header-bg-variant": "light",
        "footer-bg-variant": "light",
        "hide-collapse-button": true
    }) })
    data!: ICard;

    @Emit('update:visible')
    doUpdateVisible(value: boolean) { return value; }
    
    private sjRefs: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    /// private helpers //////////////////////////////
    @Watch('visible', { immediate: true })
    private async onVisibleChanged(newval: boolean, oldval: boolean) {
        if (!newval) return;

        let refs = await this.sjRefs.pipe( filter(v=>v) ).pipe( first() ).toPromise();
        let max = this.findHighestZIndex("*");
        refs.mask.style.zIndex = max > 10000 ? max+1 : max+10000;
    }

    private isMounted: boolean = false;
    private doMounted() {
        this.sjRefs.next( this.$refs );
        this.isMounted = true;
    }

    private get thisForm() {
        if (!this.$refs.node) return;
        return (this.$refs.node as any).findElement(Form);
    }
    private get thisStep() {
        if (!this.$refs.node) return;
        return (this.$refs.node as any).findElement(StepProgress);
    }

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

    private findHighestZIndex(elem) {
        var elems = document.getElementsByTagName(elem);
        var highest = 0;
        for (var i = 0; i < elems.length; i++)
        {
            var zindex = document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
            if (zindex != 'auto' && +zindex > highest) {
                highest = +zindex;
            }
        }
        return highest;
    }
    //////////////////////////////////////////////////
}
export default Modal;