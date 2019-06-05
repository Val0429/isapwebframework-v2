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
        type: Date,
        required: false,
    })
    value!: Date;

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
        return `${this.value.getFullYear()}-${this.padLeft(this.value.getMonth()+1, 2)}-${this.padLeft(this.value.getDate(), 2)}`;
    }

    private get inputTime(): string {
        if (!this.value) return '';
        return `${this.padLeft(this.value.getHours(), 2)}:${this.padLeft(this.value.getMinutes(), 2)}:${this.padLeft(this.value.getSeconds(), 2)}`;
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
        let newdate = new Date(this.value);
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