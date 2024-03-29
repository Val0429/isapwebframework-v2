/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Watch, Mixins, Emit, iSAPServerBase, MetaParser, IMetaResult, IInputSortingBaseUnit, ESort, ObjectHelper } from "@/../core";
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import lang from '@/../core/i18n';
import { IServer } from 'components/interfaces';
import { filter, first } from 'rxjs/operators';
import { IGetResult } from './lib/core';
import TableHeader from './lib/table-header.vue';
import TableBody from './lib/table-body.vue';

/// ui set
const uiLabel = "uiLabel";
const uiHidden = "uiHidden";
const uiAttrs = "uiAttrs";
/// custom element type
const uiType = "uiType";
/// rowspan: true | false
const uiTableMergeRow = "uiTableMergeRow";
/// easier convert value
const uiConverter = "uiConverter";
/// can sort
const uiSortable = "uiSortable";
/// can search
const uiSearchable = "uiSearchable";
/// null value
export const uiDefault = "uiDefault";

/// For Convenience - use for conditionally uiType switch
export const UI_TYPE_DEFAULT = "default";

enum EParsedType {
    Enum = "enum"
}
interface IParsedType {
    type?: EParsedType;
    isArray?: boolean;
    data?: string[];
}

/// definition of <slot /> $attrs
interface ISlotOutputAttrs {
    paging: IGetResult["paging"];
    /// all rows
    rows: IGetResult["results"];
    /// index of rows
    index: number;
    /// rows[index]
    row: any;
    /// item key
    key: string;
    /// cell value = row[key]
    value: any;
}

@Component({
    provide() {
        return { root: this }
    }
})
export class Table extends Vue {
    /// direct props ////////////////////////////
    @Prop({
        type: Object as () => IServer,
        required: false
    })
    server!: IServer;

    @Prop({
        required: false
    })
    params!: any;

    @Prop({
        type: Object,
        required: false
    })
    data!: IGetResult;

    @Prop({ type: String, required: false })
    interface!: string;

    /// can select or not
    @Prop({ type: Boolean, default: true })
    selectable!: boolean;
    /// single selection or multiple selection
    @Prop({ type: Boolean, default: false })
    multiple!: boolean;

    @Prop({ default: () => [] })
    selected!: any | any[];

    @Prop({ type: Number, default: 10 })
    pageSize!: number;

    @Prop({ type: Boolean, default: false })
    hidePaging: boolean;

    @Emit('selected')
    onSelected(rows: any | any[]) { return rows; }

    public reload() {
        this.fetchGetResult();
    }

    /// private helpers ////////////////////////////////////////////////////////////////
    private keyUiLabel: string = uiLabel;
    /// UI Helper
    private _currentPage: number = 1;
    private get paging() { return this.result.paging || {} as any };
    private get currentPage() { return Math.min(this.$data._currentPage, this.paging.totalPages || 1) }
    private set currentPage(value) { this.$data._currentPage = value }
    private get currentStart() { return (this.paging.page-1)*this.paging.pageSize+1 }
    private get currentEnd() { return Math.min(this.currentStart + this.paging.pageSize - 1, this.total || 1) }
    private get total() { return this.paging.total || 0 }

    // /// fetched meta
    // private meta: IMetaResult[] = [];
    // private get filteredMeta(): IMetaResult[] {
    //     return this.meta.filter( v => !(v.attrs || {})['uiHidden'] )
    //                     .sort( (a, b) => a.index - b.index );
    // }
    /// fetched result
    result: IGetResult = { paging: {page:0, pageSize:0, total: 0, totalPages: 0}, results: [] };
    @Emit('update:result')
    doUpdateResult(value: IGetResult) {
        this.result = value;
        return value;
    }


    private subscription: Subscription;
    private destroyed() {
        this.subscription && this.subscription.unsubscribe();
    }
    /// server watcher
    @Watch('server', {immediate: true})
    private async onServerChanged(value: IServer, oldValue: IServer) {
        if (value && value.path) {
            /// detect diff
            if (oldValue && value.server === oldValue.server && value.path === oldValue.path) return;
            this.fetchGetResult();
            /// reset selected, only if path changed
            if (this.pSelected.length > 0) {
                this.pSelected = [];
                this.$emit("selected", this.pSelected);
            }
            /// rehook server deletion
            let { server, path } = this.server;
            server = server || this.$server;
            if (!server) return;
            this.subscription && this.subscription.unsubscribe();
            this.subscription = server.listenD(path)
                .subscribe( (objectId) => {
                    let idx = this.pSelected.indexOf(objectId);
                    if (idx >= 0) this.pSelected.splice(idx, 1);
                });
        }
    }

    @Watch('interface', {immediate: true})
    private onInterfaceChanged(value: string) {
        let result = this.parsedInterface.reduce<IInputSortingBaseUnit>( (final, value) => {
            let attrs = value.attrs;
            if (!attrs) return final;
            let sortable = (attrs[uiSortable]||"").toLowerCase();
            if (!sortable || sortable == "true") return final;
            return {
                order: sortable == "asc" ? ESort.Ascending : ESort.Descending,
                field: value.name
            }
        }, {});

        this.sortBy = result;
    }

    sortBy: IInputSortingBaseUnit = {};
    @Watch('sortBy', {immediate: true})
    sortThisField(value:IInputSortingBaseUnit){
        //console.log("value", value);
        this.sortBy = value;
        //console.log("sortBy", this.sortBy);
        this.fetchGetResult();

    }

    @Watch('data', {immediate: true})
    private onDataChanged(value: IGetResult) {
        if (!value) return;
        this.doUpdateResult(value);
    }

    /// page watcher
    @Watch('currentPage')
    private async onCurrentPageChanged(value: number) {
        this.fetchGetResult();
    }

    /// pageSize watcher
    private innatePageSize: number = 10;
    @Watch('pageSize', { immediate: true })
    private onPageSizeChanged(value: number) {
        this.innatePageSize = value;
    }

    @Watch('innatePageSize')
    private onInnatePageSizeChanged(value: number) {
        this.fetchGetResult();
    }

    /// selected watcher
    @Watch('selected')
    private onSelectedChanged(value) {
        while (this.pSelected.length !== 0) this.pSelected.pop();
        if (!Array.isArray(value)) value = [value];
        for (let o of value) this.pSelected.push(o);
    }

    /// params watcher
    @Watch('params', {immediate: false})
    private async onParamsChanged(value: any, oldValue: any) {
        if (value && !ObjectHelper.equals(value, oldValue)) {
            /// params change will refresh data from server
            this.fetchGetResult();
        }
    }
    /// private methods
    private pSelected = [];
    private getSelectedIndex(row) {
        return this.pSelected.findIndex( (data) => {
            if (data.objectId) return data.objectId === row.objectId;
            return JSON.stringify(data) === JSON.stringify(row);
        });
    }
    private selectRow(row, ctrl = false) {
        if (!this.selectable) return;
        do {
            let idx = this.getSelectedIndex(row);
            if (this.multiple && ctrl) {
                if (idx >= 0) {
                    this.pSelected.splice(idx, 1);
                    break;
                }
                this.pSelected.push(row);

            } else {
                while (this.pSelected.length > 0) this.pSelected.pop();
                if (idx >= 0) {
                    break;
                }
                this.pSelected.push(row);
            }
        } while(0);

        this.onSelected(this.multiple ? this.pSelected :
            this.pSelected.length > 0 ? this.pSelected[0] : null);
    };

    private sjCreated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private created() { this.sjCreated.next(true); }
    private fetching: boolean = false;
    private async fetchGetResult() {
        if (!this.server) return;
        await this.sjCreated.pipe( filter(v=>v) ).pipe( first() ).toPromise();
        if (this.fetching) return;
        this.fetching = true;

        let serverInstance = this.server.server || this.$server;
        let path = this.server.path;
        /// try connect
        try {
            let result: IGetResult = await serverInstance.R(path, {
                paging: {
                    pageSize: this.innatePageSize,
                    page: this.currentPage,
                },
                sorting:this.sortBy,
                filtering:{
                    field:this.selectedField,
                    value:this.searchText
                },
                ...(this.params || {})
            }) as any;
            this.doUpdateResult(result);
        } catch(e) { throw e }
        finally { this.fetching = false; }
    }

    /// bind several attrs together
    private bindAttrs(item: any, inf?: IMetaResult, index?: number) {
        let attrs = (inf || {} as any).attrs || {};
        /// table bind value check here
        return {
            paging: this.result.paging,
            rows: this.result.results,
            row: item,

            ...(typeof index === 'number' ? { index } : {} ),
            ...(inf ? { key: inf.name, value: item[inf.name] } : {} ),
            // index,
            // key: inf.name,
            // value: item[inf.name],

            ...(attrs.uiAttrs ? this.strToJSON(attrs.uiAttrs) : {}),
        }
    }
    private bindListeners(item: any, inf: IMetaResult, index: number) {
        return {
            input: event => {
                item[inf.name] = event;
            }
        };
    }

    private strToJSON(input: string) {
        /// replace JSON key with double quotes
        var relaxed = input.replace(/(['"])?([a-z0-9A-Z_-]+)\1\w*:/g, '"$2":');
        /// replace JSON value with double qoutes
        relaxed = relaxed.replace(/:\s*(')((\\'|[^'])*)\1/g, (a,b,c)=> `: "${c}"`);

        return JSON.parse(relaxed);
    }
    private getRowSpan(results, index, inf: IMetaResult) {
        /// no merge row set
        if ((inf.attrs || {}).uiTableMergeRow !== 'true') return 1;
        let current = results[index][inf.name];
        /// check previous match
        for (let i = index-1; i >= 0; --i) {
            let value = results[i][inf.name];
            if (value === current) return 0;
            break;
        }
        /// check after matches
        let total = 1;
        for (let i = index+1; i < results.length; ++i, ++total) {
            let value = results[i][inf.name];
            if (value !== current) break;
        }
        return total;
    }

    private isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.left <= (window.innerWidth || document.documentElement.clientWidth));
    }

    /// interface parser
    get parsedInterface(): IMetaResult[] {
        //return this.interface ? new MetaParser(this.interface, null).result : []
        if (this.interface) return new MetaParser(this.interface, null).result;
        if (!this.result || this.result.results.length === 0) return [];
        let ref = this.result.results[0];
        return Object.keys(ref).map( (name, index) => {
            return { name, type: 'string', optional: false, index, isArray: false /* todo. made for form, table later */ }
        });
    }
    selectedField:string="";
    searchText:string="";

    get searchAbleFields(){
        const converter = (final: any[], value: IMetaResult) => {
            let attrs = value.attrs;
            if (attrs && attrs.uiSearchable=="true" && value.type == "string") {
                final.push({
                    value: value.name,
                    text: attrs.uiLabel || value.name
                });
            } else if (value.type instanceof MetaParser) {
                let result = value.type.result.reduce(converter, []);
                for (let o of result) {
                    final.push({
                        ...o,
                        value: `${value.name}.${o.value}`
                    });
                }
            }
            return final;
        }

        return this.parsedInterface.reduce(converter, []);
    }
    mounted(){
        if(this.searchAbleFields.length>0){
            this.selectedField = this.searchAbleFields[0].value;
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////
}
export default Table;
