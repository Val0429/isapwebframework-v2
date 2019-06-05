import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export class CellDate extends Vue {
    @Prop({
        required: true
    })
    value!: any;
}
export default CellDate;
Vue.component('cell-date', CellDate);
