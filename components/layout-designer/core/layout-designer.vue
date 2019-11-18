<template>
    <div class="editor">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, focused }">
            <div class="menubar is-hidden"
                :class="{ 'is-focused': focused }">
                
                <iv-toolbox-custom icon="fa-bold" @click="commands.bold" />

            </div>
        </editor-menu-bar>

        <editor-content class="editor__content" :editor="editor" />
    </div>
</template>


<script lang="ts" src="./layout-designer.vue.ts" />


<style lang="scss" scoped>
.menubar {
    border: 1px solid #BBB;
    border-left: 0;
    border-right: 0;
    margin-bottom: 1em;
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
</style>