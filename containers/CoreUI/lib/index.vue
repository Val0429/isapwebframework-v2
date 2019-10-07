<template>

    <iv-auto-transition class="theme-coreui" type="iv-fade-slide">
        <DefaultContainer v-if="!thisRouter.disableContainer" key="1">
            <template v-for="(_, slot) of $slots">
                <slot :name="slot" />
            </template>
            <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="scope" />
            </template>
        </DefaultContainer>

        <router-view v-else key="2" />
    </iv-auto-transition>

</template>


<script src="./index.vue.ts"></script>


<style lang="scss">
@import 'assets/scss/style';
</style>
