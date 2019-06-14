<template>
    <b-form-group
        v-bind:id="'form-group-' + _uid"
        v-bind:label="label"
        v-bind:label-for="'input-' + _uid"
        >

        <label class="form-label">{{ value }}</label>

    </b-form-group>
</template>

<script lang="ts" src="./form-label.vue.ts" />


<style lang="scss" scoped>
.form-label {
    display: block;
    padding: 6px 12px;
    background-color: $light;
    border-radius: 4px;
    border: 1px solid rgb(209, 212, 215);
    min-height: 2.2rem;
    margin-bottom: 0 !important;
}
</style>

