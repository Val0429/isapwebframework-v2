<template>
    <element :is="type" :step="step">
        <template v-for="(_, slot) of $slots">
            <slot :name="slot" />
        </template>
    </element>
</template>


<script src="./auto-transition.vue.ts" />