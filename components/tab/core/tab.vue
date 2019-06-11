<template>
    <b-tabs :card="innateCard" content-class="pt-3" justified v-model="innateActive">
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
