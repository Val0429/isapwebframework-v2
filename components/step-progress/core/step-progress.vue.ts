import { Vue, Component, Prop, Model, Emit, Watch, Inject } from "@/../core";
import SCircle from "./../helpers/circle.vue";
import { Form } from './../../form';

enum AnimationDirection {
    RTL, LTR
}

@Component({
    components: { SCircle }
})
export class StepProgress extends Vue {
    /// public ///////////////////////////////////////////////////////////////////////////
    /// direct props ////////////////////////////
    @Emit('submit')
    doSubmit() {
        let result = {};
        for (let i=1; i<=this.steps; i++) {
            result[i] = this.findForm(i).getResult();
        }
        return result;
    }

    /// usable props ////////////////////////////
    public prevBindings(step: number) {
        return {
            $attrs: {
                variant: 'secondary',
                label: step === 1 ? null : this._('wb_PreviousStep')
            },
            $listeners: {
                click: () => {
                    if (step !== 1) this.decreaseCurrentStep();
                    this.done = false;
                }
            }
        }
    }
    public nextBindings(step: number) {
        let form = this.findForm(step);
        let binding = form ? form.submitBindings :
            /// preset bindings without `Form`
            { $attrs: {}, $listeners: { click: () => {if (step!==this.steps) this.increaseCurrentStep()} } };

        return {
            $attrs: {
                ...binding.$attrs,
                ...(step === this.steps ? {variant: 'primary' /*success*/}: {}),
                label: this._(step===this.steps ? 'wb_Done' : 'wb_NextStep')
            },
            $listeners: {
                ...binding.$listeners,
                click: () => {
                    binding.$listeners.click();
                    if (step === this.steps) this.doSubmit();
                }
            }
        }
    }

    private findForm(step: number) {
        let ref = this.$refs[step+''];
        if (!ref) return undefined;
        return ref[0].findElement(Form);
    }
    //////////////////////////////////////////////////////////////////////////////////////

    /// private //////////////////////////////////////////////////////////////////////////
    /// private helper
    private isMounted: boolean = false;
    private mounted() {
        this.isMounted = true;

        for (let i=1; i<=this.steps; ++i) {
            let form = this.findForm(i);
            if (!form) continue;
            form.$on('submit', (data) => {
                if (i!==this.steps) this.increaseCurrentStep();
                else this.done = true;
            });
        }
    }

    private hasTitle(): boolean {
        for (let key in { ...this.$slots, ...this.$scopedSlots }) {
            if (/\-title$/.test(key)) return true;
        }
        return false;
    }

    public currentStep: number = 1;
    private increaseCurrentStep() {
        this.animeDirection = AnimationDirection.LTR;
        ++this.currentStep;
    }
    private decreaseCurrentStep() {
        this.animeDirection = AnimationDirection.RTL;
        --this.currentStep;
    }
    private done: boolean = false;
    public get steps(): number {
        let steps = 0;
        for (let i=1; ;++i) {
            if (! (this.$slots[i+""] || this.$scopedSlots[i+""]) ) break;
            ++steps;
        }
        return steps;
    }

    private stepAttrs(step: number) {
        return {
            variant: step <= this.currentStep ? 'success' : 'light'
        }
    }

    /// handle animation
    private beforeEnter() {
        let el = arguments[0];
        el.children[0].style.width = 'inherit';
    }
    private beforeLeave() {
        let el = arguments[0];
        el.children[0].style.width = `${el.offsetWidth}px`;
    }
    private animeDirection: AnimationDirection = AnimationDirection.LTR;
    private get animeName() {
        return this.animeDirection === AnimationDirection.LTR ? "slide-first" : "slide-second";
    }
    //////////////////////////////////////////////////////////////////////////////////////
}
export default StepProgress;
