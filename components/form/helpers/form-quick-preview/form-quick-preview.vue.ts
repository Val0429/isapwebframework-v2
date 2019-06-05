import { Vue, Component, Prop, Model } from "vue-property-decorator";
import { List as CustomView } from './lib/list.vue';
import { Add as CustomAdd } from './lib/add.vue';

export enum EFormQuickPreview {
    View = "view",
    Preview = "preview",
}

/// template steps
// 6) custom view templates with <template #view.* />
// 7) custom preview templates with <template #preview.* />
export interface IFormQuickPreview {
    /// 2) cgi path
    path: string;
    /// 3) i18n - view / preview
    tView: string;
    tPreview: string;
    /// 5) interfaces - view / preview
    inf(type: EFormQuickPreview): string;
    /// 10) pre-edit 送去修改表單前要做甚麼調整
    prePreview(row): any | undefined;
}


@Component({
    components: { CustomView, CustomAdd },
} as any)
/// 0) class name
export class FormQuickPreview extends Vue {
    /// private helpers
    private view: EFormQuickPreview = EFormQuickPreview.View;
    private editRow: any = null;

    private relatedSlots(name: 'view' | 'preview', isScoped?: boolean): { originalName: string, name: string }[] {
        let slots = isScoped ? this.$scopedSlots : this.$slots;
        let rtn = [];
        let regex = new RegExp(`^${name}\.`);
        for (let key in slots) {
            if (!regex.test(key)) continue;
            rtn.push({
                originalName: key,
                name: key.replace(regex, "")
            });
        }
        return rtn;
    }

    private emitUpdate(data: { key: string, value: any }) {
        let { key, value } = data;
        if (key.indexOf(".") < 0) this.$emit(`update:${key}`, value);
        else this.$emit(`update:${key.replace(/\./g, ':')}`, value);
        this.$emit(`update:*`, { key, value });
    }

    private preparePreview(row) {
        this.editRow = { ...((this.$parent as any).prePreview(row) || row), objectId: row.objectId };
        this.view = EFormQuickPreview.Preview;
    }
}
export default FormQuickPreview;