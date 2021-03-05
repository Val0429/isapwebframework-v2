<template>
    <div :class="{ row: true, 'col-md-12': inner ? true : false, inner: inner ? true : false }">

        <template v-for="(inf, index) in this.parsedInterface">
            <!-- hidden case -->
            <template v-if="(inf.attrs||{}).uiHidden === 'true'" />
            <!-- template# custom case -->
            <template v-else-if="$slots[inf.name] || $scopedSlots[inf.name]">
                <slot :name="inf.name" :$attrs="bindAttrs(inf, index)" :$listeners="bindListeners(inf, index)" :data="innateValue" />
            </template>
            <!-- form-multiple case -->
            <template v-else-if="isSimpleArrayType(inf)">
                <iv-form-multiple :key="inf.name" v-bind="bindAttrs(inf, index)" v-on="bindListeners(inf, index)" :elementType="getMultipleElementType(inf)">
                    <template v-for="slot in relatedSlots(inf.name, false)" :slot="slot.name">
                        <slot :name="slot.originalName" />
                    </template>
                    <template v-for="slot in relatedSlots(inf.name, true)" v-slot:[slot.name]="scope">
                        <slot :name="slot.originalName" v-bind="scope" />
                    </template>
                </iv-form-multiple>
            </template>
            <!-- uiType normal case -->
            <template v-else-if="getElementType(inf)">
                <element :is="getElementType(inf)" :ref="inf.name" :key="inf.name" v-bind="bindAttrs(inf, index)" v-on="bindListeners(inf, index)" />
            </template>
            <template v-else>
                <template v-for="type in parsedType(inf.type) || []">
                    <!-- enum case -->
                    <iv-form-selection
                        v-if="type.type === 'enum'"
                        :key="inf.name"
                        v-bind="bindAttrs(inf, index, type)"
                        v-on="bindListeners(inf, index)"
                    />
                    <!-- nested form case -->
                    <iv-form v-else
                        :ref="inf.name"
                        :key="inf.name"
                        :inner="true"
                        :interface="type.data.result"
                        :value="innateValue[inf.name]"
                        @update:*="emitUpdate(inf.name+'.'+$event.key, $event.value)"
                        @submit="doSubmit()"
                        >
                        <template v-for="slot in relatedSlots(inf.name, false)" :slot="slot.name">
                            <slot :name="slot.originalName" />
                        </template>
                        <template v-for="slot in relatedSlots(inf.name, true)" v-slot:[slot.name]="scope">
                            <slot :name="slot.originalName" v-bind="scope" />
                        </template>
                    </iv-form>

                </template>
            </template>

            <template v-if="checkLineBreak(index)">
                <div :key="'breaker-'+index" class="w-100" />
            </template>
        </template>
    <!-- </element> -->
    </div>
</template>


<script lang="ts" src="./form.vue.ts" />

<style lang="scss" scoped>
.inner {
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
}
</style>
