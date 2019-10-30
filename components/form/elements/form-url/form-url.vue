<template>
    <iv-form-string
        v-bind="$attrs"
        v-bind:label="label"
        v-bind:value="value"
        v-on:input="$emit('input', $event)"
        v-bind:placeholder="placeholder"
        v-bind:invalid="invalid"
        v-urlfilter
    />    
</template>

<script lang="ts" src="./form-url.vue.ts" />
