<template>
    <b-form-group
        v-bind:id="'form-group-' + _uid"
        v-bind:label="label"
        v-bind:label-for="id"
    >
        <select
            v-bind="$attrs"
            v-bind:id="id"
            style="width: 100%"
            v-bind:multiple="multiple"
        >
            <option />
            <option
                :key="index" v-for="(data, index) in options" :value="data.id"
                :selected="typeof value === 'object' ? (value.indexOf(data.id)>=0 ? true : false) : value === data.id"
                >
                {{ data.text }}
            </option>
        </select>

        <b-form-invalid-feedback v-if="this.invalid">
            {{ this.invalid }}
        </b-form-invalid-feedback>
    </b-form-group>
</template>

<script lang="ts" src="./form-selection.vue.ts" />

<style lang="scss">
.select2-container--open {
    z-index: 10000;
}
</style>

