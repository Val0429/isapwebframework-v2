<template>
    <b-form-group
        v-bind:id="'form-group-' + _uid"
        v-bind:label="label"
        v-bind:label-for="'input-' + _uid"
        >

        <iv-cell-switch class="mx-1"
            v-bind="$attrs"
            v-on="$listeners"
            :value="value"
            :size="size"
            :variant="variant"
            />

        <b-form-invalid-feedback v-if="this.invalid">
            {{ this.invalid }}
        </b-form-invalid-feedback>
    </b-form-group>
</template>

<script lang="ts" src="./form-switch.vue.ts" />
