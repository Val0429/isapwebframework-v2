import { Vue, Component, Prop, Model, Emit, Watch, Inject, iSAPServerBase } from "@/../core";
import { IServerTree } from 'components/interfaces';
import { BehaviorSubject } from 'rxjs';
import { filter, first } from 'rxjs/operators';

export type ITreeUnit<T> = T & {
    children?: ITreeUnit<T>[];
}

interface IGetResult {
    paging: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    },
    results: any[];
}

@Component
export class Tree extends Vue {
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
    data: any;

    public reload() {
        this.fetchGetResult();
    }

    /// private helpers
    private innateVisible: boolean = true;
    @Watch("visible", { immediate: true })
    private onVisibleChanged(newval: boolean, oldval: boolean) {
        this.innateVisible = newval;
    }

    private get leaf() {
        return this.$parent.$vnode.componentOptions.tag;
    }

    private result: ITreeUnit<any> = null;
    /// server watcher
    @Watch('server', {immediate: true})
    private async onServerChanged(value: IServerTree) {
        if (value) {
            this.fetchGetResult();
        }
    }

    @Watch('data', {immediate: true})
    private onDataChanged(value: ITreeUnit<any> | any[]) {
        if (!value) return;
        this.result = this.transferToITreeUnit(value);
    }

    /// private methods
    private transferToITreeUnit(data: ITreeUnit<any> | any[]) {
        if (!Array.isArray(data)) return data;
        /// first sort
        data = [...data].sort( (a, b) => a.lft - b.lft );
        let transfer = (data: any[]) => {
            if (data.length === 0) return;
            let parent = data[0];
            parent.children = [];
            let i = 1, lft = parent.lft, rgt = parent.rgt;

            let refs = [];
            for (i; i<data.length; ++i) {
                let value = data[i];
                if (refs.length === 0) refs.push(value);
                else {
                    let ref = refs[0];
                    if (value.rgt < ref.rgt) {
                        refs.push(value);
                    } else {
                        let result = transfer(refs);
                        if (result) parent.children.push(result);
                        refs.length = 0;
                        refs.push(value);
                    }
                }
            }
            /// finalize
            if (refs.length > 0) {
                let result = transfer(refs);
                if (result) parent.children.push(result);
            }
            return parent;
        }
        let result: ITreeUnit<any> = transfer(data);
        return result;
    }


    private sjCreated: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private created() { this.sjCreated.next(true); }
    private fetching: boolean = false;
    private async fetchGetResult() {
        if (!this.server) return;
        await this.sjCreated.pipe( filter(v=>v) ).pipe( first() ).toPromise();
        if (this.fetching) return;
        this.fetching = true;

        let serverInstance = this.server.server || this.$server;
        let { path, groupBy, objectId } = this.server;
        /// try connect
        try {
            let result: IGetResult = await serverInstance.R(path, {
                paging: {
                    all: true
                },
                ...(groupBy ? {groupBy} : {}),
                ...(objectId ? {objectId} : {}),
            }) as any;
            this.result = this.transferToITreeUnit(result.results);
        } catch(e) { throw e }
        finally { this.fetching = false; }
    }
}
export default Tree;