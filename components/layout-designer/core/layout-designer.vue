<template>
    <div class="editor">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, focused, getMarkAttrs }">
            <div class="menubar is-hidden"
                :class="{ 'is-focused': focused }">

                <iv-toolbox-custom label="H1" @click="commands.heading({label: 1})" />
                <iv-toolbox-custom icon="fa-bold" label="Bold" @click="commands.bold" />
                <iv-toolbox-custom icon="fa-text-width" label="Text" @click="commands['iv-text-designer']" />

                <iv-font-family style="margin-top: 2px" @input="commands.font({ ...getMarkAttrs('font'), 'font-family': $event })" :value="getMarkAttrs('font')['font-family']" />
                <iv-font-size style="margin-top: 2px" @input="commands.font({ ...getMarkAttrs('font'), 'font-size': $event })" :value="getMarkAttrs('font')['font-size']" />

                <iv-font-color @input="commands.font({ ...getMarkAttrs('font'), 'color': $event })" :value="getMarkAttrs('font')['color']" />

            </div>
        </editor-menu-bar>

        <iv-scrollbar class="editor__content">
            <editor-content class="editor__content" :editor="editor" />
        </iv-scrollbar>
    </div>
</template>


<script lang="ts" src="./layout-designer.vue.ts" />


<style lang="scss" scoped>
.menubar {
    border: 1px solid #BBB;
    border-left: 0;
    border-right: 0;
    height: 35px;
    // margin-bottom: 1em;
    padding: 3px 10px;

    // &.is-hidden {
    //     visibility: hidden;
    //     opacity: 0;
    // }

    &.is-focused {
        visibility: visible;
        opacity: 1;
        transition: visibility .2s, opacity .2s;
    }
}

.editor__content {
    height: calc(100% - 35px);
}
/deep/ .ProseMirror {
    height: calc(100%);
}
</style>