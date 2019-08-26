/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit, Watch, Inject, Observe } from "@/../core";
import { Form } from '@/../components/form';
import { StepProgress } from '@/../components/step-progress';
import { BehaviorSubject } from 'rxjs';


@Component
export class Tab extends Vue {
    /// public ///////////////////////////////////////////////////////////////////////////
    /// direct props ////////////////////////////
    @Prop({
        type: Number,
        required: false,
        default: 0
    })
    active: number;
    //////////////////////////////////////////////////////////////////////////////////////

    /// private //////////////////////////////////////////////////////////////////////////
    /// private props
    @Prop({
        type: Boolean,
        required: false,
        default: false
    })
    card: boolean;
    private innateCard: boolean = false;
    @Watch('card')
    onCardChanged(value) {
        this.innateCard = value;
    }

    /// private helper
    private innateActive: number = 1;
    @Watch('active')
    private onActiveChanged(value) {
        this.innateActive = value;
    }
    @Watch('innateActive')
    private onInnateActiveChanged(value) {
        /// check $refs.node
        let node = (this.$refs.node[value-1] as any);
        if (!node) return;  /// possible to happen before created
        (this.$observables.thisForm as any).next( node.findElement(Form) );
        (this.$observables.thisStep as any).next( node.findElement(StepProgress) );
    }

    @Observe({
        value: () => new BehaviorSubject<Vue>(null)
    })
    thisForm: BehaviorSubject<Vue>;

    @Observe({
        value: () => new BehaviorSubject<Vue>(null)
    })
    thisStep: BehaviorSubject<Vue>;

    public get steps(): number {
        let steps = 0;
        for (let i=1; ;++i) {
            if (! (this.$slots[i+""] || this.$scopedSlots[i+""]) ) break;
            ++steps;
        }
        return steps;
    }

    private getTitle(step: number): string {
        let node = this.$slots[`${step}-title`];
        if (!node) return step+"";
        return node[0].text;
    }

    public isMounted: boolean;
    private doMounted() {
        this.innateActive = this.active;
        this.innateCard = this.card;
        this.isMounted = true;
    }
    //////////////////////////////////////////////////////////////////////////////////////
}
export default Tab;
