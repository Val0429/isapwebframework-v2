<template>
    <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
        <div class="row">
            <div class="col-sm-12">
                <table class="table table-bordered table-hover datatable dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" style="border-collapse: collapse !important">
                <thead>
                    <tr role="row">
                        <th v-if="selectable" role="row" class="selection-cell" />
                        <iv-inner-table-header :key="key" v-for="(inf, key) in parsedInterface" :meta="inf" :keyUiLabel="keyUiLabel" />
                        <th class="actions-cell" />
                    </tr>
                </thead>
                <tbody>
                    <tr v-bind:key="index" v-for="(item, index) in result.results" role="row" :class="{ selected: getSelectedIndex(item) >= 0 }" @click.exact="selectRow(item)" @click.ctrl="selectRow(item, true)">
                        <td v-if="selectable" class="selection-cell" @click.stop="selectRow(item, true)">
                            <b-form-checkbox v-if="pSelected.length > 0" :checked="getSelectedIndex(item) >= 0" style="padding-left: 0; pointer-events: none;" />
                        </td>
                        <iv-inner-table-body :key="key" v-for="(inf, key) in parsedInterface" :meta="inf" :indexOfRows="index" :result="result">
                            <template v-for="(_, slot) of $slots">
                                <slot :name="slot" />
                            </template>
                            <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
                                <slot :name="slot" v-bind="scope" />
                            </template>
                        </iv-inner-table-body>
                        <td class="actions-cell">
                            <slot name="actions$" :$attrs="bindAttrs(item)" />
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12 col-md-6">
                <div class="row" style="align-items: center">
                    <div class="dataTables_length" id="DataTables_Table_0_length" style="margin-left: 1rem; display: flex; align-items: center">
                            {{ _("mb_ShowEntries").split("{0}")[0] }}
                            <select class="custom-select custom-select-sm form-control form-control-sm" v-on:change="innatePageSize = $event.target.value">
                                <option :key="key" v-for="(value, key) in [5, 10, 25, 50, 100]"
                                    :value="value"
                                    :selected="value === innatePageSize"
                                >
                                    {{ value }}
                                </option>
                            </select>
                            {{ _("mb_ShowEntries").split("{0}")[1] }}
                    </div>
                    <div style="margin: 0 10px">|</div>
                    <div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">{{ total && _("mb_ShowCurrentEntries", { curStart: currentStart, curEnd: currentEnd, total }) }}</div>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <b-pagination align="right" :total-rows="total" :per-page="innatePageSize" v-model="currentPage" v-bind:prev-text="_('wb_PreviousPage')" v-bind:next-text="_('wb_NextPage')" />
            </div>
        </div>

    </div>

</template>

<script lang="ts" src="./table.vue.ts" />

<style lang="scss" scoped>
div.dataTables_wrapper div.dataTables_length label {
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
}
div.dataTables_wrapper div.dataTables_length select {
  width: auto;
  display: inline-block;
}
div.dataTables_wrapper div.dataTables_filter {
  text-align: right;
}
div.dataTables_wrapper div.dataTables_filter label {
  font-weight: normal;
  white-space: nowrap;
  text-align: left;
}
div.dataTables_wrapper div.dataTables_filter input {
  margin-left: 0.5em;
  display: inline-block;
  width: auto;
}

.table > tbody > tr > td {
    vertical-align: middle;
}

/deep/ .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
    background-color: #F3F3F3;
}

/deep/ .table-hover tbody tr.selected td, .table-hover tbody tr.selected th {
    background-color: #E8E8E8;
}

/deep/ .table-bordered {
    border-left: 0;
    border-right: 0;
    border-top-color: white;

    /deep/ th {
        border-bottom-width: 2px;
    }

    /deep/ th, td {
        border-left: 0;
        border-right: 0;
        border-top-color: #cecece;
        border-bottom-color: #cecece;
        color: #262f36;
        text-align: center;
    }
}

.selection-cell {
    width: 32px;
    padding-left: 0 !important;
    padding-right: 0 !important;
}
.actions-cell {
    width: 10px;
}

.form-group {
    margin-bottom: 0;
}
* /deep/ .custom-control-label::before, * /deep/ .custom-control-label::after {
    left: -4px;
}
* /deep/ .custom-control-input:not(:checked) ~ .custom-control-label::before {
    background-color: #fff !important;
}
</style>

