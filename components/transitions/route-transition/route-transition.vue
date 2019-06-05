<template>
    <iv-auto-transition :step="step">
        <div v-if="isChildRoute()" key="route">
            <router-view />
        </div>

        <template v-else>
            <slot v-for="(_, slot) of $slots" :name="slot" />
        </template>
    </iv-auto-transition>
</template>


<script src="./route-transition.vue.ts" />

