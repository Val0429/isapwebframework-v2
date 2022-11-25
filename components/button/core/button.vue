<template>
    <b-button :variant="variant" :size="size" :class="classWithIcon"
        v-bind="{ ...$attrs }"
        @click="click"
        @dblclick="dblclick"
        >
        <iv-icon v-if="icon" :variant="variant" :size="size" :icon="icon" />

        <template v-if="$slots.default">
            <span><slot /></span>
        </template>
        <fragment v-else-if="label">
            <span>{{ label }}</span>
        </fragment>
    </b-button>
</template>


<script lang="ts" src="./button.vue.ts" />

<style lang="scss" scoped>
i:not(:last-child) {
    margin-right: 0.5rem !important;
}
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
.has-content.with-icon-lg::after {
    content: "";
    margin-left: 0.4rem;
}
.has-content.with-icon-md::after {
    content: "";
    margin-left: 0.3rem;
}
.has-content.with-icon-sm::after {
    content: "";
    margin-left: 0.2rem;
}
</style>
