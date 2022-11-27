/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Watch, Inject } from "vue-property-decorator";
import $ from 'jquery';
import lang from '@/../core/i18n';
import { Subscription } from "rxjs";

interface FormSelectionOption {
    id: string | number;
    text: string;
}

export interface IFormSelection {
    "always-array"?: boolean;
    "allow-clear"?: boolean;
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

    @Model('input', { type: [String, Number, Array], required: false })
    value!: string | string[] | number | number[];

    /// others
    @Prop({ type: Object as () => IFormSelection, required: false, default: () => ({}) })
    data!: IFormSelection;

    /// helper
    @Watch('value', { immediate: true })
    private onValueChanged(data) {
        /// if not multiple, make array also possible value
        if (!this.multiple && Array.isArray(data)) data = data[0];

        let me = $(`#${this.id}`) as any;
        me.val(data).trigger('change.select2');
    }

    /// options watcher
    @Watch('options', { immediate: false })
    private async onOptionsChanged(data: FormSelectionOption[], old: FormSelectionOption[]) {
        let me = $(`#${this.id}`) as any;
        /// make sure the two object is really changed
        if (JSON.stringify(old) === JSON.stringify(data)) return;
        setTimeout(() => {
            me.select2().off('change', this.doOnChange);
            me.select2("destroy");
            this.doMount(data);
        }, 0);
    }

    /// private helpers
    @Inject({ default: null }) modalParent: any;

    private subsLangChange: Subscription;
    private created() {
        this.doMount = this.doMount.bind(this);

        this.subsLangChange = lang.getObservable()
            .subscribe(() => {
                let me = $(`#${this.id}`) as any;
                /// make sure the two object is really changed
                setTimeout(() => {
                    me.select2().off('change', this.doOnChange);
                    me.select2("destroy");
                    this.doMount();
                }, 0);
            });
    }
    private headElement: HTMLHeadElement;
    private styleElement: HTMLStyleElement;
    private doUnmount() {
        this.headElement && this.headElement.removeChild(this.styleElement);
    }
    private doMount(data?: FormSelectionOption[]) {
        let me = $(`#${this.id}`) as any;

        let megroup = $(`#${this.groupid}`)[0];
        /// apply scale
        if (megroup && !this.styleElement) {
            let trans = window.getComputedStyle(megroup).transform;
            let matches = trans.match(/[0-9]+(\.[0-9]+)?/g);
            if (matches) {
                let match = matches.reduce((final, value) => {
                    let num = +value;
                    if (num > final) return num;
                    return final;
                }, 0);
                this.headElement = document.getElementsByTagName("head")[0];
                this.styleElement = document.createElement("style");
                this.headElement.appendChild(this.styleElement);
                (this.styleElement.sheet as any).insertRule(`.${this.popupclass} { transform: scale(1.3); }`);
            }
        }
        
        let element = me.select2({
            theme: "bootstrap",
            placeholder: this.placeholder || this._("mb_PleaseSelect"),
            allowClear: this.multiple ? false : !this.data["allow-clear"] ? false : true,
            dropdownParent: !this.modalParent ? null : $(this.modalParent.$el),
            language: {
                noResults: () => this._("mb_FormSelectionNoResult")
            }
        })
        .on('change', this.doOnChange)
        /// prevent dialog open when clear
        .on('select2:unselecting', () => me.data('unselecting', true))
        .on('select2:opening', (e) => { if (me.data('unselecting')) { me.removeData('unselecting'); e.preventDefault(); } });

        let elesel2 = element.data('select2');
        if (elesel2) elesel2.$dropdown.addClass(this.popupclass);
    }
    private doOnChange() {
        let me = $(`#${this.id}`) as any;
        let val = me.val();

        const mapBackId = (val) => {
            for (let option of this.options) {
                if (option.id == val) return option.id;
            }
            return val;
        }

        /// handle jquery overwritten event seperately
        if (!Array.isArray(val)) val = mapBackId(val);
        else {
            for (let i = 0; i < val.length; ++i) {
                val[i] = mapBackId(val[i]);
            }
        }

        /// make always-array happen
        if (this.data["always-array"] && !Array.isArray(val)) val = [val];

        this.$emit('input', val);
    }
    private mounted() {
        this.doMount();
    }
    private beforeDestroy() {
        this.subsLangChange && this.subsLangChange.unsubscribe();
        this.doUnmount();
    }

    private get popupclass(): string { return `popup-${(this as any)._uid}` }
    private get groupid(): string { return `form-group-${(this as any)._uid}` }
    private get id(): string { return `input-${(this as any)._uid}` }
}
export default FormSelection;