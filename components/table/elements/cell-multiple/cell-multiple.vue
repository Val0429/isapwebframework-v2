<template>
    <fragment>
        <div
            class="rootelement"
            :key="index"
            v-for="(unit, index) in value"
            >
            <element
                :is="elementType"
                :value="unit"
                class="element"
                />
        </div>
    </fragment>
</template>

<script lang="ts" src="./cell-multiple.vue.ts" />
