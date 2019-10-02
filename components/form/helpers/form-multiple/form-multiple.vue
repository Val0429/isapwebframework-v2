<template>

    <b-form-group
        v-bind:id="'form-group-' + _uid"
        v-bind:label="label"
        v-bind:label-for="'input-' + _uid"
        :state="$attrs.state"
        :invalid-feedback="invalid"
        >

        <template v-if="value.length === 0">
            <div @click="addInitial">
                <element v-if="typeof elementType === 'string'" :is="elementType" :label="null"
                    class="placeholder"
                    style="flex-grow: 1"
                    />
                <iv-form v-else
                    class="placeholder"
                    style="flex-grow: 1"
                    :inner="true"
                    :interface="elementType.result"
                    >
                    <template v-for="(_, slot) of $slots">
                        <slot :name="slot" />
                    </template>
                    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
                        <slot :name="slot" v-bind="scope" />
                    </template>
                </iv-form>
            </div>
        </template>
        <template v-else>
            <draggable class="multiple-block" :value="value" @input="$emit('input', $event)" handle=".fa-bars">
                <div class="form-multiple-container"
                    :key="index" v-for="(num, index) in value">
                        <i class="fa fa-bars form-toolbar" style="cursor: grab" />
                        <element v-if="typeof elementType === 'string'" :is="elementType" :label="null"
                            v-bind="{ ...$attrs, class: undefined }"
                            style="flex-grow: 1"
                            :value="value[index]"
                            @input="updateValue(index, $event)"
                            />

                        <iv-form v-else
                            ref="form"
                            :inner="true"
                            style="flex-grow: 1; flex-basis: 80% !important"
                            :interface="elementType.result"
                            @update:*="updateValue(index, $refs.form[index].getResult())"
                            :value="value[index]"
                            >
                            <template v-for="(_, slot) of $slots">
                                <slot :name="slot" />
                            </template>
                            <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
                                <slot :name="slot" v-bind="scope" />
                            </template>
                        </iv-form>

                        <i class="fa fa-minus-square form-toolbar" style="padding: 9px 3px; margin-left: 10px" @click="removeOne(index)" />
                        <i class="fa fa-plus-square form-toolbar" style="padding: 9px 3px; margin-right: 5px" @click="addOne(index)" />
                </div>
            </draggable>
        </template>
    </b-form-group>

</template>

<script lang="ts" src="./form-multiple.vue.ts" />


<style lang="scss" scoped>
.form-control {
    border-radius: 4px;
}
.form-multiple-container {
    display: flex;
    align-items: center;
    border: 1px solid #CCC;
    padding: 8px 10px 4px 10px;
    margin: 5px 0;
    border-radius: 5px;
}
.form-toolbar {
    font-size: 18px; padding: 9px 8px; color: #666; height: 34px; cursor: pointer;
}
.placeholder {
    position: relative;
    cursor: pointer;
    border: 1px dashed $info;
    /deep/ * {
        opacity: 0.8;
    }
}
.placeholder::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 500px;
    line-height: 33px;
    text-align: center;
    content: var(--form-multiple-text) !important;
}
.multiple-block {
    padding: 8px 0px;
}
.is-invalid .multiple-block {
    border: 1px solid rgb(226, 106, 106);
    border-radius: 4px;
}
</style>

