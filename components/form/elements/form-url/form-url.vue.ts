
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";

const urlfilter = {
    bind: (el: any, a, element) => {
        console.log('urlfilter', el, a, element);

        // valid types
        console.log('url type', element.parent.componentInstance.type);

        el = el.getElementsByTagName('input')[0];
        let oldvalue = el.value;

        // ex. /^(h(t(t(p((:\/{0,2})?))?)?)?)?$/
        function getTypeRegexByStr(str: string): RegExp {
            let result = `^(${str[0]}`;
            let tail = ')?';
            for (let i = 1; i < str.length; i++) {
                result += `(${str[i]}`;
                tail += ')?';
            }
            result += `((:\/{0,2})?)${tail}$`;

            console.log('getTypeRegexByStr', result);
            return new RegExp(result, 'i');
        }

        function testNumberOnlyIPReg(tmp: string): boolean {
            let ipRegex = /^([1-9][0-9]{0,2}(\.(([1-9][0-9]{0,2}|0)(\.(([1-9][0-9]{0,2}|0)(\.([1-9]([0-9]{1,2})?)?)?)?)?)?)?)?$/i;
            let ipFullReg = /[1-9][0-9]{0,2}\.(?:[1-9][0-9]{0,2}|0)\.(?:[1-9][0-9]{0,2}|0)\.[1-9](?:[0-9]{1,2})?:?/;
            // 若字串沒包含任何英文字母才驗證 ip regex
            if (!/(?=(?:.*[a-z]){1,})/i.test(tmp)) {
                if (/:/.test(tmp)) {
                    if (!ipFullReg.test(tmp)) return false;
                    else return true;
                }
                if (!ipRegex.test(tmp)) return false;
                let arytmp = tmp.split(".");
                for (let part of arytmp) {
                    if (part.length === 0) continue;
                    let num = +part;
                    if (num < 0 || num > 255) return false;
                }
            }
            return true;
        }

        // 根據 validTypes 決定該用哪種 regex
        let validTypes = typeof element.parent.componentInstance.type === 'string' ?
            [element.parent.componentInstance.type] : element.parent.componentInstance.type;

        let typeRegex: RegExp[] = [];
        for (let i = 0; i < validTypes.length; i++) {
            typeRegex.push(getTypeRegexByStr(validTypes[i]));
        }

        el.addEventListener('input', (evt) => {
            let newvalue = el.value;

            /// for block the input
            let ipRegex = /^([1-9][0-9]{0,2}(\.(([1-9][0-9]{0,2}|0)(\.(([1-9][0-9]{0,2}|0)(\.([1-9]([0-9]{1,2})?)?)?)?)?)?)?)?$/i;
            // https://regexr.com/3au3g
            let domainNameRegex = /^(([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.?)?)*([a-z0-9][a-z0-9-]{0,61}[a-z0-9]?)?$/i;
            let portRegex = /^(:([1-9]?[0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])?)?\/?$/i;

            /// for match full regex
            // 組 protocol full reg ex. ((http:\\/\\/)|(https:\\/\\/))?
            let protocolFullReg = '';
            let protocolAry = [];
            for (let i = 0; i < validTypes.length; i++) {
                // ex. (?:http:\\/\\/)
                protocolAry.push(`(?:${validTypes[i]}:\\/\\/)`);
            }
            if (protocolAry.length > 0) {
                protocolFullReg = `(${protocolAry.join('|')})?`;
            }
            console.log('protocolFullReg', protocolFullReg);

            let ipFullReg = "(?:[1-9][0-9]{0,2}\\.(?:[1-9][0-9]{0,2}|0)\\.(?:[1-9][0-9]{0,2}|0)\\.[1-9](?:[0-9]{1,2})?)?";
            let domainNameFullRegex = "(?:(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]|[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9]))";
            let portFullReg = "(:[1-9][0-9]{0,4}\\/)?";
            let fullReg = new RegExp(`^${protocolFullReg}(${ipFullReg}|${domainNameFullRegex})?${portFullReg}`, 'i');

            main: do {
                let matches = newvalue.match(fullReg);
                console.log('value', newvalue, matches);
                if (matches === null || matches[1] === undefined) {
                    if (!typeRegex.some(item => item.test(newvalue))) break;
                } else if (matches[2] === undefined) {
                    let tmp = newvalue.replace(matches[1], "");

                    if (!ipRegex.test(tmp) && !domainNameRegex.test(tmp)) break;

                    // ip test
                    if (!testNumberOnlyIPReg(tmp)) break;

                } else if (matches[3] === undefined) {
                    // 有可能是符合 domain name rule
                    // 若字串當中有非數字才過，否則應用 ip 的 rule
                    let tmp = newvalue.replace(matches[1], "");
                    if (!testNumberOnlyIPReg(tmp)) break;
                    if ((!domainNameRegex.test(tmp)) && !/[^.-][\/:]/.test(tmp)) break;

                    tmp = tmp.replace(matches[2], "");
                    // 若含有 : 才用 port rule 去比
                    console.log('???', newvalue, tmp, portRegex);
                    if (tmp.indexOf(':') > -1 && (tmp === ':/' || !portRegex.test(tmp))) break;
                }

                oldvalue = newvalue.toLowerCase();
                el.value = oldvalue;
                return;
            } while (0);

            let { selectionStart, selectionEnd } = el;
            el.value = oldvalue.toLowerCase();
            element.context.$emit('input', el.value);   /// emit new value
            el.selectionStart = selectionStart - 1;
            el.selectionEnd = selectionEnd - 1;
        });
    }
};

enum EErrorType {
    General,
    IP,
    Protocol
}

@Component({
    directives: { urlfilter }
})
export class FormUrl extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label!: string;

    @Model("input", {
        type: String,
        required: false
    })
    value!: string;

    @Prop({
        type: [String, Array],
        required: false,
        default: function () {
            return ['http', 'https', 'ws', 'ftp'];
        }
    })
    type!: string | string[];

    @Prop({ type: String, required: false })
    placeholder!: string;

    @Prop({ type: String, required: false })
    invalid!: string;

    /// private helpers
    private innateType: string[] = [];
    @Watch("type", {immediate: true})
    private onTypeChanged(newval: string | string[]) {
        this.innateType = typeof newval === 'string' ? [newval] : newval;
    }

    private errorType: EErrorType = EErrorType.General;

    mounted() {
        if (this.innateType.some(item => /[^a-z]/i.test(item))) throw new Error(this._('mb_ErrorTypeFormat'));

        // 若 type 僅一個值，預設可幫帶，element 需綁 model 才會生效
        console.log('form-url mounted');     
        if (this.innateType.length === 1 && !this.value) {
            let defaultValue = `${this.innateType[0]}://`;
            this.$emit('input', defaultValue.toLowerCase());
        }
    }

    public validation(value: string): boolean {
        // 只取 hostname 的字串驗證
        let targetRegex = /(?:^(?:.+:\/\/)([^\/]+)\/?$)|(?:^(?:.+:\/\/)([^\/]+)\/).+/i;
        let ipFullReg = "([1-9][0-9]{0,2}\\.([1-9][0-9]{0,2}|0)\\.([1-9][0-9]{0,2}|0)\\.[1-9]([0-9]{1,2}))";

        let domainNameFullRegex = "(([a-z0-9]([a-z0-9-]{0,61}[a-z0-9]))|[a-z0-9]([a-z0-9-]{0,61}[a-z0-9]\\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])";
        let portFullReg = "(:[1-9][0-9]{0,4}\\/?)?";
        let fullReg = new RegExp(`^${ipFullReg}|${domainNameFullRegex}${portFullReg}$`, 'i');
        console.log('fullReg validation', fullReg);

        let target = '';
        if (!value.match(targetRegex)) {
            this.errorType = EErrorType.Protocol;
            return false;   
        }
        target = value.match(targetRegex)[1] || value.match(targetRegex)[2];
        console.log('validation', target);
        if (/[^0-9.:]/.test(target)) {
            this.errorType = EErrorType.General;
            return new RegExp(`^${domainNameFullRegex}${portFullReg}$`, 'i').test(target);
        }

        this.errorType = EErrorType.IP;
        return new RegExp(`^${ipFullReg}${portFullReg}$`, 'i').test(target);

    }
    public invalidMessage(): string {
        // return this._("mb_ValidationUrl");
        switch (this.errorType) {
            case EErrorType.IP:
                return this._('mb_ValidationIp');
            case EErrorType.Protocol:
                let supportedType = this.innateType.join(", ");
                return `${this._('mb_ValidationIp')} ${supportedType}`;
            case EErrorType.General:
            default:
                return this._("mb_ValidationUrl");
        }
    }
}
export default FormUrl;