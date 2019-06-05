<template>

    <iv-toolbox-element-base
        v-bind="$attrs"
        :title="_('wb_View')"
        icon="fa isap-icon isap-icon-view isap-toolbox-icon"
        v-show="visible"
        :variant="variant"
        :size="size"
        :disabled="disabled"
        @click="click"
    >

        <!-- Pass on all named slots -->
        <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>

        <!-- Pass on all scoped slots -->
        <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope"/></template>

    </iv-toolbox-element-base>

</template>
    
<script lang="ts" src="./toolbox-view.vue.ts" />
