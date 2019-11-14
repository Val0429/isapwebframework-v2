/*
 * Created on Tue Nov 14 2019
 * Author: Ben Li
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";

// Core
import { generateEXIFrontImage } from "@/../core/utilities";

@Component
export class IVImage extends Vue {
    @Prop({
        type: [String, File]
    })
    src: string | File;

    private innerSrc = null;
    @Watch("src", { immediate: true })
    async onSrcChanged(newval: string | File) {
        /// 判斷newval是否url
        let regex = /^http/;
        if (typeof newval === "string" && regex.test(newval)) {
            let url = newval;
            /// 若是，request取回其值
            newval = await new Promise((resolve, reject) => {
                fetch(url)
                    .then(resp => resp.blob())
                    .then(blob => {
                        let reader = new FileReader();
                        reader.onload = function () { resolve(this.result as string) };
                        reader.readAsDataURL(blob);
                    })
                    .catch(err => reject(err));
            });
        }
        let data = await generateEXIFrontImage(newval);
        this.innerSrc = data;
    }
}
export default IVImage;