<template>
    <div>
        <iv-card :data="{ label: _(tView) }">
            <template #toolbox>
                <!-- <toolbox-view /> -->
                <iv-toolbox-view :disabled="selectedRows.length !== 1" @click="preview(selectedRows[0])" />
                <!-- <toolbox-more /> -->

                <!-- <toolbox-divider /> -->

                <!-- <toolbox-export /> -->
                
                <iv-toolbox-divider />
            </template>

            <iv-table
                ref="table"
                :server="{ server, path }"
                :multiple="true"
                :interface="viewInterface"
                @selected="onRowSelected($event)"
                >

                <!-- Pass on all named slots -->
                <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>

                <!-- Pass on all scoped slots -->
                <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope"/></template>

                <template #actions$="{$attrs}">
                    <iv-toolbox-more>
                        <iv-toolbox-view @click.stop="preview($attrs.row)" />
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

    /// emitter
    @Emit() preview(row) { return row; }

    /// private helpers
    private reload() {
        (this.$refs.table as any).reload();
    }

    private selectedRows = [];
    onRowSelected(rows) {
        this.selectedRows = rows;
    }
}
export default List;
</script>
