<template>

    <iv-auto-transition type="iv-fade-slide">
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
    // CoreUI Icons Set
    @import '~@coreui/icons/css/coreui-icons.min.css';
    /* Import Font Awesome Icons Set */
    $fa-font-path: '~font-awesome/fonts/';
    @import '~font-awesome/scss/font-awesome.scss';
    /* Import Simple Line Icons Set */
    $simple-line-font-path: '~simple-line-icons/fonts/';
    @import '~simple-line-icons/scss/simple-line-icons.scss';
    /* Import Flag Icons Set */
    @import '~flag-icon-css/css/flag-icon.min.css';
    /* Import Bootstrap Vue Styles */
    @import '~bootstrap-vue/dist/bootstrap-vue.css';
    // Import Main styles for this application
    @import 'assets/scss/style';
</style>
