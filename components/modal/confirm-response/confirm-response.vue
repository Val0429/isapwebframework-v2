<template>
    <iv-modal
        :visible.sync="visible"
        :label="label"
        @update:visible="doUpdateVisible"
    >
        <div class="content" v-html="value" />

        <template #footer>
            <iv-button size="lg" icon="fa-save" @click="doSubmit">{{ _("wb_Submit") }}</iv-button>
            <iv-button size="lg" icon="fa-undo" @click="doCancel">{{ _("wb_Cancel") }}</iv-button>
        </template>
    </iv-modal>
</template>


<script lang="ts" src="./confirm-response.vue.ts" />

<style lang="scss" scoped>
.content {
    min-width: 400px;
    margin-bottom: 30px;
}
</style>