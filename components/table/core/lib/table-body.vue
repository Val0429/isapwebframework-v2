<template>
    <td v-if="meta && typeof meta.type === 'string' && (meta.attrs||{}).uiHidden !== 'true'">
        <template v-if="$slots[meta.name]">
            <slot :name="meta.name" />
        </template>
        <template v-else-if="$scopedSlots[meta.name]">
            <slot :name="meta.name" :$attrs="bindAttrs()" :$listeners="bindListeners()" />
        </template>
        <template v-else>
            <template v-if="(meta.attrs||{}).uiType ? true : false">
                <element :key="meta.name" :is="meta.attrs.uiType" v-bind="bindAttrs()" v-on="bindListeners()" />
            </template>
            <template v-else-if="meta.type === 'Date'">
                <iv-cell-date :key="meta.name" v-bind="bindAttrs()" v-on="bindListeners()" />
            </template>
            <template v-else>
                <iv-cell-string :key="meta.name" v-bind="bindAttrs()" v-on="bindListeners()" />
            </template>
        </template>
    </td>
    <fragment v-else-if="meta">
        <iv-inner-table-body :key="key" v-for="(meta2, key) in meta.type.result" :meta="meta2" :indexOfRows="indexOfRows" :result="result">
            <template v-for="slot in relatedSlots(meta2.name, false)" :slot="slot.name">
                <slot :name="slot.originalName" />
            </template>
            <template v-for="slot in relatedSlots(meta2.name, true)" v-slot:[slot.name]="scope">
                <slot :name="slot.originalName" v-bind="scope" />
            </template>
        </iv-inner-table-body>
    </fragment>

</template>



<script lang="ts">
import { Vue, IMetaResult, Prop, Component } from "@/../core";
import { IGetResult } from './core';
@Component
export class TableBody extends Vue {
    @Prop({
        type: Object,
        required: true
    })
    meta: IMetaResult;

    @Prop({
        type: Number,
        required: true
    })
    indexOfRows: number;

    @Prop({
        type: Object,
        required: true
    })
    result: IGetResult;

    private get row() {
        return this.result.results[this.indexOfRows];
    }

    private bindAttrs() {
        let inf = this.meta;
        let item = this.result.results[this.indexOfRows];
        let attrs = (inf || {} as any).attrs || {};

        /// try get value
        let me: Vue = this;
        let value = this.row;
        let metas = [];
        do { metas.unshift((me as any).meta) } while ( (me = me.$parent, (me as any).meta) );
        for (let meta of metas) {
            if (!value) break;
            value = value[meta.name];
        }

        /// table bind value check here
        return {
            paging: this.result.paging,
            rows: this.result.results,
            row: item,
            index: this.indexOfRows,

            ...(inf ? { key: inf.name, value } : {} ),
            
            ...(attrs.uiAttrs ? this.strToJSON(attrs.uiAttrs) : {}),
        }
    }
    private bindListeners() {
        let inf = this.meta;
        let item = this.result.results[this.indexOfRows];
        return {
            input: event => {
                item[inf.name] = event;
            }
        };
    }
    private strToJSON(input: string) {
        var relaxed = input.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
        return JSON.parse(relaxed);
    }

    private relatedSlots(name: string, isScoped?: boolean): { originalName: string, name: string }[] {
        let slots = isScoped ? this.$scopedSlots : this.$slots;
        let rtn = [];
        let regex = new RegExp(`^${this.meta.name}\.`);
        for (let key in slots) {
            if (!regex.test(key)) continue;
            rtn.push({
                originalName: key,
                name: key.replace(regex, "")
            });
        }
        console.log('related', name, slots, rtn);
        return rtn;
    }

}
Vue.component('iv-inner-table-body', TableBody);
export default TableBody;
</script>