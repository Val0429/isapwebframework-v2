/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Watch, Emit } from "vue-property-decorator";
import { ServerName } from '@/../core/server';

interface IResponse {
    body: string;
    res: {
        statusCode: number;
    }
}

interface IError {
    err: {
        message: string;
    }
}

interface IResponseObject {
    uri: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    response: IResponse | IError;
}

@Component
export class ModalResponse extends Vue {
    @Prop({ type: Boolean, required: false })
    visible: boolean;

    @Prop({ type: Object, required: true })
    value: IResponseObject;

    @Emit('update:visible')
    doUpdateVisible(value: boolean) { return value; }
    
    /// private helpers //////////////////////////////
    private serverName: string = ServerName;
    private get Code() {
        return (this.value as any).response.res ? (this.value as any).response.res.statusCode : 0;
    }
    private get Title() {
        return this._(`mb_${this.Code}` as any);
    }
    private get Content() {
        return `
        <b>Url</b> - ${this.value.method} ${this.value.uri}<BR />
        ${this._(`mb_${this.Code}_message` as any, [this.Code])}
        `
    }
    //////////////////////////////////////////////////
}
export default ModalResponse;