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
// i:not(:last-child) {
//     margin-right: 0.5rem !important;
// }
.btn {
    white-space: nowrap;
    padding: .25rem .75rem;
    line-height: 1;
    border-radius: 0.25rem;

    i {
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
        vertical-align: middle;
        content: "";
        background: no-repeat center center;
        background-size: 100% 100%;
    }
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

.has-content.with-icon-lg > i {
    margin-right: 0.4rem;
}
.has-content.with-icon-md > i {
    margin-right: 0.3rem;
}
.has-content.with-icon-sm > i {
    margin-right: 0.2rem;
}
</style>
