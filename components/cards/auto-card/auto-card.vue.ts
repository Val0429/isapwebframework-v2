import { Vue, Component, Prop, Model, Watch, Emit } from "vue-property-decorator";
import { BehaviorSubject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ICard } from 'components/cards/card/card.vue';
import { Form } from '../../form';
import { StepProgress } from '../../step-progress';


@Component
export class AutoCard extends Vue {
    @Prop({ type: String })
    label: string;

    @Prop({ type: Boolean, required: false })
    visible: boolean;

    @Prop({ type: Object as () => ICard, required: false })
    data!: ICard;

    /// private helpers //////////////////////////////
    private isMounted: boolean = false;
    private doMounted() {
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
    private excludeKeys(obj: any, ...keys: string[]) {
        return Object.keys(obj).filter( (key) => {
            return keys.indexOf(key) < 0;
        });
    }
    //////////////////////////////////////////////////
}
export default AutoCard;