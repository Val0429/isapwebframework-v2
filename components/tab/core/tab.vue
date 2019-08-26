<template>
    <b-tabs :card="innateCard" content-class="pt-3" justified :value="innateActive-1" @input="innateActive = $event+1">
        <b-tab :key="step" :title="getTitle(step)" v-for="(step) in steps">
            <iv-v-node
                @mounted="doMounted"
                ref="node"
                :node="$slots[step] || $scopedSlots[step]"
                />
        </b-tab>

    </b-tabs>
</template>


<script src="./tab.vue.ts" />
