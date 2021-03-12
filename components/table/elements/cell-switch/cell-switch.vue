<template>
    <label :class="classList">
        <input
            type="checkbox"
            class="switch-input form-check-input"
            v-bind="{ ...$attrs, class: undefined }" 
            :checked="value"
            @change="$emit('input', $event.target.checked)"
        />
        <template v-if="data['label-on'] || data['label-off']">
            <span
                :data-checked="data['label-on']"
                :data-unchecked="data['label-off']"
                class="switch-slider">
            </span>
        </template>
        <template v-else>
            <span class="switch-slider"></span>
        </template>
    </label>
</template>


<script lang="ts" src="./cell-switch.vue.ts" />


<style lang="css" scoped>
label {
    vertical-align: middle;
}
</style>

