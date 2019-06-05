import { Vue, Component, Prop } from "vue-property-decorator";
import { Switch as cSwitch } from '@coreui/vue';

@Component({
    components: { cSwitch }
})
export class CellSwitch extends Vue {
    @Prop({
        required: true
    })
    value!: any;
}
export default CellSwitch;
