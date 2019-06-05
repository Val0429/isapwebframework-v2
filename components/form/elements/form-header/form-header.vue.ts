import { Vue, Component, Prop, Model } from "vue-property-decorator";


@Component
export class FormHeader extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label!: string;
}
export default FormHeader;
