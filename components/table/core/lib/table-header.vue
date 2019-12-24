<template>
    <th v-if="typeof meta.type === 'string' && (meta.attrs||{}).uiHidden !== 'true'" @click="doSortField(meta)" :class="getClass">
        {{ showLabel(meta) }}
        <i v-if="sortable" :class="getSortClass" />
    </th>
    <fragment v-else>
        <iv-inner-table-header :sortBy="sortBy" :prefix="getPrefix(meta)" @input="doByPass($event)" :key="key" v-for="(inf, key) in meta.type.result" :meta="inf" :keyUiLabel="keyUiLabel" />
    </fragment>
</template>

<script lang="ts">
/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, IMetaResult, Prop, Component, IInputSortingBaseUnit, Model, ESort, Emit } from "@/../core";
@Component
export class TableHeader extends Vue {
    @Prop({
        type: String,
        required: true
    })
    keyUiLabel: string;

    @Prop({
        type: Object,
        required: true
    })
    meta: IMetaResult;

    @Prop({
        type: String,
        required: false
    })
    prefix: string;

    @Model('input', {
        required: true
    })
    sortBy: IInputSortingBaseUnit;
    sortable: boolean = false;
    private created() {
        this.sortable = this.meta.attrs && this.meta.attrs.uiSortable!=null;
    }
    private get getClass() {
        return this.sortable ? "sortable" : "";
    }
    private get getSortClass() {
        let classes = ["fa", "fa-sort", "icon-sortable"];
        if (this.sortBy.field == this.getPrefix(this.meta)) {
            classes.push("sorted");
            if (this.sortBy.order == ESort.Ascending) classes.push("fa-sort-asc");
            else classes.push("fa-sort-desc");
        }
        return classes.join(" ");
    }
    private getPrefix(meta) {
        return `${this.prefix ? this.prefix+'.' : ''}${meta.name}`;
    }

    private doSortField(meta) {
        if (!this.sortable) return;
        let field = this.getPrefix(meta);
        let order = field == this.sortBy.field ? this.sortBy.order : null;
        order = order == ESort.Ascending ? ESort.Descending :
                order == ESort.Descending ? null : ESort.Ascending;
        let result = order == null ? {} : { field, order };
        return this.$emit('input', result);
    }
    @Emit('input')
    private doByPass(event) {
        return event;
    }

    private showLabel(inf: IMetaResult): string {
        let name = (inf.attrs || {})[this.keyUiLabel] || inf.name;
        return name;
    }

}
Vue.component('iv-inner-table-header', TableHeader);
export default TableHeader;
</script>
<style lang="scss" scoped>
table td,
table th {
  border: 1px solid silver;
  white-space: nowrap;
}

.sortable {
    cursor: pointer;
}

.icon-sortable {
    margin-left: 2px;
    color: #BBB;

    &.sorted {
        color: black;
    }
}
</style>
