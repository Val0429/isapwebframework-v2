/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";
import CustomView from './lib/list.vue';
import CustomAdd from './lib/add.vue';
import { iSAPServerBase } from "@/../core/server";
import { Observe } from '@/../core/utilities';
import { BehaviorSubject } from 'rxjs';
import { ModalResponse } from '@/../components/modal/modal-response';

export enum EFormQuick {
    View = "view",
    Add = "add",
    Preview = "preview",
    Edit = "edit"
}

/// template steps
/**
    <!-- 50) custom view templates with <template #view.* /> -->
    <!-- 51) custom edit / add template with <template #add.* /> -->
**/
export interface IFormQuick {
    /// 0) server
    server?: iSAPServerBase<any>;
    /// 1) cgi path
    path: string;
    params?: any;

    /// 20) i18n - view / edit / add
    tView: string;
    tAdd: string;
    tPreview?: string;
    tEdit?: string;

    /// 30) possibility - edit / add / delete
    canAdd?: boolean;
    canPreview?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;

    /// 40) interfaces - view / edit / add
    inf(type: EFormQuick): string;

    /// 60) pre-add 新增欄位的default值
    preAdd?(): any | undefined;
    /// 61) post-add 寫入新增前要做甚麼調整
    postAdd?(row): any | undefined;
    /// 62) pre-preview 送去預覽表單前要做甚麼調整
    prePreview?(row): any | undefined;
    /// 63) pre-edit 送去修改表單前要做甚麼調整
    preEdit?(row): any | undefined;
    /// 64) post-edit 寫入修改前要做甚麼調整
    postEdit?(row): any | undefined;
}


@Component({
    components: { CustomView, CustomAdd },
} as any)
/// 0) class name
export class FormQuick extends Vue {
    /// private helpers
    private canAdd: boolean = true;
    private canEdit: boolean = true;
    private canPreview: boolean = false;
    private canDelete: boolean = true;
    private get server() {
        return (this.$parent as any).server || this.$server;
    }
    private mounted() {
        let parent: any = this.$parent;
        this.canAdd = typeof parent.canAdd === 'boolean' ? parent.canAdd : this.canAdd;
        this.canEdit = typeof parent.canEdit === 'boolean' ? parent.canEdit : this.canEdit;
        this.canPreview = typeof parent.canPreview === 'boolean' ? parent.canPreview : this.canPreview;
        this.canDelete = typeof parent.canDelete === 'boolean' ? parent.canDelete : this.canDelete;
    }

    private view: EFormQuick = EFormQuick.View;
    private editRow: any = null;
    private doAddSuccess() {
        this.view = EFormQuick.View;
        (this.$refs.view as any).reload();
    }
    public reload() {
        (this.$refs.view as any).reload();
    }
    private doAdd(data) {
        (async () => {
            let parent = this.$parent as any;
            let uri = (this.$parent as any).path as any;

            data = parent.postAdd ? (await parent.postAdd(data) || data) : data;
            let result = await this.server.C(uri, data);
            this.doAddSuccess();
        })();
    }
    private doEdit(data) {
        (async () => {
            let parent = this.$parent as any;
            let uri = (this.$parent as any).path as any;

            data = parent.postEdit ? (await parent.postEdit(data) || data) : data;
            let result = await this.server.U(uri, {...data, objectId: data.objectId } );
            this.doAddSuccess();
        })();
    }
    private async prepareEdit(row) {
        let parent = this.$parent as any;
        let goView = this.canPreview ? EFormQuick.Preview : EFormQuick.Edit;
        let func = goView === EFormQuick.Preview ? parent.prePreview : parent.preEdit;
        row = func ? (await func(row) || row) : row;
        this.editRow = { ...row, objectId: row.objectId };
        this.view = goView;
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

    /// rxjs form keeper
    @Observe({  value: () => new BehaviorSubject<any>({})  })
    result: Vue;
    private doFormMounted() {
        (this.$refs.add as any).$observables.result.subscribe( this.$observables.result );
    }
}
export default FormQuick;