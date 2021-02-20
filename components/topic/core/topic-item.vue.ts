/*
 * Created on Tue Feb 19 2021
 * Author: Val Liu
 * Copyright (c) 2021, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";
import { generateIcon } from "@/../core/utilities";
import { FindRouter } from "@/../core/router";
import lang from "@/../core/i18n";

@Component
export class TopicItem extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label: string;

    @Prop({
        type: String,
        required: false,
        default: 'primary'
    })
    variant: string;

    @Prop({ type: String, required: false })
    icon: string;

    @Prop({
        type: String,
        required: false
    })
    url: string;

    /// private helper
    private get isExternalLink() {
        return this.url ? Boolean(/^http/.test(this.url)) : false;
    }

    private get currentRouter() {
        let url = this.url;
        if (!url) return;
        let routers = FindRouter({ path: url });
        if (routers.length === 0) return;
        return routers[routers.length - 1];
    }
    private get classIcon() {
        let icon = this.icon;
        if (!icon) {
            let router = this.currentRouter;
            if (!router) return "";
            icon = router.icon;
        }
        return `${generateIcon(icon)} icon`;
    }
    private get generatedLabel() {
        let label = this.label;
        if (label) return label;
        let router = this.currentRouter;
        if (!router) return "";
        return lang.fromTemplatedString(router.name);
    }
    private get classBorder() {
        return `border-item col btn-${this.variant}`;
    }
}
export default TopicItem;