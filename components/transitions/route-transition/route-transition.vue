<template>
    <iv-auto-transition :step="step" type="iv-direction-slide">
        <div v-if="isChildRoute()" key="route">
            <iv-fade-slide>
                <router-view />
            </iv-fade-slide>
        </div>

        <template v-else>
            <slot v-for="(_, slot) of $slots" :name="slot" />
        </template>
    </iv-auto-transition>
</template>


<script src="./route-transition.vue.ts" />

