import { Vue, Component, Prop, Model } from "vue-property-decorator";
import { Switch as cSwitch } from '@coreui/vue';

@Component({
    components: { cSwitch }
})
export class FormSwitch extends Vue {
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
        type: Boolean,
        required: false
    })
    value!: string;
}
export default FormSwitch;