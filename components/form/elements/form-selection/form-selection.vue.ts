import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import $ from 'jquery';

interface FormSelectionOption {
    id: string | number;
    text: string;
}

@Component
export class FormSelection extends Vue {
    @Prop({ type: String, required: false })
    label!: string;

    @Prop({ type: Array, required: false })
    options!: FormSelectionOption[];

    @Prop({ type: Boolean, required: false, default: false })
    multiple!: boolean;

    @Prop({ type: String, required: false })
    invalid!: string;

    @Prop({ type: String, required: false })
    placeholder!: string;

    @Model('input', { type: [String, Array], required: false })
    value!: string | string[];

    /// options watcher
    @Watch('options', {immediate: true})
    private async onOptionsChanged(data: FormSelectionOption[]) {
        let me = $(`#${this.id}`) as any;
        setTimeout( () => {
            me.select2().off('change', this.doOnChange);
            me.select2("destroy");
            this.doMount(data);
        }, 0);
    }

    /// private helpers
    private created() {
        this.doMount = this.doMount.bind(this);
    }
    private doMount(data?: FormSelectionOption[]) {
        let me = $(`#${this.id}`) as any;
        me.select2({
            theme: "bootstrap",
            placeholder: this.placeholder || this._("mb_PleaseSelect")
        })
        .on('change', this.doOnChange);
    }
    private doOnChange() {
        let me = $(`#${this.id}`) as any;
        /// handle jquery overwritten event seperately
        this.$emit('input', me.val());
    }
    private mounted() {
        this.doMount();
    }

    private get id(): string { return `input-${(this as any)._uid}` }
}
export default FormSelection;