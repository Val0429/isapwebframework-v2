import { Component, Vue } from 'vue-property-decorator';
import images from './images';

@Component
export class BrowserBlock extends Vue {
    private images = images;
}
export default BrowserBlock;