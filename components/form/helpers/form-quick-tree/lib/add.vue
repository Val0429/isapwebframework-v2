<template>
    <div>
        <iv-auto-card
            :label="type === 'add' ? _(tAdd) : _(tEdit)"
        >
            <iv-form
                :interface="type === 'add' ? addInterface : editInterface"
                :value="value"
                @submit="doSubmit($event)"
                @update:*="emitUpdate"
            >
                <!-- Pass on all named slots -->
                <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>

                <!-- Pass on all scoped slots -->
                <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope"/></template>
            </iv-form>

            <template #footer-before>
                <b-button size="lg" variant="secondary" @click="back">{{ _("wb_Back") }}</b-button>
            </template>
        </iv-auto-card>

    </div>
</template>

<script lang="ts">
import { Vue, Component, iSAPServerBase, Emit, Prop } from "@/../core";

enum EType {
    Add = "add",
    Edit = "edit"
};

@Component
export class Add extends Vue {
    @Prop({
        required: true,
    })
    server!: iSAPServerBase<any>;

    @Prop({
        type: String,
        required: false,
    })
    label: string;

    /// private props
    @Prop({
        required: false,
        default: EType.Add
    })
    type!: EType;

    @Prop({
        required: false,
    })
    value!: any;

    @Prop({
        type: String,
        required: true
    })
    path!: string;

    @Prop({
        type: String,
        required: false
    })
    addInterface!: string;

    @Prop({
        type: String,
        required: false
    })
    editInterface!: string;

    @Prop({
        type: String,
    })
    tAdd!: string;

    @Prop({
        type: String,
    })
    tEdit!: string;

    /// private helper
    /// emitter
    @Emit() private back() { return; }
    @Emit() private add(data) { return data; }
    @Emit() private edit(data) { return data; }

    /// functions
    private doSubmit(data) {
        if (this.type === 'add') this.add(data);
        else this.edit(data);
    }

    private emitUpdate(data: { key: string, value: any }) {
        let { key, value } = data;
        if (key.indexOf(".") < 0) this.$emit(`update:${key}`, value);
        else this.$emit(`update:${key.replace(/\./g, ':')}`, value);
        this.$emit(`update:*`, { key, value });
    }
}
export default Add;
</script>
