<template>
    <iv-tree ref="tree" :server="server" :data="data" :visible="innateVisible">
        <!-- Pass on all named slots -->
        <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>

        <!-- Pass on all scoped slots -->
        <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope"/></template>

        <template #default="{$attrs}">
            <b-card-header @click="eventBus.$emit('valclick', $attrs.result)">
                <slot name="title" :$attrs="$attrs.result" />

                <div class="float-right toolbox">
                    <b-badge class="badge" v-if="$attrs.result.children && $attrs.result.children.length > 0" pill variant="secondary">{{ $attrs.result.children.length }}</b-badge>

                    <slot name="toolbox" :$attrs="$attrs.result" />

                    <b-button
                        @click="$emit('test'); if (!$attrs.result.children || $attrs.result.children.length === 0) return; innateVisible = !innateVisible"
                        variant="light" size="sm" class="card-collapse-button fa fa-chevron-down" :disabled="!$attrs.result.children || $attrs.result.children.length === 0" :class="{ card_close: !innateVisible }" />
                </div>
            </b-card-header>
        </template>
    </iv-tree>
</template>


<script lang="ts" src="./region-tree.vue.ts" />


<style lang="scss" scoped>
.card-header {
    border: 1px solid #798A93; border-radius: 3px; box-shadow: 0 0 5px #AAA;
    font-weight: bold;
    margin: 8px 0;
    position: relative;
}

.toolbox {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0.4rem;
    height: 2.2rem;

    top: 0.3rem;

    > * {
        margin-left: 0.1rem;
        margin-right: 0.1rem;
    }

    .card-collapse-button {
        cursor: pointer;
        @include transition(all .2s linear);
    }

    .card_close {
        @include transform-origin(50% 50% 0);
        @include rotate(90);
    }

    .badge {
        margin-left: 6px;
        margin-right: 6px;
    }
}

.title {
    margin-right: 16px;
}

.badge-tag {
    margin-left: 4px;
    margin-right: 4px;
}

</style>
