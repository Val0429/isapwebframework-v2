<template>
    <select @change="$emit('input', $event.target.value)">
        <option :style="`font-family: ${font}`" :key="index" v-for="(font, index) in possibleFonts" :value="font" :selected="font==currentFont">
            {{ font }}
        </option>
    </select> 
</template>


<script lang="ts" src="./font.vue.ts" />


<style lang="scss" scoped>
option {
    zoom: 1.2;
}
</style>