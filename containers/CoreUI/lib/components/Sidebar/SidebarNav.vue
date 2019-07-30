<template>
    <nav v-if="hasSlotDefault" class="sidebar-nav">
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-y="scrollHandle">
            <ul class="nav">
                <slot></slot>
            </ul>
        </VuePerfectScrollbar>
    </nav>
</template>

<script lang="ts">
/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    components: { VuePerfectScrollbar }
})
export default class SidebarNav extends Vue {
    private psSettings() {
      // ToDo: find better rtl fix
        return {
            maxScrollbarLength: 200,
            minScrollbarLength: 40,
            suppressScrollX: getComputedStyle(document.querySelector('html')).direction !== 'rtl',
            wheelPropagation: false,
            interceptRailY: styles => ({ ...styles, height: 0 })
        }
    }
    private hasSlotDefault() {
        return !!this.$slots.default;
    }
    private scrollHandle(evt) {
        /// console.log(evt)
    }
}
</script>

<style scoped lang="css">
  .scroll-area {
    position: absolute;
    height: 100%;
    margin: auto;
  }
</style>
