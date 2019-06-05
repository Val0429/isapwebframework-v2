<template>
    <div>
        <iv-card :label="_(tView)">

            <iv-region-tree
                ref="tree"
                :server="{ server, path, groupBy }"
                >

                <template #toolbox="{$attrs}">
                    <iv-toolbox-more v-if="canAdd || canEdit || canDelete">
                        <iv-toolbox-add v-show="canAdd" @click.stop="add($attrs)" />
                        <iv-toolbox-edit v-show="canEdit" @click.stop="edit($attrs)" />
                        <iv-toolbox-delete v-show="$attrs.lft !== 1 && canDelete" @click.stop="doDelete($attrs)" />
                    </iv-toolbox-more>
                </template>

                <!-- Pass on all named slots -->
                <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>

                <!-- Pass on all scoped slots -->
                <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope"/></template>

            </iv-region-tree>

        </iv-card>

    </div>
</template>

<script lang="ts">
import { Vue, Component, iSAPServerBase, Emit, Prop } from "@/../core";

@Component
export class List extends Vue {
    @Prop({
        required: true,
    })
    server!: iSAPServerBase<any>;

    /// private prop
    @Prop({
        type: String,
        required: true
    })
    path!: string;

    @Prop({
        type: String,
        required: false
    })
    groupBy!: string;

    @Prop({
        type: String,
    })
    tView!: string;

    @Prop({
        type: Boolean,
        default: true
    })
    canAdd!: boolean;
    @Prop({
        type: Boolean,
        default: true
    })
    canEdit!: boolean;
    @Prop({
        type: Boolean,
        default: true
    })
    canDelete!: boolean;

    /// emitter
    @Emit() add(row) { return row; }
    @Emit() edit(row) { return row; }

    /// private helpers
    private reload() {
        (this.$refs.tree as any).reload();
    }
    private doDelete(row) {
        if (!confirm(this._("mb_ConfirmDelete"))) return;
        (async () => {
            await this.server.D(this.path as any, {
                objectId: row.objectId
            });
            (this.$refs.tree as any).reload();
        })();
    }
    private selectedRows = [];
    onRowSelected(rows) {
        this.selectedRows = rows;
    }
}
export default List;
</script>
