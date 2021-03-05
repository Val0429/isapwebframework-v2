<template>
    <transition v-if="type === 'single'" :name="animeName" class="direction-slider" @before-enter="beforeEnter" @before-leave="beforeLeave">
        <slot />
    </transition>
    <transition-group v-else :name="animeName" class="direction-slider" tag="div" @before-enter="beforeEnter" @before-leave="beforeLeave">
        <template v-for="(_, slot) of $slots">
            <slot :name="slot" />
        </template>
    </transition-group>
</template>


<script src="./direction-slide.vue.ts" />

<style lang="scss" scoped>
$animation-duration: .5s;

/// direction slider ////////////////
.direction-slider {
    position: relative;
}

*, /deep/ {
    .direction-slide-first-leave-active,
    .direction-slide-first-enter-active,
    .direction-slide-second-leave-active,
    .direction-slide-second-enter-active {
        transition: $animation-duration;
        position: relative;
        z-index: 0;  
    }
    .direction-slide-first-leave-active,
    .direction-slide-second-leave-active {
        position: fixed !important;
        pointer-events: none;
    }
    .direction-slide-first-enter {
        transform: translate(100%, 0);
    }
    .direction-slide-first-leave-to {
        transform: translate(-100%, 0);
        opacity: 0;
    }
    .direction-slide-second-enter {
        transform: translate(-100%, 0);
    }
    .direction-slide-second-leave-to {
        transform: translate(100%, 0);
        opacity: 0;
    }
}
//////////////////////////////////////

</style>