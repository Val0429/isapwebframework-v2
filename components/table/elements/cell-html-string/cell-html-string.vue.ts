/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export class CellHtmlString extends Vue {
    @Prop({
        required: true
    })
    value!: any;

    private render(h) {
        return Vue.compile(this.value).render.call(this, h);
    }
}
export default CellHtmlString;
