<template>
    <b-form-group
        v-bind:id="'form-group-' + _uid"
        v-bind:label="label"
        v-bind:label-for="'input-' + _uid"
    >
        <b-form-file
            :accept="accept"
            v-bind="$attrs"
            v-bind:value="innateValue"
            v-bind:placeholder="placeholder || _('mb_NoFileChosen')"
            v-bind:drop-placeholder="dropPlaceholder"
            v-bind:multiple="multiple"
            v-on:input="$emit('input', $event)"
        />

        <b-form-invalid-feedback v-if="this.invalid">
            {{ this.invalid }}
        </b-form-invalid-feedback>
    </b-form-group>
</template>

<script lang="ts" src="./form-file.vue.ts" />

<style lang="css" scoped>
.form-group >>> div * {
    border-radius: 4px;
}
</style>

<style lang="css">
.custom-file-input:lang(en) ~ .custom-file-label::after {
    position: absolute;
    content: var(--browse-text) !important;
}
.custom-file-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>