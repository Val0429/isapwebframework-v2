<template>
    <fragment>
        <template v-if="value instanceof Date">
            {{ value.toLocaleString() }}
        </template>
        <template v-else-if="typeof value === 'object'">
            {{ JSON.stringify(value) }}
        </template>
        <template v-else-if="typeof value === 'boolean'">
            {{ value ? _("wb_Yes") : _("wb_No") }}
        </template>
        <template v-else>
            {{ value }}
        </template>
    </fragment>
</template>


<script lang="ts" src="./cell-string.vue.ts" />
