<template>
    <iv-form-string
        v-bind="$attrs"
        v-bind:label="label"
        v-bind:value="value"
        v-bind:placeholder="placeholder"
        :invalid="invalid"
        v-licensefilter
        v-on="$listeners"
    />    
</template>

<script lang="ts" src="./form-license.vue.ts" />

