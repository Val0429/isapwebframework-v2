<template>
    <div v-if="isAllowed">
        {{ isAllowed }}
        <slot />
    </div>
</template>

<script lang="ts" src="./permission.vue.ts" />