import { Vue, Component, Prop, Model, Emit, Watch, Inject } from "vue-property-decorator";

enum AnimationDirection {
    RTL, LTR
}

@Component
export class AutoTransition extends Vue {
    /// public ///////////////////////////////////////////////////////////////////////////
    /// direct props ////////////////////////////
    @Prop({
        type: Number,
        default: 0
    })
    step: number;

    @Prop({
        type: String,
        default: "iv-direction-slide"
    })
    type: string;
    //////////////////////////////////////////////////////////////////////////////////////

    /// private //////////////////////////////////////////////////////////////////////////
    /// private helper
    @Watch('step')
    private onStepChanged(newValue: number, oldValue: number) {
        this.animeDirection = newValue >= oldValue ? AnimationDirection.LTR : AnimationDirection.RTL;
    }

    /// handle animation
    private beforeEnter() {
        let el = arguments[0];
        el.style.width = 'inherit';
    }
    private beforeLeave() {
        let el = arguments[0];
        el.style.width = `${el.offsetWidth}px`;
    }
    private animeDirection: AnimationDirection = AnimationDirection.LTR;
    private get animeName() {
        return this.animeDirection === AnimationDirection.LTR ? "auto-slide-first" : "auto-slide-second";
    }
    //////////////////////////////////////////////////////////////////////////////////////
}
export default AutoTransition;
