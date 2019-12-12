<template>
    <!-- <select @change="$emit('input', $event.target.value)">
        <option :key="index" v-for="(font, index) in possibleFontSizes" :value="font" :selected="font==currentFontSize">
            {{ font }}
        </option>
    </select>  -->
    <fragment>
        <button
            :id="'target-'+_uid"
            style="border: 0; background: transparent; margin: 0 3px"
            >
            <span class="main-text" :style="'border-bottom: 2px solid '+innateValue">A</span>
        </button>

        <b-popover
            :target="'target-'+_uid"
            triggers="click"
            placement="bottom"
            :show.sync="show"
            >
            <sketch-picker :value="value" @input="outputColor($event)" />
        </b-popover>
    </fragment>

</template>


<script lang="ts" src="./font-color.vue.ts" />


<style lang="scss" scoped>
.vc-sketch {
    user-select: none;
}
.main-text {
    font-size: 16px;
}
</style>