<template>
    <iv-form-string
        v-bind="$attrs"
        v-bind:label="label"
        v-bind:value="getValue()"
        v-on:input="$emit('input', +$event)"
        v-bind:type="type"
        v-bind:placeholder="placeholder"
        :invalid="invalid"
        v-bind:min="min"
        v-bind:max="max"
    />
</template>

<script lang="ts" src="./form-number.vue.ts" />
