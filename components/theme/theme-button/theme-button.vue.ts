/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";
import { RetrieveTheme, Theme } from '@/../core/theme';

@Component
export class ThemeButton extends Vue {
    @Model('change', {
        type: String,
        required: false
    })
    value: string;

    private theme(): string {
        let themeUnit = RetrieveTheme(this.$theme);
        return themeUnit ? themeUnit.key : undefined;
    }
    private get themeList() {
        let themeList = Theme.list();
        return Object.keys(themeList).reduce( (final, key) => {
            const themeUnit = themeList[key];
            final[themeUnit.key] = themeUnit.name;
            return final;
        }, {});
    }
    private updateTheme(key: string) {
        let themeList = Theme.list();
        (this.$observables.$theme as any).next(themeList[key].element);
    }
}
export default ThemeButton;