import { Vue, Component, Prop, Model, Emit, Watch, Provide, Inject, iSAPServerBase } from "@/../core";
import { ITreeUnit } from './../tree';
import { IServerTree } from 'components/interfaces';

@Component({
    provide() {
        return { eventBus: (this as any).eventBus || this }
    }
})
export class RegionTree extends Vue {
    @Prop({
        type: Object as () => IServerTree,
        required: false
    })
    server: IServerTree;

    @Prop({ type: Boolean, default: true })
    visible: boolean;

    @Prop({
        required: false
    })
    data: ITreeUnit<any> | any[];

    @Inject({
        default: function() { return this }
    }) eventBus: any;

    public get result() {
        return (this.$refs.tree as any).result;
    }

    public reload() {
        (this.$refs.tree as any).reload();
    }

    /// private helpers ////////////////////////////////////////////////////////////////
    private innateVisible: boolean = true;
    @Watch("visible", { immediate: true })
    private onVisibleChanged(newval: boolean, oldval: boolean) {
        this.innateVisible = newval;
    }
}
Vue.component('region-tree', RegionTree);
export default RegionTree;