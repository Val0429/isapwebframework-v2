/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { first } from "rxjs/operators";
import { Vue, Component, Prop, Model, Emit, Watch, Inject } from "vue-property-decorator";

enum AnimationDirection {
    RTL, LTR
}

type AnimationMode = "single" | "group";

@Component
export class DirectionSlide extends Vue {
    /// public ///////////////////////////////////////////////////////////////////////////
    /// direct props ////////////////////////////
    @Prop({
        type: Number,
        default: 0
    })
    step: number;

    @Prop({
        type: String,
        required: false,
        default: "single"
    })
    type: AnimationMode;
    //////////////////////////////////////////////////////////////////////////////////////

    /// private //////////////////////////////////////////////////////////////////////////
    /// private helper
    @Watch('step')
    private onStepChanged(newValue: number, oldValue: number) {
        this.animeDirection = newValue >= oldValue ? AnimationDirection.LTR : AnimationDirection.RTL;
    }

    /// handle animation
    private beforeEnter(el) {
        el.style.width = 'inherit';
    }
    private beforeLeave(el) {
        el.style.width = `${el.offsetWidth}px`;
    }
    private animeDirection: AnimationDirection = AnimationDirection.LTR;
    private get animeName() {
        return this.animeDirection === AnimationDirection.LTR ? "direction-slide-first" : "direction-slide-second";
    }
    //////////////////////////////////////////////////////////////////////////////////////
}
export default DirectionSlide;
