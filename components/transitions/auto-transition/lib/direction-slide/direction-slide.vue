<template>
    <transition-group :name="animeName" class="direction-slider" tag="div" @before-enter="beforeEnter" @before-leave="beforeLeave">
        <template v-for="(_, slot) of $slots">
            <slot :name="slot" />
        </template>
    </transition-group>
</template>


<script src="./direction-slide.vue.ts" />

<style lang="scss">
$animation-duration: .5s;

/// direction slider ////////////////
.direction-slider {
    position: relative;

    > .direction-slide-first-leave-active,
    > .direction-slide-first-enter-active,
    > .direction-slide-second-leave-active,
    > .direction-slide-second-enter-active {
        transition: $animation-duration;
        position: relative;
        z-index: 0;  
    }
    > .direction-slide-first-leave-active,
    > .direction-slide-second-leave-active {
        position: absolute !important;
        pointer-events: none;
        left: 0; top: 0;
        z-index: 10000;
    }
    > .direction-slide-first-enter {
        transform: translate(100%, 0);
    }
    > .direction-slide-first-leave-to {
        transform: translate(-100%, 0);
        opacity: 0;
    }
    > .direction-slide-second-enter {
        transform: translate(-100%, 0);
    }
    > .direction-slide-second-leave-to {
        transform: translate(100%, 0);
        opacity: 0;
    }    
}
//////////////////////////////////////

</style>