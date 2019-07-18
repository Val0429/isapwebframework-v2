import { Vue, Component, Prop, Model, Watch, Inject } from "vue-property-decorator";
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
    @Watch('options', {immediate: false})
    private async onOptionsChanged(data: FormSelectionOption[], old: FormSelectionOption[]) {
        let me = $(`#${this.id}`) as any;
        /// make sure the two object is really changed
        if (JSON.stringify(old) === JSON.stringify(data)) return;
        setTimeout( () => {
            me.select2().off('change', this.doOnChange);
            me.select2("destroy");
            this.doMount(data);
        }, 0);
    }

    /// private helpers
    @Inject({ default: null }) modalParent: any;

    private created() {
        this.doMount = this.doMount.bind(this);
    }
    private doMount(data?: FormSelectionOption[]) {
        let me = $(`#${this.id}`) as any;
        me.select2({
            theme: "bootstrap",
            placeholder: this.placeholder || this._("mb_PleaseSelect"),
            allowClear: this.multiple ? false : true,
            dropdownParent: !this.modalParent ? null : $(this.modalParent.$el)
        })
        .on('change', this.doOnChange)
        /// prevent dialog open when clear
        .on('select2:unselecting', () => me.data('unselecting', true))
        .on('select2:opening', (e) => { if (me.data('unselecting')) { me.removeData('unselecting'); e.preventDefault(); } });
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