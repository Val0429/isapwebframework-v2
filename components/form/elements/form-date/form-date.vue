<template>
    <iv-form-datetime
        v-bind="$attrs"
        :label="label"
        :value="value"
        @input="inputDate"
        :type="type"
        :invalid="invalid"
    />
</template>

<script lang="ts" src="./form-date.vue.ts" />