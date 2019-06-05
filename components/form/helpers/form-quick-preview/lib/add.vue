<template>
    <div>
        <iv-card :data="{ label: _(tPreview) }">
            <iv-form
                :interface="previewInterface"
                :value="value"
                @submit="doSubmit($event)"
            >
                <!-- Pass on all named slots -->
                <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>

                <!-- Pass on all scoped slots -->
                <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope"/></template>
            </iv-form>

            <template #footer>
                <b-button size="lg" variant="secondary" @click="back">{{ _("wb_Back") }}</b-button>
            </template>

        </iv-card>
    </div>
</template>


<script lang="ts">
import { Vue, Component, iSAPServerBase, Emit, Prop } from "@/../core";

@Component
export class Add extends Vue {
    @Prop({
        required: true,
    })
    server!: iSAPServerBase<any>;

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
    previewInterface!: string;

    @Prop({
        type: String,
    })
    tPreview!: string;

    /// private helper
    /// emitter
    @Emit() private back() { return; }

}
export default Add;
</script>
