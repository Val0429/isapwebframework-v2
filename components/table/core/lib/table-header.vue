<template>
    <th v-if="typeof meta.type === 'string' && (meta.attrs||{}).uiHidden !== 'true'">
        {{ showLabel(meta) }}
    </th>
    <fragment v-else>
        <iv-inner-table-header :key="key" v-for="(inf, key) in meta.type.result" :meta="inf" :keyUiLabel="keyUiLabel" />
    </fragment>
</template>

<script lang="ts">
import { Vue, IMetaResult, Prop, Component } from "@/../core";
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

    private showLabel(inf: IMetaResult): string {
        let name = (inf.attrs || {})[this.keyUiLabel] || inf.name;
        return name;
    }
}
Vue.component('iv-inner-table-header', TableHeader);
export default TableHeader;
</script>
