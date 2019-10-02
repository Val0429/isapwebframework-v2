/*
 * Created on Tue Aug 19 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";
import lang from '@/../core/i18n';
import { MetaParser, IMetaResult } from "@/../core/server/parser/meta-parser";

@Component
export class CellMultiple extends Vue {
    @Prop({
        type: Array,
        required: false,
        default: () => []
    })
    value: any[];

    @Prop({ required: true })
    elementType: string;
}
export default CellMultiple;