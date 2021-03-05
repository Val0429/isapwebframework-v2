<template>
    <b-form-group
        v-bind:id="'form-group-' + _uid"
        v-bind:label="label"
        v-bind:label-for="'input-' + _uid"
        >
        <b-form-input
            v-bind="{ ...$attrs, class: undefined }"
            v-bind:id="'input-' + _uid"
            v-bind:value="value"
            v-bind:placeholder="placeholder"
            v-on="$listeners"
            />

        <b-form-invalid-feedback v-if="this.invalid">
            {{ this.invalid }}
        </b-form-invalid-feedback>
    </b-form-group>
</template>

<script lang="ts" src="./form-string.vue.ts" />

<style lang="scss" scoped>
.form-control {
    border-radius: 4px;
}
</style>

