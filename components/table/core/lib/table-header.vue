<template>
    <th v-if="typeof meta.type === 'string' && (meta.attrs||{}).uiHidden !== 'true'" @click="sortThisField(meta)" :class="getClass">
        {{ showLabel(meta) }} 
        <template v-if="sortable">
            &#8597;
        </template>
    </th>
    <fragment v-else>
        <iv-inner-table-header v-model="sortBy" :key="key" v-for="(inf, key) in meta.type.result" :meta="inf" :keyUiLabel="keyUiLabel" />
    </fragment>
</template>

<script lang="ts">
/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, IMetaResult, Prop, Component, IInputSortingBaseUnit, Model, ESort } from "@/../core";
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
    
    @Model('input', {        
        required: true
    })    
    sortBy:IInputSortingBaseUnit;
    sortable=false;
    created(){
        this.sortable = this.meta.attrs.uiSortAble==="true" ;
    }
   get getClass(){       
       let className = this.sortBy.field == this.meta.name ? (this.sortBy.order == ESort.Ascending ? "headerSortUp" : "headerSortDown") : "";       
       //console.log("className", className);
       return `${className} ${this.sortable ? "sortable" : ""}`;
   }
    sortThisField(meta){
        if(!this.sortable)return;
        //console.log("sortBy", this.sortBy);
        let order=ESort.Ascending;
        if(meta.name==this.sortBy.field){            
            order = this.sortBy.order == ESort.Ascending ? ESort.Descending : ESort.Ascending;
        }
        let input = {order, field : meta.name};  
        //console.log("emit", input);
        this.$emit("input", input);
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
}

.headerSortDown:after,
.headerSortUp:after {
  content: ' ';
  position: relative;
  left: 2px;
  border: 8px solid transparent;
}

.headerSortDown:after {
  top: 10px;
  border-top-color: silver;
}

.headerSortUp:after {
  bottom: 15px;
  border-bottom-color: silver;
}

.headerSortDown,
.headerSortUp {
  padding-right: 10px;  
}
.sortable{
    cursor: pointer;    
}

</style>