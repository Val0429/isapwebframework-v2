import { Vue, Component, Prop, Model, Watch, Emit } from "vue-property-decorator";
import { BehaviorSubject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ICard } from 'components/cards/card/card.vue';
import { Form } from '../../form';
import { StepProgress } from '../../step-progress';
import { Tab } from '../../tab';
import { Observe } from './../../../core/utilities';


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
        let node = (this.$refs.node as any);
        if (!node) return;  /// possible to happen before created
        (this.$observables.thisForm as any).next( node.findElement(Form) );
        (this.$observables.thisStep as any).next( node.findElement(StepProgress) );
        let tab = node.findElement(Tab);
        if (tab) {
            (this.$observables.thisTab as any).next( node.findElement(Tab) );
            tab.innateCard = true;
        }
    }

    @Observe({
        value: () => new BehaviorSubject<Vue>(null)
    })
    thisForm: BehaviorSubject<Vue>;

    @Observe({
        value: () => new BehaviorSubject<Vue>(null)
    })
    thisStep: BehaviorSubject<Vue>;

    @Observe({
        value: () => new BehaviorSubject<Vue>(null)
    })
    thisTab: BehaviorSubject<Vue>;

    private excludeKeys(obj: any, ...keys: string[]) {
        return Object.keys(obj).filter( (key) => {
            return keys.indexOf(key) < 0;
        });
    }
    //////////////////////////////////////////////////
}
export default AutoCard;