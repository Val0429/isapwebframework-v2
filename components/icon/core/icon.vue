<template>
    <i v-bind="{ ...$attrs }" :class="classIcon" @click="click" />
</template>


<script lang="ts" src="./icon.vue.ts" />

<style lang="scss" scoped>
.icon-lg {
    font-size: 1.09375rem;
}
.icon-md {
    font-size: inherit;
}
.icon-sm {
    font-size: 0.76563rem;
}
</style>
