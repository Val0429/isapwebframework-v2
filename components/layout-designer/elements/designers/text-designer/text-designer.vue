<template>
    <div class="editor">
        <!-- <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, focused }">
            <div class="menubar is-hidden"
                :class="{ 'is-focused': focused }">
                
                <iv-toolbox-custom icon="fa-bold" label="Bold" :active="isActive.bold()" @click="commands.bold" />
                <iv-toolbox-custom icon="fa-italic" label="Italic" :active="isActive.italic()" @click="commands.italic" />
                <iv-toolbox-custom icon="fa-underline" label="Underline" :active="isActive.underline()" @click="commands.underline" />

                <iv-toolbox-divider style="display: inline; padding-bottom: 4px" />

                <iv-toolbox-custom label="H1" :active="isActive.heading({ level: 1 })" @click="commands.heading({ level: 1 })" />
                <iv-toolbox-custom label="H2" :active="isActive.heading({ level: 2 })" @click="commands.heading({ level: 2 })" />
                <iv-toolbox-custom label="H3" :active="isActive.heading({ level: 3 })" @click="commands.heading({ level: 3 })" />

                <iv-toolbox-divider style="display: inline; padding-bottom: 4px" />

                <iv-toolbox-custom icon="fa-undo" label="Undo" @click="commands.undo" />
                <iv-toolbox-custom icon="fa-repeat" label="Redo" @click="commands.redo" />

            </div>
        </editor-menu-bar> -->

        <editor-content class="editor__content" :editor="editor" />
    </div>
</template>


<script lang="ts" src="./text-designer.vue.ts" />


<style lang="scss" scoped>

</style>