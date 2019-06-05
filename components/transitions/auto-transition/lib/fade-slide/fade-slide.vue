<template>
    <transition-group :name="animeName" class="fade-slider" tag="div" @before-enter="beforeEnter" @before-leave="beforeLeave">
        <template v-for="(_, slot) of $slots">
            <slot :name="slot" />
        </template>
    </transition-group>
</template>


<script src="./fade-slide.vue.ts" />

<style lang="scss">
$animation-duration: .5s;

/// direction slider ////////////////
.fade-slider {
    position: relative;

    > .fade-slide-leave-active,
    > .fade-slide-enter-active {
        transition: $animation-duration;
        position: relative;
        pointer-events: none;
        z-index: 0;  
    }
    > .fade-slide-leave-active {
        position: absolute !important;
        left: 0; top: 0;
        z-index: 10000;
    }
    > .fade-slide-enter {
        opacity: 0;
    }
    > .fade-slide-leave-to {
        opacity: 0;
    }
}
//////////////////////////////////////

</style>