import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import lang from '@/../core/i18n';

@Component
export class FormFile extends Vue {
    @Prop({ type: String, required: false })
    label!: string;

    @Prop({ type: String, required: false })
    placeholder!: string;

    @Prop({ type: String, required: false })
    dropPlaceholder!: string;

    @Prop({ type: String, required: false })
    invalid!: string;

    @Model('input', { required: false })
    value!: string | string[];

    private static subscription;
    created() {
        /// do only once
        if (FormFile.subscription) return;
        FormFile.subscription = lang.getObservable()
            .subscribe( (value) => {
                document.documentElement.style
                    .setProperty('--browse-text', `"${lang.translate("wb_Browse")}"`);
            });
    }
}
export default FormFile;