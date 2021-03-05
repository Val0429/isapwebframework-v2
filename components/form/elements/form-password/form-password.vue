<template>
    <iv-form-string
        v-bind="$attrs"
        v-bind:label="label"
        v-bind:value="value"
        v-on="$listeners"
        type="password"
        v-bind:placeholder="placeholder"
        :invalid="invalid"
        />
</template>

<script lang="ts" src="./form-password.vue.ts" />
