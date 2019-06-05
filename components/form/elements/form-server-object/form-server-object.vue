<template>
    <b-form-group
        v-bind:id="'form-group-' + _uid"
        v-bind:label="label"
        v-bind:label-for="'input-' + _uid"
        >
        <iv-table
            v-bind="{ ...$attrs, class: undefined }"
            :server="server"
            :interface="interface"
            :selectable="selectable"
            :multiple="multiple"
            :value="value"
            :pageSize="5"
            @selected="input"
            >
                <template v-for="(_, slot) of $slots">
                    <slot :name="slot" />
                </template>
                <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
                    <slot :name="slot" v-bind="scope" />
                </template>
        </iv-table>

        <b-form-invalid-feedback v-if="this.invalid">
            {{ this.invalid }}
        </b-form-invalid-feedback>
    </b-form-group>
</template>

<script lang="ts" src="./form-server-object.vue.ts" />

<style lang="scss" scoped>
* /deep/ .table {
    border: 1px solid #cecece;
    border-radius: 50px !important;
}
</style>

