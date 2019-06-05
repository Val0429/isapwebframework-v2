<template>
    <div style="position: relative;" class="animation fadeIn">
        
        <iv-auto-transition :step="view === 'view' ? 1 : 2">

            <CustomView ref="view"
                key="1"
                v-show="view==='view'"
                :server="$parent.server"
                :path="$parent.path"
                @preview="preparePreview"
                :viewInterface="$parent.inf('view')"
                :tView="$parent.tView"
            >
                <template v-for="slot in relatedSlots('view', false)" :slot="slot.name">
                    <slot :name="slot.originalName" />
                </template>
                <template v-for="slot in relatedSlots('view', true)" v-slot:[slot.name]="scope">
                    <slot :name="slot.originalName" v-bind="scope" />
                </template>
            </CustomView>

            <CustomAdd ref="add"
                key="2"
                v-if="view==='preview'"
                :server="$parent.server"
                :path="$parent.path"
                :value="editRow"
                @back="view = 'view'"
                :previewInterface="$parent.inf('preview')"
                :tPreview="$parent.tPreview"
                @update:*="emitUpdate"
            >
                <template v-for="slot in relatedSlots('add', false)" :slot="slot.name">
                    <slot :name="slot.originalName" />
                </template>
                <template v-for="slot in relatedSlots('add', true)" v-slot:[slot.name]="scope">
                    <slot :name="slot.originalName" v-bind="scope" />
                </template>            
            </CustomAdd>

        </iv-auto-transition>

    </div>

</template>

<script lang="ts" src="./form-quick-preview.vue.ts" />
