<template>
    <VuePerfectScrollbar ref="scrollbar" class="scroll-area" :settings="psSettings">
        <div class="scroll-container" ref="container">
            <slot />
        </div>
    </VuePerfectScrollbar>
</template>

<script lang="ts" src="./scrollbar.vue.ts" />

<style lang="css" scoped>
.scroll-area {
    position: relative;
}
.scroll-container {
    padding-top: 1px;
    margin-top: -1px;
    padding-bottom: 1px;
    margin-bottom: 1px;
}
</style>