import { Vue, Component, Prop, Model } from "vue-property-decorator";
import lang from '@/../core/i18n';

@Component
export class LanguageButton extends Vue {
    @Model('change', {
        type: String,
        required: false
    })
    value: string;

    private lang: string = lang.get();

    get languageList() {
        return lang.list();
    }

    updateLanguage(name: string) {
        this.$emit('change', name);
        this.lang = name;
        lang.set(name);
    }

    private created() {
        if (this.value) {
            this.lang = this.value;
            lang.set(this.lang);

        } else {
            this.$emit('change', this.lang);
        }
    }

}
export default LanguageButton;