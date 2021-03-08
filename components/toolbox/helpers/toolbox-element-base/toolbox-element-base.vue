<template>

    <span class="container-box" :id="'container-'+_uid">
        <template v-if="$scopedSlots.layout">
            <slot name="layout" :title="title" :icon="icon" :$listeners="{ click }" />
        </template>
        <template v-else>
            <iv-button
                :id="'target-'+_uid"
                :icon="icon"
                :label="!icon ? title : undefined"
                :pressed="active"
                v-show="visible"
                v-bind="$attrs"
                :variant="variant"
                :size="size"
                :disabled="disabled"
                @click="click"
                @dblclick="dblclick"
                />

            <b-tooltip :target="'target-'+_uid" :title="title" />

            <b-popover
                v-if="$slots.default"
                :target="'target-'+_uid"
                triggers="click"
                :show.sync="show"
                placement="bottom"
                :container="'container-'+_uid"
                >

                <b-list-group>
                    <iv-form-merge-bindings>
                        <template>
                            <slot />
                        </template>
                        <template #layout="{ title, icon, $listeners }">
                            <b-list-group-item class="d-flex align-items-center" v-on="$listeners" v-show="visible" :disabled="disabled">
                                <iv-icon :icon="icon" :variant="variant" :size="size" />
                                <span class="item-title">{{ title }}</span>
                            </b-list-group-item>
                        </template>
                    </iv-form-merge-bindings>
                </b-list-group>
            </b-popover>

        </template>
    </span>

</template>

<script lang="ts" src="./toolbox-element-base.vue.ts" />

<style lang="scss" scoped>
.container-box > .btn-iv-toolbox {
    color: #212529;
    background-color: #efefef;
    border-color: #efefef;

    &:not(:disabled):hover {
        color: #212529;
        background-color: #dcdcdc;
        border-color: #d6d6d6;
    }
}

.container-box {
    margin-top: -0.05rem;

    /deep/ .popover-body {
        padding: 0;
    }

    /deep/ .list-group-item {
        padding-top: 6px;
        padding-bottom: 6px;
    }

    .list-group {
        padding-top: 0.45rem;
        padding-bottom: 0.45rem;
    }
    .list-group-item {
        cursor: pointer;
        border-radius: 0 !important;
        border: 0;
        padding: 0.3rem 0.8rem !important;
    }
    .list-group-item:hover {
        background: var(--light);
    }
    .item-title {
        margin-left: 1rem; white-space: nowrap; min-width: 5.5rem;
    }

    .btn, .btn-md {
        padding: 0 0 0 3px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }

    .btn-lg {
        padding: 0 0 0 5px;
        width: 40px;
        height: 40px;
    }

    .btn-sm {
        padding: 0 0 0 0px;
        width: 24px;
        height: 24px;
    }
}
</style>

