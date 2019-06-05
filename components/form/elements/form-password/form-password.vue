<template>
    <iv-form-string
        v-bind="$attrs"
        v-bind:label="label"
        v-bind:value="value"
        v-on:input="$emit('input', $event)"
        type="password"
        v-bind:placeholder="placeholder"
        :invalid="invalid"
        />
</template>

<script lang="ts" src="./form-password.vue.ts" />
