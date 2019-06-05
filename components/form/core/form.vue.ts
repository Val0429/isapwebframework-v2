    /// ui set
    const uiLabel = "uiLabel";
    const uiPlaceHolder = "uiPlaceHolder";
    const uiDisabled = "uiDisabled";
    const uiRequired = "uiRequired";
    const uiHidden = "uiHidden";
    const uiAttrs = "uiAttrs";
    /// custom element type
    const uiType = "uiType";
    /// validation: RegExp or function
    const uiValidation = "uiValidation"; /// custom element supported
    const uiInvalidMessage = "uiInvalidMessage";
    /// group columns together
    const uiColumnGroup = "uiColumnGroup"; /// custom element supported

    import { Vue, Component, Prop, Model, Emit, Watch, Inject } from "vue-property-decorator";
    import { MetaParser, EnumParser, IMetaResult } from "@/../core/server/parser/meta-parser";

    enum EParsedType {
        Enum = "enum",
        Interface = "interface"
    }
    interface IParsedTypeEnum {
        type?: EParsedType.Enum;
        isArray?: boolean;
        data?: string[];
    }
    interface IParsedTypeInterface {
        type?: EParsedType.Interface;
        data?: MetaParser;
    }
    type IParsedType = IParsedTypeEnum | IParsedTypeInterface;

    /**
     * Add toolbar into Card.
     */
    @Component
    export class Form extends Vue {
        /// public ///////////////////////////////////////////////////////////////////////////
        /// direct props ////////////////////////////
        @Prop({ required: true })
        interface!: IMetaResult[] | string;

        @Prop({ type: Object, required: false, default: () => ({}) })
        value!: any;

        /// private props - don't use
        @Prop({ type: Boolean, required: false, default: false })
        inner!: boolean;

        /// public method ///////////////////////////
        public set(key: string, value: any) {
            Vue.set(this.innateValue, key, value);
        }
        public getResult() {
            let result = this.deepClone(this.innateValue);
            /// remove empty string & undefined & null
            Object.keys(result).forEach((key) => {
                let value = result[key];
                if (value === '' || value === undefined || value === null) delete result[key];
            });

            for (let meta of this.parsedInterface || []) {
                let ref: any = this.$refs[meta.name];
                if (!ref) continue;
                let value = ref[0].getResult();
                /// if empty, ignore
                if (Object.keys(value).length === 0) {
                    delete result[meta.name];
                    continue;
                }
                Object.assign(result, { [meta.name]: value });
            }
            return result;
        }
        //////////////////////////////////////////////////////////////////////////////////////

        /// private //////////////////////////////////////////////////////////////////////////
        /// private helper
        private get parsedInterface() {
            if (typeof this.interface === 'string') {
                return new MetaParser(this.interface, null).result;
            } else {
                return this.interface;
            }
        }

        private innateValue: any = {};
        @Watch("value", { immediate: true, deep: true })
        private onValueChanged(value) {
            if (!value) return;
            /// when binding value changes, reset states
            this.restore(value);
        }

        @Inject({
            default: null
        }) root: any;

        /// united emitter
        @Emit("submit")
        private doSubmit() {
            return this.deepClone(this.innateValue);
        }
        private emitUpdate(name: string, value: any) {
            if (name.indexOf(".") < 0) this.$emit(`update:${name}`, value);
            else this.$emit(`update:${name.replace(/\./g, ':')}`, value);
            this.$emit(`update:*`, { key: name, value });
        }

        /// reset button
        private restore(value?) {
            value = value || this.value;
            /// clean
            Object.keys(this.innateValue).forEach(key => { Vue.set(this.innateValue, key, undefined); });
            /// apply clone
            let clone = this.deepClone(value);
            Object.keys(clone).forEach(key => { Vue.set(this.innateValue, key, clone[key]); });
            /// initialize key/value
            for (let inf of this.parsedInterface) {
                if (this.innateValue[inf.name] === undefined) {
                    if (inf.type instanceof MetaParser) Vue.set(this.innateValue, inf.name, {});
                    else Vue.set(this.innateValue, inf.name, undefined);
                }
            }
            this.resetState();
        }

        /// bind several attrs together
        private bindAttrs(inf: IMetaResult, index: number, parsedType?: IParsedTypeEnum) {
            let groupNumber = this.checkUiGroupNumbers(inf, index) || 1;
            let splits = Math.floor(12 / groupNumber);
            let attrs = inf.attrs || {};

            if (!parsedType && typeof inf.type === 'string' && /^\(?enum/.test(inf.type)) {
                let parsed = this.parsedType(inf.type);
                if (parsed) parsedType = parsed[0] as any;
            }

            return {
                class: { [`col-md-${splits}`]: true },
                state: this.showState(inf),
                label: this.showLabel(inf),
                placeholder: attrs.uiPlaceHolder,
                disabled: attrs.uiDisabled === 'true' ? true : undefined,
                invalid: attrs.uiInvalidMessage,
                value: this.innateValue[inf.name],

                ...(parsedType ? { multiple: parsedType.isArray, options: parsedType.data } : {}),

                ...(attrs.uiAttrs ? this.strToJSON(attrs.uiAttrs) : {}),
            };
        }
        private bindListeners(inf: IMetaResult, index: number) {
            return {
                input: event => {
                    this.innateValue[inf.name] = event;
                    this.emitUpdate(inf.name, event);
                }
            };
        }
        private strToJSON(input: string) {
            var relaxed = input.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
            return JSON.parse(relaxed);
        }
        /// should break line?
        private checkLineBreak(index: number): boolean {
            let pi = this.parsedInterface;
            let inf;
            let thisGroup = ((inf = pi[index]), (inf.attrs || {}).uiColumnGroup);
            let nextGroup =
                pi.length <= index + 1
                    ? undefined
                    : ((inf = pi[index + 1]), (inf.attrs || {}).uiColumnGroup);
            return thisGroup !== nextGroup;
        }
        /// ui group columns count
        private checkUiGroupNumbers(inf: IMetaResult, index: number): number {
            let group = (inf.attrs || {}).uiColumnGroup;
            if (!group) return 0;
            let pi = this.parsedInterface;
            let result = 1;
            for (let i = index - 1; i >= 0; --i) {
                let thisGroup = (pi[i].attrs || {}).uiColumnGroup;
                if (thisGroup === group) {
                    result++;
                    continue;
                }
                break;
            }
            for (let i = index + 1; i < pi.length; ++i) {
                let thisGroup = (pi[i].attrs || {}).uiColumnGroup;
                if (thisGroup === group) {
                    result++;
                    continue;
                }
                break;
            }
            return result;
        }
        private showLabel(inf: IMetaResult): string {
            let attrs = inf.attrs || {};
            let name = attrs[uiLabel] || inf.name;
            let optional = attrs[uiRequired] !== undefined ? (attrs[uiRequired] === 'true' ? false : true) : inf.optional;
            return (!optional ? "* " : "") + name;
        }

        private states = {};
        private showState(inf: IMetaResult): boolean {
            return this.states[inf.name] === false ? false : undefined;
        }
        private resetState() {
            for (let key in this.states) {
                Vue.set(this.states, key, undefined);
            }
        }
        private validate() {
            /// validate interfaces: Required
            main: for (let meta of this.parsedInterface || []) {
                let attrs = meta.attrs || {};
                if (attrs[uiHidden] === 'true') continue;  /// ignore hidden field
                let optional = attrs[uiRequired] !== undefined ? (attrs[uiRequired] === 'true' ? false : true) : meta.optional;
                if (!optional) {
                    let value = this.innateValue[meta.name];
                    do {
                        if (value === undefined) break;
                        if (value === null) break;
                        if (value === "") break;
                        if (
                            typeof value === "object" &&
                            Array.isArray(value) &&
                            value.length === 0
                        ) break;

                        if (typeof value === "object" &&
                            this.$refs[meta.name] &&
                            !(this.$refs[meta.name] as any)[0].validate()
                        ) break;

                        continue main;
                    } while(0);

                    console.info(`validation failed on: <${meta.name}>, value: `, value);
                    return false;
                }
            }
            console.info("validation success.");
            return true;
        }

        private validateFull(): boolean {
            let finalState = true;
            let parent = this.root || this.$parent;
            for (let meta of this.parsedInterface || []) {
                if ((meta.attrs || {})[uiHidden] === 'true') continue;  /// ignore hidden field

                /// check inner form
                if (meta.type instanceof MetaParser) {
                    if (this.$refs[meta.name] && !(this.$refs[meta.name] as any)[0].validateFull()) finalState = false;
                    continue;
                }

                /// check normal fields
                let validation = (meta.attrs || {})[uiValidation];
                let value = this.innateValue[meta.name];
                if (value !== null && value !== undefined && value !== '' &&    /// ignore empty value
                    validation
                    ) {
                    if (validation[0] === "/") {
                        /// execute as RegExp
                        if (!eval(validation).test(value)) {
                            Vue.set(this.states, meta.name, false);
                            finalState = false;
                        } else Vue.set(this.states, meta.name, undefined);
                    } else if (/[a-zA-z]/.test(validation[0])) {
                        /// execute as Scope Function
                        if (!parent[validation](value, this.innateValue)) {
                            Vue.set(this.states, meta.name, false);
                            finalState = false;
                        } else Vue.set(this.states, meta.name, undefined);
                    } else {
                        /// execute as Function
                        // if (!eval(validation).call(this.$parent, value, this.value)) { Vue.set(this.states, meta.name, false); finalState = false; }
                        if (
                            !function(value, all) {
                                return eval(validation)(value, all);
                            }.call(parent, value, this.innateValue)
                        ) {
                            Vue.set(this.states, meta.name, false);
                            finalState = false;
                        } else Vue.set(this.states, meta.name, undefined);
                    }
                }
            }
            return finalState;
        }

        private relatedSlots(name: string, isScoped?: boolean): { originalName: string, name: string }[] {
            let slots = isScoped ? this.$scopedSlots : this.$slots;
            let rtn = [];
            let regex = new RegExp(`^${name}\.`);
            for (let key in slots) {
                if (!regex.test(key)) continue;
                rtn.push({
                    originalName: key,
                    name: key.replace(regex, "")
                });
            }
            return rtn;
        }

        /// interface parser
        private parsedType(type: string): IParsedType[] {
            if (!type) return;
            let rtn: IParsedType = {};
            let result;

            /// test interface
            if (typeof type !== 'string') {
                rtn = {
                    type: EParsedType.Interface,
                    data: type
                }
                return [rtn];
            }

            /// test enum
            let parse = new EnumParser(type);
            if (parse.result.length !== 0) {
                rtn = {
                    type: EParsedType.Enum,
                    isArray: false
                }

                /// test array
                result = type.match(/^\(([\s\S]+)\)\[\]$/);
                if (result && result.length > 1) {
                    rtn.isArray = true;
                    type = result[1];
                } else rtn.isArray = false;

                rtn.data = parse.result as any;
                return [rtn];
            }

            return;
        }

        /// clone utility
        private deepClone(obj, hash = new WeakMap()) {
            if (Object(obj) !== obj) return obj; // primitives
            if (obj instanceof Set) return new Set(obj); // See note about this!
            if (hash.has(obj)) return hash.get(obj); // cyclic reference
            const result =
                obj instanceof Date ? new Date(obj) :
                obj instanceof File ? new File([obj], obj.name, { type: obj.type }) :
                obj instanceof RegExp ? new RegExp(obj.source, obj.flags) :
                obj.constructor ? new obj.constructor() : Object.create(null);
            hash.set(obj, result);
            if (obj instanceof Map)
                Array.from(obj, ([key, val]) =>
                    result.set(key, this.deepClone(val, hash))
                );
            return Object.assign(
                result,
                ...Object.keys(obj).map(key => ({
                    [key]: this.deepClone(obj[key], hash)
                }))
            );
        }

        /// Submit / Reset buttons
        /// united emitter
        public get submitBindings() {
            return {
                $attrs: {
                    variant: "primary",
                    disabled: !this.validate()
                },
                $listeners: {
                    click: () => this.validateFull() && this.doSubmit()
                }
            }
        }

        public get resetBindings() {
            return {
                $attrs: {
                    variant: "light"
                },
                $listeners: {
                    click: () => this.restore()
                }
            }
        }

        //////////////////////////////////////////////////////////////////////////////////////
    }
    export default Form;