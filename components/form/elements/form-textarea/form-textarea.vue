<template>
    <b-form-group
        v-bind:id="'form-group-' + _uid"
        v-bind:label="label"
        v-bind:label-for="'input-' + _uid"
    >
        <b-form-textarea
            v-bind="$attrs"
            v-bind:id="'input-' + _uid"
            v-bind:value="value"
            v-bind:placeholder="placeholder"
            v-on="$listeners"
            v-bind:rows='3'
            v-bind:no-resize='false'
        />

        <b-form-invalid-feedback v-if="this.invalid">
            {{ this.invalid }}
        </b-form-invalid-feedback>
    </b-form-group>
</template>

<script lang="ts" src="./form-textarea.vue.ts" />