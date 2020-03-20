<template>
    <b-form-group
        v-bind:id="'form-group-' + _uid"
        v-bind:label="label"
        v-bind:label-for="'input-' + _uid"
        >
        <b-row>
            <b-col
                v-if="type === 'date' || type === 'datetime'"
                v-bind:sm="type === 'date' ? 12 : 8">
                <!-- <b-form-input
                    type="date"
                    v-bind="{ ...$attrs, class: undefined }"
                    v-bind:id="'input-' + _uid"
                    v-bind:value="inputDate"
                    v-on:input="dateChanged($event)"
                    /> -->
                <b-form-datepicker
                    v-bind="{ ...$attrs, class: undefined }"
                    v-bind:id="'input-' + _uid"
                    v-bind:value="inputDate"
                    v-on:input="dateChanged($event)"
                    :placeholder="_('mb_Date_Not_Selected')"
                    />
                <b-form-invalid-feedback v-if="(type ==='date' || type === 'datetime') && this.invalid">
                    {{ this.invalid }}
                </b-form-invalid-feedback>
            </b-col>
            <b-col
                v-if="type === 'datetime' || type === 'time'"
                v-bind:sm="type === 'time' ? 12 : 4">
                <!-- <b-form-input
                    type="time"
                    step="1"
                    v-bind="$attrs"
                    v-bind:id="'input-' + _uid + '-2'"
                    v-bind:value="inputTime"
                    v-on:input="timeChanged($event)"
                    /> -->
                <b-form-timepicker
                    v-bind="{ ...$attrs, class: undefined }"
                    v-bind:id="'input-' + _uid + '-2'"
                    v-bind:value="inputTime"
                    v-on:input="timeChanged($event)"
                    :placeholder="_('mb_Time_Not_Selected')"
                    />
                <b-form-invalid-feedback v-if="(type ==='time') && this.invalid">
                    {{ this.invalid }}
                </b-form-invalid-feedback>
            </b-col>
        </b-row>

    </b-form-group>

</template>

<script lang="ts" src="./form-datetime.vue.ts" />

<style type="scss" scoped>
* /deep/ label.form-control {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}
* /deep/ label.form-control:hover {
    overflow: visible !important;
}
</style>