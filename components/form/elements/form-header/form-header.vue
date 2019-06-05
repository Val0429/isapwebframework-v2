<template>
    <div class="host">
        <h4 class="host-text">
            {{ this.label }}
        </h4>
    </div>
</template>

<script lang="ts" src="./form-header.vue.ts" />

<style lang="scss" scoped>
.host {
    padding: 0 1rem;
}
.host:not(:first-child) {
    margin-top: 1.5rem;
}
.host-text {
    padding-bottom: 0.6rem;
}
</style>

