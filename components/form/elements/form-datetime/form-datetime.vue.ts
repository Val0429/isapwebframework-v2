/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";

export enum FormDatetimeType {
    Date = 'date',
    Datetime = 'datetime',
    Time = 'time'
}

@Component
export class FormDatetime extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label!: string;

    @Model('input', {
        type: [Date, String],
        required: false,
    })
    value!: Date | string;

    @Prop({
        type: String,
        required: false,
        default: FormDatetimeType.Datetime
    })
    type!: FormDatetimeType;

    @Prop({ type: String, required: false })
    invalid!: string;

    /// private helpers
    private get inputDate(): string {
        if (!this.value) return '';
        let date = this.value instanceof Date ? this.value : new Date(this.value);
        return `${date.getFullYear()}-${this.padLeft(date.getMonth() + 1, 2)}-${this.padLeft(date.getDate(), 2)}`;
    }

    private get inputTime(): string {
        if (!this.value) return '';
        let date = this.value instanceof Date ? this.value : new Date(this.value);
        return `${this.padLeft(date.getHours(), 2)}:${this.padLeft(date.getMinutes(), 2)}:${this.padLeft(date.getSeconds(), 2)}`;
    }

    private dateChanged(dateText: string) {
        let current = new Date(dateText);
        let newdate = new Date(this.value);
        newdate.setFullYear(current.getFullYear());
        newdate.setMonth(current.getMonth());
        newdate.setDate(current.getDate());
        this.$emit('input', newdate);
    }

    private timeChanged(timeText: string) {
        let current = new Date(`2000-01-01 ${timeText}`);
        let newdate = this.value === undefined ? new Date(current) : new Date(this.value);
        newdate.setHours(current.getHours());
        newdate.setMinutes(current.getMinutes());
        newdate.setSeconds(current.getSeconds());
        this.$emit('input', newdate);
    }

    private padLeft(number: number | string, width: number, token: string = '0'): string {
        let strNumber: string = number + '';
        return strNumber.length >= width ? strNumber : new Array(width - strNumber.length + 1).join(token) + strNumber;
    }
}
export default FormDatetime;