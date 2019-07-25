<template>
    <div v-if="isAllowed">
        <slot />
    </div>
</template>

<script lang="ts" src="./permission.vue.ts" />