<template>
    <iv-form-string
        v-bind="$attrs"
        v-bind:label="label"
        v-bind:value="value"
        v-on="$listeners"
        v-bind:placeholder="placeholder"
        :invalid="invalid"
        v-ipfilter
    />    
</template>

<script lang="ts" src="./form-ip.vue.ts" />
