import { Vue, Component, Prop, Model, Watch, Emit } from "vue-property-decorator";

@Component
export class AlertResponse extends Vue {
    @Prop({ type: Boolean, required: false })
    visible: boolean;

    @Prop({ type: String, required: true })
    label: string;

    @Prop({ type: String, required: true })
    value: string;

    @Emit('update:visible')
    doUpdateVisible(value: boolean) { return value; }
}
export default AlertResponse;