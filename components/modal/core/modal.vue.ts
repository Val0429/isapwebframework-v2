/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Watch, Emit } from "vue-property-decorator";
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, first, pairwise } from 'rxjs/operators';
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

    @Prop({ type: Object as () => ICard, required: false,
        default: () => ({
            "border-variant": "iv-modal-border",
            "header-bg-variant": "iv-modal-header",
            // "footer-bg-variant": "light",
            "hide-collapse-button": true
        })
    })
    data!: ICard;

    @Emit('update:visible')
    doUpdateVisible(value: boolean) { return value; }

    public close() { this.doUpdateVisible(false) }
    
    private sjRefs: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    /// private helpers //////////////////////////////
    @Watch('visible', { immediate: true })
    private async onVisibleChanged(newval: boolean, oldval: boolean) {
        /// hook key event
        if (newval === true) Modal.modalPush(this);
        else if (newval === false) Modal.modalRemove(this);

        /// get the ref and set z-index
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

    /// collect the Modals, and deal with them together
    private static keydownHandler(e: KeyboardEvent) {
        /// only handle "Enter" for now
        if (e.key === "Enter") {
            let modals = Modal.modals;
            if (modals.length === 0) return;
            let modal: any = modals[modals.length - 1];
            /// apply to default modal for now
            if (!modal.thisForm && !modal.thisStep) {
                modal.close();
            }
        }
    }
    private static sjModals: BehaviorSubject<Modal[]> = new BehaviorSubject<Modal[]>([]);
    private static subsModals: Subscription = Modal.sjModals.pipe(pairwise()).subscribe((val) => {
        let prev = val[0], next = val[1];
        if (prev.length === 0 && next.length > 0) window.addEventListener("keydown", Modal.keydownHandler);
        else if (prev.length > 0 && next.length === 0) window.removeEventListener("keydown", Modal.keydownHandler);
    });
    private static get modals(): Modal[] { return Modal.sjModals.value; }
    private static modalPush(item: Modal) {
        let modals = [...Modal.modals];
        modals.push(item);
        Modal.sjModals.next(modals);
    }
    private static modalRemove(item: Modal) {
        let modals = [...Modal.modals];
        let idx = modals.indexOf(item);
        if (idx !== -1) {
            modals.splice(idx, 1);
            Modal.sjModals.next(modals);
        }
    }    
    //////////////////////////////////////////////////
}
export default Modal;