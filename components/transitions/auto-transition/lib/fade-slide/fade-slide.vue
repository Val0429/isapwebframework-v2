<template>
    <transition v-if="type === 'single'" :name="animeName" class="fade-slider" @before-enter="beforeEnter" @before-leave="beforeLeave">
        <slot />
    </transition>
    <transition-group v-else :name="animeName" class="fade-slider" tag="div" @before-enter="beforeEnter" @before-leave="beforeLeave">
        <template v-for="(_, slot) of $slots">
            <slot :name="slot" />
        </template>
    </transition-group>
</template>


<script src="./fade-slide.vue.ts" />

<style lang="scss" scoped>
$animation-duration: .8s;

.fade-slider {
    position: relative;
}

*, /deep/ {
    .fade-slide-leave-active,
    .fade-slide-enter-active {
        transition: opacity $animation-duration;
        position: relative;
        z-index: 0;  
    }
    .fade-slide-leave-active {
        position: fixed !important;
        pointer-events: none;
    }
    .fade-slide-enter {
        opacity: 0;
    }
    .fade-slide-leave-to {
        opacity: 0;
    }
}
//////////////////////////////////////

</style>