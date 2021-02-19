<template>
    <div class="border">
        <div class="title" v-if="label">{{ label }}</div>
        
        <div class="row slot-container">
            <slot />
        </div>
    </div>
</template>


<script lang="ts" src="./topic.vue.ts" />

<style lang="scss" scoped>
.border {
    border: 1px solid #CECECE;
    border-radius: 5px;
    padding: 10px 15px;
    background: white;
}

.title {
    font-size: 18px;
    font-family: "Century Gothic";
    cursor: default;
}

.slot-container {
    margin-top: 10px;
    margin-left: -6px !important;
    margin-right: -6px !important;
    margin-bottom: 0px;

    & > * {
        margin: 0 6px 0 6px;
    }
}
</style>
