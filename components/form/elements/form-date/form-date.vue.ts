import { Vue, Component, Prop, Model } from "vue-property-decorator";
import { FormDatetimeType } from './../form-datetime';

@Component
export class FormDate extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label!: string;

    @Model('input', {
        type: Date,
        required: false,
    })
    value!: Date;

    @Prop({
        type: String,
        required: false,
        default: FormDatetimeType.Date
    })
    type!: FormDatetimeType;

    @Prop({ type: String, required: false })
    invalid!: string;
}
export default FormDate;