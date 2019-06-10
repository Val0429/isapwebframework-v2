import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";
import { IServer } from 'components/interfaces';

@Component
export class FormServerObject extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label!: string;

    @Prop({ type: String, required: false })
    placeholder!: string;

    @Prop({ type: String, required: false })
    invalid!: string;

    /// pass down props ////////////////////////////
    @Prop({
        type: Object as () => IServer,
        required: true
    })
    server: IServer;

    @Prop({ type: String, required: false })
    interface!: string;

    /// can select or not
    @Prop({ type: Boolean, default: true })
    selectable!: boolean;
    /// single selection or multiple selection
    @Prop({ type: Boolean, default: false })
    multiple!: boolean;

    @Model('input', {
        required: false
    })
    value!: any | any[];

    @Emit()
    input(data) {
        function transform(data) {
            if (!Array.isArray(data)) {
                return data.objectId;
            }
            return data.map( (o) => transform(o) );
        }
        return transform(data);
    }
}
export default FormServerObject;