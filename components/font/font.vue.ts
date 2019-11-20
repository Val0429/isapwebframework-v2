/*
 * Created on Tue Nov 19 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";

@Component
export class Font extends Vue {
    @Model('input', {
        type: [String],
        required: false,
    })
    value: string;

    /// private helper
    private defaultFont = "微軟正黑體";
    private possibleFonts = [
        "微軟正黑體",
        "Arial",
        "Calibri",
        "Century Gothic",
        "Helvetica",
        "Verdana",
        "Georgia",
        "Times New Roman",
        "Courier New"
    ];
    private get currentFont(): string {
        return this.value || this.defaultFont;
    }
}
export default Font;