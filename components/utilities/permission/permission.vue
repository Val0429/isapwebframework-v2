<template>
    <fragment v-if="isAllowed()">
        <slot />
    </fragment>
    <fragment v-else-if="$slots.else">
        <slot name="else" />
    </fragment>
</template>

<script lang="ts" src="./permission.vue.ts" />