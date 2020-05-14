import Container from '@/config/default/container';
import { Component, Vue } from 'vue-property-decorator';
import { RetrieveTheme, Theme } from '@/../core/theme';
import { BrowserBlock } from './browser-block/index.vue';

@Component({
    components: { BrowserBlock },
})
export default class MainApp extends Vue {
    private step() {
        //this.steps[this.$theme.name];
        return this.steps.indexOf(this.$theme.name);
    }
    private get steps() {
        let themeList = Theme.list();
        return Object.keys(themeList).reduce((final, value) => {
            let themeUnit = themeList[value];
            final.push(themeUnit.element.name);
            return final;
        }, []);
    }
    private get browserReject(): boolean {
        // let browser = (this as any).$browserDetect;
        // if (browser.isIE) return true;
        return false;
    }
}
