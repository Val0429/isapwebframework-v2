import { Vue, Component, Prop } from "vue-property-decorator";


@Component
export class CellString extends Vue {
    @Prop({
        required: true
    })
    value!: any;
}
export default CellString;
