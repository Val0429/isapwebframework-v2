<template>
    <element
        :to="url" :href="url"
        :is="!url ? 'div' : isExternalLink ? 'a' : 'router-link'"
        :class="classBorder">
        <i v-if="classIcon" :class="classIcon" />
        <div v-if="generatedLabel" class="label">{{ generatedLabel }}</div>
    </element>
</template>


<script lang="ts" src="./topic-item.vue.ts" />

<style lang="scss" scoped>
.border-item {
    background-color: #476a89;
    padding: 10px 15px;
    box-shadow: 0 1px 15px rgba(0,0,0,0.35);
    text-decoration: none;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:hover, &:link, &:active {
        text-decoration: none;
    }
}

.icon {
    color: white;
    text-align: center;
    display: block;
    margin: 8px auto;
    font-size: 4.5rem;
}

.label {
    color: white;
    text-align: center;
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    font-weight: 400;
    vertical-align: middle;
    font-family: "Century Gothic";
}
</style>
