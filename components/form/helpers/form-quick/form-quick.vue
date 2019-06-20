<template>
    <div style="position: relative;" class="animation fadeIn">
        <iv-auto-transition :step="view === 'view' ? 1 : 2">
            <CustomView ref="view"
                key="1"
                v-show="view==='view'"
                :server="server"
                :params="$parent.params"
                :path="$parent.path"
                @add="view = 'add'"
                @edit="prepareEdit"
                :viewInterface="$parent.inf('view')"
                :tView="$parent.tView"
                :canAdd="canAdd"
                :canEdit="canEdit"
                :canPreview="canPreview"
                :canDelete="canDelete"
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
                v-if="view==='add' || view==='edit' || view==='preview'"
                :server="server"
                :path="$parent.path"
                :type.sync="view"
                :value="view === 'add' ? ($parent.preAdd ? $parent.preAdd() : undefined) : editRow"
                @back="view = 'view'"
                @add="doAdd($event)"
                @edit="doEdit($event)"
                :addInterface="$parent.inf('add')"
                :editInterface="$parent.inf('edit')"
                :previewInterface="$parent.inf('preview')"
                :tAdd="$parent.tAdd"
                :tEdit="$parent.tEdit"
                :tPreview="$parent.tPreview"
                :canAdd="canAdd"
                :canEdit="canEdit"
                :canPreview="canPreview"
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

<script lang="ts" src="./form-quick.vue.ts" />
