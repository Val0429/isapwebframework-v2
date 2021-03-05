<template>
    <iv-auto-transition type="iv-fade-slide" :step="step()">
        <element :key="$theme.name" :is="$theme" />
    </iv-auto-transition>
</template>

<script lang="ts" src="./index.vue.ts" />
