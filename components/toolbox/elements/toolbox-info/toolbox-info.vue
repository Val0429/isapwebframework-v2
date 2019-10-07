<template>

    <iv-toolbox-custom
        v-bind="$attrs"
        :label="_('wb_Info')"
        icon="isap-icon-detial"
        :visible="visible"
        :variant="variant"
        :size="size"
        :disabled="disabled"
        @click="click"
        >
        <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>
        <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope"/></template>
    </iv-toolbox-custom>

</template>
    
<script lang="ts" src="./toolbox-info.vue.ts" />
