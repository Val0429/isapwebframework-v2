import { Vue, Component } from "vue-property-decorator";
import { CoreUI as CoreUIBase } from './lib/index';
export * from './lib';

/// export for SideBarMenu
import SidebarHeader from './lib/components/Sidebar/SidebarHeader.vue';
import SidebarNav from './lib/components/Sidebar/SidebarNav.vue';
import SidebarNavItem from './lib/components/Sidebar/SidebarNavItem.vue';
import SidebarNavTitle from './lib/components/Sidebar/SidebarNavTitle.vue';
import { SidebarNavDivider } from './lib/node_modules/@coreui/vue';
export { SidebarHeader, SidebarNav, SidebarNavTitle, SidebarNavDivider, SidebarNavItem };

/**
 * SidebarHeader
 * @label - Title text.
 * Or to use as children node.
 */

/**
 * SidebarNav
 * All `Nav` components should be used as its children node.
 */

 /**
 * SidebarNavDivider
 */

 /**
 * SidebarNavTitle
 * @label - Title text.
 */

/**
 * SidebarNavItem
 * @label - Label text.
 * @url - internal ex: /home, or external ex: http://www.google.com
 * @icon - font-awesome (https://fontawesome.com/icons?d=gallery) ex: fa-user, or isap icon ex: isap-icon-edit
 * @data
 * @data .variant - primary | secondary | success | info | danger | warning | black | white
 * @data .badge
 * @data .badge.variant
 * @data .badge.label
 * Can contain children nodes.
 */


/**
 * Simplest container
 */
@Component({
    components: { CoreUIBase }
})
export class CoreUI extends Vue {
    render(createElement) {
        return createElement(CoreUIBase, {
            slots: this.$slots,
            scopedSlots: this.$scopedSlots
        });
    }
}
export default CoreUI;
