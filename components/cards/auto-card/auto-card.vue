<template>
    <iv-card :label="label" :data="data" :noBodyPadding="!!thisTab">
        <!-- Pass on all named slots -->
        <slot v-for="slot in excludeKeys($slots, 'default', 'footer')" :name="slot" :slot="slot"/>

        <!-- Pass on all scoped slots -->
        <template v-for="slot in excludeKeys($scopedSlots, 'default', 'footer')" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope"/></template>

        <template name="default">
            <iv-v-node
                @mounted="doMounted"
                ref="node"
                :node="$slots.default || $scopedSlots.default"
                />
        </template>

        <template #footer>
            <slot name="footer">
                <template v-if="isMounted && (thisForm || thisStep || thisTab)">
                    <template v-if="thisForm">
                        <b-button size="lg" v-bind="thisForm.submitBindings.$attrs" v-on="thisForm.submitBindings.$listeners">{{ _("wb_Submit") }}</b-button>
                        <b-button size="lg" v-bind="thisForm.resetBindings.$attrs" v-on="thisForm.resetBindings.$listeners">{{ _("wb_Reset") }}</b-button>
                    </template>

                    <template v-else-if="thisStep">
                        <b-button size="lg" v-if="thisStep.currentStep !== 1" v-bind="thisStep.prevBindings(thisStep.currentStep).$attrs" v-on="thisStep.prevBindings(thisStep.currentStep).$listeners">{{ thisStep.prevBindings(thisStep.currentStep).$attrs.label }}</b-button>
                        <b-button size="lg" v-bind="thisStep.nextBindings(thisStep.currentStep).$attrs" v-on="thisStep.nextBindings(thisStep.currentStep).$listeners">{{ thisStep.nextBindings(thisStep.currentStep).$attrs.label }}</b-button>
                    </template>

                    <template v-else-if="thisTab">
                        <template v-if="thisTab.thisForm">
                            <b-button size="lg" v-bind="thisTab.thisForm.submitBindings.$attrs" v-on="thisTab.thisForm.submitBindings.$listeners">{{ _("wb_Submit") }}</b-button>
                            <b-button size="lg" v-bind="thisTab.thisForm.resetBindings.$attrs" v-on="thisTab.thisForm.resetBindings.$listeners">{{ _("wb_Reset") }}</b-button>
                        </template>

                        <template v-else-if="thisTab.thisStep">
                            <b-button size="lg" v-if="thisTab.thisStep.currentStep !== 1" v-bind="thisTab.thisStep.prevBindings(thisTab.thisStep.currentStep).$attrs" v-on="thisTab.thisStep.prevBindings(thisTab.thisStep.currentStep).$listeners">{{ thisTab.thisStep.prevBindings(thisTab.thisStep.currentStep).$attrs.label }}</b-button>
                            <b-button size="lg" v-bind="thisTab.thisStep.nextBindings(thisTab.thisStep.currentStep).$attrs" v-on="thisTab.thisStep.nextBindings(thisTab.thisStep.currentStep).$listeners">{{ thisTab.thisStep.nextBindings(thisTab.thisStep.currentStep).$attrs.label }}</b-button>
                        </template>
                    </template>

                </template>
            </slot>
        </template>
    </iv-card>
</template>

<script lang="ts" src="./auto-card.vue.ts" />

<style lang="scss" scoped>
.no-padding {
    /deep/ .card-body {
        padding: 0 !important;
    }
}
</style>