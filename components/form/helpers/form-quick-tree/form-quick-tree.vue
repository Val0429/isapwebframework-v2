<template>
    <div style="position: relative;" class="animation fadeIn">
        <transition name="slide-first" @before-enter="beforeEnter" @before-leave="beforeLeave">
            <CustomView ref="view"
                v-show="view==='view'"
                :server="$parent.server"
                :path="$parent.path"
                :groupBy="$parent.groupBy"
                @add="prepareAdd"
                @edit="prepareEdit"
                :tView="$parent.tView"
                :canAdd="$parent.canAdd"
                :canEdit="$parent.canEdit"
                :canDelete="$parent.canDelete"
            >
                <template v-for="slot in relatedSlots('view', false)" :slot="slot.name">
                    <slot :name="slot.originalName" />
                </template>
                <template v-for="slot in relatedSlots('view', true)" v-slot:[slot.name]="scope">
                    <slot :name="slot.originalName" v-bind="scope" />
                </template>
            </CustomView>
        </transition>

        <transition name="slide-second" @before-enter="beforeEnter" @before-leave="beforeLeave">
            <CustomAdd ref="add"
                v-if="view==='add' || view==='edit'"
                :server="$parent.server"
                :path="$parent.path"
                :type="view"
                :value="editRow"
                @back="view = 'view'"
                @add="doAdd($event)"
                @edit="doEdit($event)"
                :addInterface="$parent.inf('add')"
                :editInterface="$parent.inf('edit')"
                :tAdd="$parent.tAdd"
                :tEdit="$parent.tEdit"
                @update:*="emitUpdate"
            >
                <template v-for="slot in relatedSlots('add', false)" :slot="slot.name">
                    <slot :name="slot.originalName" />
                </template>
                <template v-for="slot in relatedSlots('add', true)" v-slot:[slot.name]="scope">
                    <slot :name="slot.originalName" v-bind="scope" />
                </template>            
            </CustomAdd>        
        </transition>
    </div>

</template>

<script lang="ts" src="./form-quick-tree.vue.ts" />

<style lang="scss" scoped>
$animation-duration: .6s;

.slide-first-leave-active,
.slide-first-enter-active,
.slide-second-leave-active,
.slide-second-enter-active {
    transition: $animation-duration;
    position: relative;
    z-index: 0;
}
.slide-first-leave-active,
.slide-second-leave-active {
    position: absolute;
    left: 0; top: 0;
    z-index: 10000;
}
.slide-second-enter {
    transform: translate(100%, 0);
}
.slide-first-leave-to {
    transform: translate(-100%, 0);
    opacity: 0;
}
.slide-first-enter {
    transform: translate(-100%, 0);
}
.slide-second-leave-to {
    transform: translate(100%, 0);
    opacity: 0;
}
</style>

