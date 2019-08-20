/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export class CellDate extends Vue {
    @Prop({ type: String, required: false, default: '' })
    format: string;

    @Prop({
        required: true,
    })
    value!: any;

    valueString(): string {
        try {
            if (!this.value) {
                return '';
            }
            if (this.format == '') {
                return new Date(this.value).toLocaleString();
            }
            if (this.format == 'ISO') {
                return new Date(this.value).toISOString();
            }
            return this.DateToString(new Date(this.value), this.format);
        } catch (e) {
            console.log('cell-date, error: ', e);
            return '';
        }
    }

    DateToString(dateTime: Date, format: string): string {
        let _formats: string[] = ['dddd', 'ddd', 'DD', 'D', 'hh', 'h', 'HH', 'H', 'mm', 'm', 'MMMM', 'MMM', 'MM', 'M', 'ss', 's', 'A', 'a', 'YYYY', 'YY', 'ZZ', 'Z'];
        let _days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let _months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let _timeNames: string[] = ['am', 'pm', 'AM', 'PM'];

        let regex: RegExp = this.Array2RegExp(_formats);

        let formats: string[] = format.match(regex) || [];
        let spaces: string[] = format.split(regex);

        let year: number = dateTime.getFullYear();
        let month: number = dateTime.getMonth();
        let day: number = dateTime.getDay();
        let date: number = dateTime.getDate();
        let hour: number = dateTime.getHours();
        let minute: number = dateTime.getMinutes();
        let second: number = dateTime.getSeconds();
        let offset: number = dateTime.getTimezoneOffset() + 30;

        let dateStr: string = '';
        for (let i: number = 0; i < spaces.length; i++) {
            switch (formats[i - 1]) {
                case 'dddd':
                    dateStr += _days[day + 7];
                    break;
                case 'ddd':
                    dateStr += _days[day];
                    break;
                case 'DD':
                    dateStr += this.PadLeft(date.toString(), '0', 2);
                    break;
                case 'D':
                    dateStr += date.toString();
                    break;
                case 'hh':
                    dateStr += this.PadLeft((hour % 12 || 12).toString(), '0', 2);
                    break;
                case 'h':
                    dateStr += (hour % 12 || 12).toString();
                    break;
                case 'HH':
                    dateStr += this.PadLeft(hour.toString(), '0', 2);
                    break;
                case 'H':
                    dateStr += hour.toString();
                    break;
                case 'mm':
                    dateStr += this.PadLeft(minute.toString(), '0', 2);
                    break;
                case 'm':
                    dateStr += minute.toString();
                    break;
                case 'MMMM':
                    dateStr += _months[month + 12];
                    break;
                case 'MMM':
                    dateStr += _months[month];
                    break;
                case 'MM':
                    dateStr += this.PadLeft((month + 1).toString(), '0', 2);
                    break;
                case 'M':
                    dateStr += (month + 1).toString();
                    break;
                case 'ss':
                    dateStr += this.PadLeft(second.toString(), '0', 2);
                    break;
                case 's':
                    dateStr += second.toString();
                    break;
                case 'A':
                    dateStr += hour < 12 ? _timeNames[2] : _timeNames[3];
                    break;
                case 'a':
                    dateStr += hour < 12 ? _timeNames[0] : _timeNames[1];
                    break;
                case 'YYYY':
                    dateStr += year.toString();
                    break;
                case 'YY':
                    dateStr += year.toString().slice(2);
                    break;
                case 'ZZ':
                    dateStr += (offset > 0 ? '-' : '+') + this.PadLeft((Math.floor(Math.abs(offset) / 60) * 100 + (Math.abs(offset) % 60)).toString(), '0', 4);
                    break;
                case 'Z':
                    dateStr += `${offset > 0 ? '-' : '+'}${Math.abs(offset / 60).toString()}`;
                    break;
            }

            dateStr += spaces[i];
        }

        return dateStr;
    }

    /**
     * String pad left some char
     * @param str
     * @param char
     * @param length
     */
    PadLeft(str: string, char: string, length: number): string {
        while (str.length < length) {
            str = `${char}${str}`;
        }
        return str;
    }

    /**
     * Convert string array to RegExp
     * @param array
     */
    Array2RegExp(...array: string[][]): RegExp {
        let strs: string[] = [];
        strs = strs.concat(...array);
        let regex: string = '';
        for (let str of strs) {
            regex += `${str}|`;
        }
        regex = regex.replace(/\|$/, '');
        return new RegExp(regex, 'g');
    }
}
export default CellDate;
Vue.component('cell-date', CellDate);
