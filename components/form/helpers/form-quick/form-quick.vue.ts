import { Vue, Component, Prop, Model } from "vue-property-decorator";
import CustomView from './lib/list.vue';
import CustomAdd from './lib/add.vue';

export enum EFormQuick {
    View = "view",
    Add = "add",
    Edit = "edit"
}

/// template steps
// 6) custom view templates with <template #view.* />
// 7) custom edit / add template with <template #add.* />
export interface IFormQuick {
    /// 2) cgi path
    path: string;
    params?: any;
    /// 3) i18n - view / edit / add
    tView: string;
    tAdd: string;
    tEdit: string;
    /// 4) possibility - edit / add / delete
    canAdd?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    /// 5) interfaces - view / edit / add
    inf(type: EFormQuick): string;
    /// 8) pre-add 新增欄位的default值
    preAdd(): any | undefined;
    /// 9) post-add 寫入新增前要做甚麼調整
    postAdd(row): any | undefined;
    /// 10) pre-edit 送去修改表單前要做甚麼調整
    preEdit(row): any | undefined;
    /// 11) post-edit 寫入修改前要做甚麼調整
    postEdit(row): any | undefined;
}


@Component({
    components: { CustomView, CustomAdd },
} as any)
/// 0) class name
export class FormQuick extends Vue {
    /// private helpers
    private view: EFormQuick = EFormQuick.View;
    private editRow: any = null;
    private doAddSuccess() {
        this.view = EFormQuick.View;
        (this.$refs.view as any).reload();
    }
    private doAdd(data) {
        (async () => {
            try {
                let result = await (this.$parent as any).server.C((this.$parent as any).path as any, await (this.$parent as any).postAdd(data) || data);
                this.doAddSuccess();
            } catch(e) {
                alert(e.body);
            }
        })();
    }
    private doEdit(data) {
        (async () => {
            try {
                let result = await (this.$parent as any).server.U((this.$parent as any).path as any, {...(await (this.$parent as any).postEdit(data) || data), objectId: data.objectId } );
                this.doAddSuccess();
            } catch(e) {
                alert(e.body);
            }
        })();
    }
    private prepareEdit(row) {
        this.editRow = { ...((this.$parent as any).preEdit(row) || row), objectId: row.objectId };
        this.view = EFormQuick.Edit;
    }

    private relatedSlots(name: 'view' | 'add', isScoped?: boolean): { originalName: string, name: string }[] {
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
}
export default FormQuick;