<template>
    <b-button :variant="variant" :size="size" :class="classWithIcon">
        <i v-if="icon" :class="classIcon" />
        {{ label }}
    </b-button>
</template>


<script lang="ts" src="./button.vue.ts" />

<style lang="scss" scoped>
.btn {
    white-space: nowrap;
}
.icon-lg {
    font-size: 1.09375rem;
}
.icon-md {
    font-size: inherit;
}
.icon-sm {
    font-size: 0.76563rem;
}
.with-icon-lg::after {
    content: "";
    margin-left: 0.4rem;
}
.with-icon-md::after {
    content: "";
    margin-left: 0.3rem;
}
.with-icon-sm::after {
    content: "";
    margin-left: 0.2rem;
}
</style>
