<template>
    <b-button :variant="variant" :size="size" :class="classWithIcon"
        v-bind="{ ...$attrs }"
        v-on:click="$emit('click', $event)"
        >
        <i v-if="icon" :class="classIcon" />

        <template v-if="$slots.default">
            <slot />
        </template>
        <fragment v-else>
            {{ label }}
        </fragment>
    </b-button>
</template>


<script lang="ts" src="./button.vue.ts" />

<style lang="scss" scoped>
i {
    margin-right: 0.2rem;
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
