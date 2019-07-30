/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import lang from '@/../core/i18n';

@Component
export class FormFile extends Vue {
    @Prop({ type: String, required: false })
    label!: string;

    @Prop({ type: String, required: false })
    placeholder!: string;

    @Prop({ type: String, required: false })
    dropPlaceholder!: string;

    @Prop({ type: String, required: false })
    invalid!: string;

    @Prop({ type: Boolean, required: false, default: false })
    multiple: boolean;

    @Model('input', { required: false })
    value!: string | string[];

    private get innateValue() {
        return this.value instanceof File ? this.value : null;
    }

    private static subscription;
    created() {
        /// do only once
        if (FormFile.subscription) return;
        FormFile.subscription = lang.getObservable()
            .subscribe( (value) => {
                document.documentElement.style
                    .setProperty('--browse-text', `"${lang.translate("wb_Browse")}"`);
            });
    }
}
export default FormFile;