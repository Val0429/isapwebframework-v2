<template>
    <b-form-group
        v-bind:id="'form-group-' + _uid"
        v-bind:label="label"
        v-bind:label-for="'input-' + _uid"
        >
        <b-row>
            <b-col
                v-if="type === 'date' || type === 'datetime'"
                v-bind:sm="type === 'date' ? 6 : 6">
                <b-form-datepicker
                    v-bind="{ ...$attrs, class: undefined }"
                    v-bind:id="'input-' + _uid"
                    v-bind:value="inputDate"
                    v-on:input="dateChanged($event)"
                    :placeholder="$attrs.placeholder || _('mb_Date_Not_Selected')"
                    
                    :no-close-on-select="true"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    :label-reset-button="_('wb_Reset')"
                    :label-close-button="_('wb_Close')"
                    :label-no-date-selected="_('mb_Date_Not_Selected')"
                    :label-no-time-selected="_('mb_Time_Not_Selected')"
                    label-help=""

                    reset-button
                    close-button
                    />
                <b-form-invalid-feedback v-if="(type ==='date' || type === 'datetime') && this.invalid">
                    {{ this.invalid }}
                </b-form-invalid-feedback>
            </b-col>
            <b-col
                v-if="type === 'datetime' || type === 'time'"
                v-bind:sm="type === 'time' ? 6 : 6">
                <b-form-timepicker
                    v-bind="{ ...$attrs, class: undefined }"
                    v-bind:id="'input-' + _uid + '-2'"
                    v-bind:value="inputTime"
                    v-on:input="timeChanged($event)"
                    :placeholder="$attrs.placeholder || _('mb_Time_Not_Selected')"

                    :no-close-on-select="true"
                    :label-reset-button="_('wb_Reset')"
                    :label-close-button="_('wb_Close')"
                    :label-no-date-selected="_('mb_Date_Not_Selected')"
                    :label-no-time-selected="_('mb_Time_Not_Selected')"
                    label-help=""

                    reset-button
                    close-button
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