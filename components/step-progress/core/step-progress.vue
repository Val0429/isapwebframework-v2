<template>
<div>
    <div :class="{ 'step-area': true, 'has-title': hasTitle() }">
        <template v-for="(step, index) in steps">
            <SCircle :key="index" class="circle" :current="step === currentStep" :variant="step === currentStep ? 'info' : 'primary'" :label="step" :done="done || step < currentStep">
                <slot :name="step+'-title'" />
            </SCircle>
            <div v-if="steps !== step" :class="{line: true, 'bg-success':done||step<currentStep, 'bg-primary':step>=currentStep}" :key="'line-'+index" style="width: 100%; height: 8px" />
        </template>
    </div>

    <iv-auto-transition :step="currentStep">
        <iv-v-node v-for="(step) in steps" :key="step"
            :ref="step"
            v-show="step === currentStep"
            :node="$slots[step+''] || $scopedSlots[step+'']"
            />
    </iv-auto-transition>
</div>
</template>


<script src="./step-progress.vue.ts" />

<style lang="scss" scoped>
.step-area {
    display: flex;
    justify-content: space-between;
    margin: 10px 30px 30px 30px;
    align-items: center;
}

.step-area > * {
    @include transition(all .3s linear);
}
.has-title {
    margin-bottom: 60px;
}
.circle {
    z-index: 10;
}
.line {
    margin: 0 -5px;
    z-index: 0;
}
</style>