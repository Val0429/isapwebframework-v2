/*
 * Created on Tue Nov 19 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";

@Component
export class FontSize extends Vue {
    @Model('input', {
        type: [String],
        required: false,
    })
    value: string;

    /// private helper
    private defaultFontSize = "20";
    private possibleFontSizes = [
        "8", "9", "10", "11", "12", "14", "18", "24", "30", "36", "48", "60", "72", "96"
    ];
    private get currentFontSize(): string {
        return this.value || this.defaultFontSize;
    }
}
export default FontSize;