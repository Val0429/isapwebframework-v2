<template>
    <b-form-group
        v-bind:id="'form-group-' + _uid"
        v-bind:label="label"
        v-bind:label-for="'input-' + _uid"
        >

        <c-switch class="mx-1" color="primary" variant="3d"
            v-bind="$attrs"
            :modelChecked="value"
            v-on:change="$emit('input', $event)"
            />

        <b-form-invalid-feedback v-if="this.invalid">
            {{ this.invalid }}
        </b-form-invalid-feedback>
    </b-form-group>
</template>

<script lang="ts" src="./form-switch.vue.ts" />
