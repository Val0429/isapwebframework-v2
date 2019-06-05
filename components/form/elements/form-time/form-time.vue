<template>
    <iv-form-datetime
        v-bind="$attrs"
        :label="label"
        :value="value"
        @input="$emit('input', $event)"
        :type="type"
        :invalid="invalid"
        />
</template>

<script lang="ts" src="./form-time.vue.ts" />

