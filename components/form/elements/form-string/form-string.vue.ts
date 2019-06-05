import { Vue, Component, Prop, Model } from "vue-property-decorator";


@Component
export class FormString extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label!: string;

    @Prop({ type: String, required: false })
    placeholder!: string;

    @Prop({ type: String, required: false })
    invalid!: string;

    @Model('input', {
        type: [String, Number],
        required: false
    })
    value!: string;
}
export default FormString;