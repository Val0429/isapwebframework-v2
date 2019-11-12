<template>
    <b-form-group
        v-bind:id="'form-group-' + _uid"
        v-bind:label="label"
        v-bind:label-for="id"
        :class="{ 'form-selection': true, 'is-invalid': $attrs.state === false }"
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
                :selected="typeof value === 'object' ? (value.indexOf(data.id)>=0 ? true : false) : value == data.id"
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

.select2-selection__rendered > .select2-search--inline:only-child,
.select2-selection__rendered > .select2-search--inline:only-child > .select2-search__field {
    width: 100% !important;
}
</style>

<style lang="scss" scoped>
.is-invalid /deep/ .select2-selection {
    border-color: #e26a6a;
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23e26a6a' viewBox='-2 -2 7 7'%3e%3cpath stroke='%23e26a6a' d='M0 0l3 3m0-3L0 3'/%3e%3ccircle r='.5'/%3e%3ccircle cx='3' r='.5'/%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E");
    background-repeat: no-repeat;
    background-position: right;
    background-position: center right calc(0.375em + 0.1875rem);
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.form-selection.is-invalid /deep/ .invalid-feedback {
    display: block;
}
</style>