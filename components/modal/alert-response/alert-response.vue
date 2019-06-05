<template>
    <iv-modal
        :visible.sync="visible"
        :label="label"
        @update:visible="doUpdateVisible"
    >
        <div class="content" v-html="value" />

    </iv-modal>
</template>


<script lang="ts" src="./alert-response.vue.ts" />

<style lang="scss" scoped>
.content {
    margin-bottom: 30px;
}
</style>