import { Vue, Component, Prop, Model, Emit } from "vue-property-decorator";


@Component
export class ToolboxDivider extends Vue {
    @Prop({
        type: Boolean,
        required: false,
        default: true
    })
    visible!: boolean;
}
export default ToolboxDivider;
