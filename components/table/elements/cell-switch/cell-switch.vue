<template>
    <c-switch v-if="value !== null && value !== undefined" class="mx-1" color="primary" variant="3d"
        :modelChecked="value" disabled
        />
</template>


<script lang="ts" src="./cell-switch.vue.ts" />


<style lang="css" scoped>
/deep/ .switch-input:disabled ~ .switch-slider {
    cursor: default;
}
label {
    vertical-align: middle;
}
</style>

