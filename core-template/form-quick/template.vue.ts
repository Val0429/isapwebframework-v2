import { EFormQuick, IFormQuick } from '@/../components/form/helpers/form-quick';
import { Vue, Component, Prop, Model } from "vue-property-decorator";

export class Test extends Vue implements IFormQuick {
    path: string = "/announcements";
    tView: string = "View";
    tAdd: string = "Add";
    tPreview: string = "Preview";
    tEdit: string = "Edit";
    inf(type: EFormQuick): string {
        return;
    }
}
export default Test;