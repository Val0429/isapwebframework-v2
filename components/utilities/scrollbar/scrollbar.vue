<template>
    <VuePerfectScrollbar class="scroll-area" :settings="psSettings">
        <slot />
    </VuePerfectScrollbar>
</template>

<script lang="ts" src="./scrollbar.vue.ts" />

<style lang="css" scoped>
.scroll-area {
    position: relative;
}
</style>