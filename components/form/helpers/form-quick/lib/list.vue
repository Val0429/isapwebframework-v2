<template>
    <div>
        <iv-card :data="{ label: _(tView) }">
            <template #toolbox>
                <!-- <toolbox-view /> -->
                <iv-toolbox-edit v-if="canEdit" :disabled="selectedRows.length !== 1" @click="edit(selectedRows[0])" />
                <!-- <toolbox-info /> -->
                <iv-toolbox-delete v-if="canDelete" :disabled="selectedRows.length === 0" @click="doDelete(selectedRows)" />
                <!-- <toolbox-more /> -->

                <!-- <toolbox-divider /> -->

                <!-- <toolbox-export /> -->
                <iv-toolbox-add v-if="canAdd" @click="add" />
                
                <iv-toolbox-divider v-if="canAdd || canEdit || canDelete" />
            </template>

            <iv-table
                ref="table"
                :server="{ server, path }"
                :params="params"
                :multiple="true"
                :interface="viewInterface"
                @selected="onRowSelected($event)"
                >

                <!-- Pass on all named slots -->
                <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>

                <!-- Pass on all scoped slots -->
                <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope"/></template>

                <template v-if="canEdit || canDelete" #actions$="{$attrs}">
                    <iv-toolbox-more>
                        <iv-toolbox-edit v-show="canEdit" @click.stop="edit($attrs.row)" />
                        <iv-toolbox-delete v-show="canDelete" @click.stop="doDelete($attrs.row)" />
                    </iv-toolbox-more>
                </template>

            </iv-table>
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

    @Prop({
        required: false
    })
    params!: any;

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
    viewInterface!: string;

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
    @Emit() add() { return; }
    @Emit() edit(row) { return row; }

    /// private helpers
    private reload() {
        (this.$refs.table as any).reload();
    }
    private doDelete(rows) {
        if (!confirm(this._("mb_ConfirmDelete"))) return;
        if (!Array.isArray(rows)) rows = [rows];
        (async () => {
            for (let row of rows) {
                await this.server.D(this.path as any, {
                    objectId: row.objectId
                });
            }
            (this.$refs.table as any).reload();
        })();
    }
    private selectedRows = [];
    onRowSelected(rows) {
        this.selectedRows = rows;
    }
}
export default List;
</script>