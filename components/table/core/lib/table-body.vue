<template>
    <td v-if="meta && typeof meta.type === 'string' && (meta.attrs||{}).uiHidden !== 'true'">
        <!-- custom slot case -->
        <template v-if="$slots[meta.name]">
            <slot :name="meta.name" />
        </template>
        <!-- custom scoped slot case -->
        <template v-else-if="$scopedSlots[meta.name]">
            <slot
                :name="meta.name"
                :$attrs="bindAttrs()"
                :$listeners="bindListeners()"
            />
        </template>
        <!-- multiple case -->
        <template v-else-if="parentMeta && getIsMultiple(parentMeta)">
            <iv-cell-multiple :elementType="getElementType(meta)" v-bind="bindAttrs()" v-on="bindListeners()" />
        </template>
        <template v-else>
            <!-- null case -->
            <template v-if="getIsDefault(meta)">
                <element v-bind="getUIDefaultValue(meta)" />
            </template>
            <!-- original type -->
            <template v-else>
                <element
                    :key="meta.name"
                    :is="getElementType(meta)"
                    v-bind="bindAttrs()"
                    v-on="bindListeners()"
                />
            </template>
        </template>
    </td>
    <!-- hidden -->
    <fragment v-else-if="(meta.attrs||{}).uiHidden === 'true'" />
    <!-- recursive table -->
    <fragment v-else-if="meta">
        <iv-inner-table-body
            :key="key"
            v-for="(meta2, key) in meta.type.result"
            :meta="meta2"
            :parentMeta="meta"
            :indexOfRows="indexOfRows"
            :result="result"
        >
            <template
                v-for="slot in relatedSlots(meta2.name, false)"
                :slot="slot.name"
            >
                <slot :name="slot.originalName" />
            </template>
            <template
                v-for="slot in relatedSlots(meta2.name, true)"
                v-slot:[slot.name]="scope"
            >
                <slot
                    :name="slot.originalName"
                    v-bind="scope"
                />
            </template>
        </iv-inner-table-body>
    </fragment>

</template>



<script lang="ts">
/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, IMetaResult, Prop, Component, Inject } from "@/../core";
import { uiDefault, UI_TYPE_DEFAULT } from "../table.vue";
import { IGetResult } from "./core";
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

    @Inject({
        default: null
    })
    root: any;

    /// private
    @Prop({
        type: Object,
        required: false
    })
    parentMeta: IMetaResult;

    private get row() {
        return this.result.results[this.indexOfRows];
    }

    private getElementType(inf: IMetaResult): string {
        let uiType = (inf.attrs || {}).uiType;
        if (uiType && uiType != UI_TYPE_DEFAULT) return uiType;
        return this.getDefaultType(inf);
    }
    private getDefaultType(inf: IMetaResult): string {
        return inf.type === "Date" ? "iv-cell-date" :
               "iv-cell-string";
    }

    private getIsMultiple(inf: IMetaResult): boolean {
        let multiple = (inf.attrs||{})["uiMultiple"];
        return multiple ? (multiple === "true" ? true : false) : inf.isArray;
    }
    private getIsDefault(inf: IMetaResult): boolean {
        let def = (inf.attrs||{})["uiDefault"];
        if (!def) return false;
        let value = (this.row||{})[this.meta.name];
        let typeOfValue = typeof(value);
        return value == null ? true :
               typeOfValue === "string" && value === "" ? true :
               typeOfValue === "number" && value === 0 ? true :
               false;
    }

    private getUIDefaultValue(inf: IMetaResult): { is: string, value: string } {
        /// handle uiDefault
        let def = (inf.attrs || {})[uiDefault];
        const defRegex = /^\(/;
        let value = def;
        if (defRegex.test(def)) {
            /// lambda function case
            value = (function(value, all) {
                return eval(def)(value, all);
            }).call(parent, undefined, this.bindAttrs());
        }
        return {
            is: value[0] === "<" ? "iv-cell-html-string" : "iv-cell-string",
            value
        }
    }

    private bindAttrs() {
        let inf = this.meta;
        let item = this.result.results[this.indexOfRows];
        let attrs = (inf || ({} as any)).attrs || {};

        /// try get value
        let me: Vue = this;
        let value = this.row;
        let metas = [];
        do {
            metas.unshift((me as any).meta);
        } while (((me = me.$parent), (me as any).meta));
        for (let meta of metas) {
            if (!value) break;
            /// handle array data
            if (Array.isArray(value) && this.parentMeta && this.getIsMultiple(this.parentMeta)) {
                value = value.map( v => v[meta.name] );
            } else {
                value = value[meta.name];
            }
        }

        let all = {
            paging: this.result.paging,
            rows: this.result.results,
            row: item,
            index: this.indexOfRows,

            ...(inf ? { key: inf.name, value } : {}),

            ...(attrs.uiAttrs ? this.strToJSON(attrs.uiAttrs) : {})
        };

        /// try convert value
        let converter = attrs["uiConverter"];
        if (converter) {
            let parent = (this.root || {}).$parent || this.$parent;
            /// find func converter
            let funcConverter;
            while (parent && !(funcConverter = parent[converter]))
                parent = parent.$parent;

            if (/[a-zA-z]/.test(converter[0])) {
                /// execute as Scope Function
                if (!funcConverter) throw `uiConverter <${converter}> not defined.`;
                /// handle array data
                if (Array.isArray(value) && this.parentMeta && this.getIsMultiple(this.parentMeta)) {
                    value = value.map((value) => funcConverter(value, all));
                } else {
                    value = funcConverter(value, all);
                }
                all.value = value;
            } else {
                /// execute as Inline Function
                /// handle array data
                if (Array.isArray(value) && this.parentMeta && this.getIsMultiple(this.parentMeta)) {
                    value = function(value, all) {
                        let funcConverter = eval(converter);
                        return value.map( (value) => funcConverter(value, all) );
                    }.call(parent, value, all);
                } else {
                    value = function(value, all) {
                        return eval(converter)(value, all);
                    }.call(parent, value, all);
                }
                all.value = value;
            }
        }

        /// table bind value check here
        return all;
    }
    private bindListeners() {
        let inf = this.meta;
        let item = this.result.results[this.indexOfRows];
        return {
            input: event => {
                let me: Vue = this;
                let metas = [];
                do {
                    metas.unshift((me as any).meta);
                } while (((me = me.$parent), (me as any).meta));
                for (let i=0, o=item; i<metas.length; ++i) {
                    let last=(i==metas.length-1);
                    let meta = metas[i];
                    if (!o) break;
                    if (!last) o = o[meta.name];
                    else o[meta.name] = event;
                }
            }
        };
    }
    private strToJSON(input: string) {
        var regex = /([{,]\s*(['"])?)([a-z0-9A-Z_]+)(['"])?:/g;
        var relaxed = input.replace(regex, (a,b,c,d) => `${b}"${d}":`);
        let result = JSON.parse(relaxed);
        return result;
    }

    private relatedSlots(
        name: string,
        isScoped?: boolean
    ): { originalName: string; name: string }[] {
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
        // console.log('related', name, slots, rtn);
        return rtn;
    }
}
Vue.component("iv-inner-table-body", TableBody);
export default TableBody;
</script>
