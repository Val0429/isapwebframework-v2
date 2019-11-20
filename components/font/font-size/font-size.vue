<template>
    <select @change="$emit('input', $event.target.value)">
        <option :key="index" v-for="(font, index) in possibleFontSizes" :value="font" :selected="font==currentFontSize">
            {{ font }}
        </option>
    </select> 
</template>


<script lang="ts" src="./font-size.vue.ts" />


<style lang="scss" scoped>
option {
    zoom: 1.2;
}
</style>