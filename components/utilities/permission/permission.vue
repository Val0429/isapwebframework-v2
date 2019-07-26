<template>
    <div v-if="isAllowed">
        <slot />
    </div>
    <div v-else-if="$slots.else">
        <slot name="else" />
    </div>
</template>

<script lang="ts" src="./permission.vue.ts" />