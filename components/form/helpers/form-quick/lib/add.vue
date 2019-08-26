<template>
    <div>
        <iv-auto-transition :step="type === 'preview' ? 2 : 1" type="iv-fade-slide">
            <iv-auto-card
                v-show="type === 'add' || type === 'edit'"
                key="edit"
                :label="type === 'add' ? tAddText() : type==='edit' ? tEditText() : tPreviewText()"
            >
                <iv-form
                    :interface="type === 'add' ? addInterface : type==='edit' ? editInterface : previewInterface"
                    :value="value"
                    ref="form"
                    @submit="doSubmit($event)"
                    @mounted="doFormMounted"
                    @update:*="emitUpdate"
                >
                    <!-- Pass on all named slots -->
                    <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>

                    <!-- Pass on all scoped slots -->
                    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope"/></template>
                </iv-form>

                <template #footer v-if="type === 'preview'"><span style="margin: 0; width: 0;" /></template>

                <template #footer-before>
                    <b-button size="lg" variant="secondary" @click="back">{{ _("wb_Back") }}</b-button>
                </template>
                <template #footer-after>
                    <b-button
                        v-if="type !== 'add' && canEdit && canPreview"
                        @click="toggleLock"
                        size="lg">
                        <i :class="{ fa: true, 'fa-lock': type === 'preview', 'fa-unlock': type === 'edit' }" />
                    </b-button>
                </template>
            </iv-auto-card>

            <iv-auto-card
                v-if="type === 'preview'"
                key="preview"
                :label="type === 'add' ? tAddText() : type==='edit' ? tEditText() : tPreviewText()"
            >
                <iv-form
                    :interface="type === 'add' ? addInterface : type==='edit' ? editInterface : previewInterface"
                    :value="value"
                    @submit="doSubmit($event)"
                    @update:*="emitUpdate"
                >
                    <!-- Pass on all named slots -->
                    <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>

                    <!-- Pass on all scoped slots -->
                    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope"/></template>
                </iv-form>

                <template #footer v-if="type === 'preview'"><span style="margin: 0; width: 0;" /></template>

                <template #footer-before>
                    <b-button size="lg" variant="secondary" @click="back">{{ _("wb_Back") }}</b-button>
                </template>
                <template #footer-after>
                    <b-button
                        v-if="type !== 'add' && canEdit && canPreview"
                        @click="toggleLock"
                        size="lg">
                        <i :class="{ fa: true, 'fa-lock': type === 'preview', 'fa-unlock': type === 'edit' }" />
                    </b-button>
                </template>
            </iv-auto-card>
        </iv-auto-transition>

    </div>
</template>

<script lang="ts">
import { Vue, Component, iSAPServerBase, Emit, Prop } from "@/../core";
import { Observe } from '@/../core/utilities';
import { BehaviorSubject } from 'rxjs';

enum EType {
    Add = "add",
    Edit = "edit",
    Preview = "preview"
};

@Component
export class Add extends Vue {
    @Prop({
        required: true,
    })
    server!: iSAPServerBase<any>;

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
        required: false
    })
    previewInterface!: string;

    @Prop({
        type: String,
    })
    tAdd!: string;

    @Prop({
        type: String,
    })
    tEdit!: string;

    @Prop({
        type: String,
    })
    tPreview!: string;

    @Prop({
        type: Boolean,
    })
    canAdd!: boolean;
    @Prop({
        type: Boolean,
    })
    canEdit!: boolean;
    @Prop({
        type: Boolean,
    })
    canPreview!: boolean;

    /// private helper
    private textParser(text: string): string {
        const regex = /^_\(\'([^']+)\'\)$/;
        if (!regex.test(text)) return text;
        return this._( text.replace(regex, (a,b) => b) as any );
    }
    private tAddText(): string { return this.textParser(this.tAdd) };
    private tEditText(): string { return this.textParser(this.tEdit) };
    private tPreviewText(): string { return this.textParser(this.tPreview) };
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

    private toggleLock() {
        this.$emit('update:type', this.type === EType.Preview ? EType.Edit : EType.Preview);
    }

    /// rxjs form keeper
    @Observe({  value: () => new BehaviorSubject<any>({})  })
    result: Vue;
    private doFormMounted() {
        (this.$observables.result as any).next( this.$refs.form );
    }
}
export default Add;
</script>
