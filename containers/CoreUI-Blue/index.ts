/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component } from "vue-property-decorator";
import { CoreUI as CoreUIBase } from './lib/index';
export * from './lib';

/// export for SideBarMenu
import SidebarHeader from './lib/components/Sidebar/SidebarHeader.vue';
import SidebarNav from './lib/components/Sidebar/SidebarNav.vue';
import SidebarNavItem from './lib/components/Sidebar/SidebarNavItem.vue';
import SidebarNavTitle from './lib/components/Sidebar/SidebarNavTitle.vue';
import { SidebarNavDivider } from './node_modules/@coreui/vue';
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
    mounted() {
        const varList = ["--primary", "--secondary", "--success", "--warning", "--info", "--danger", "--light", "--dark"];
        const varSubList = ["", "-100", "-200", "-300", "-400", "-500", "-600", "-700", "-800", "-900", "-yiq"];
        
        let style = getComputedStyle(document.getElementsByClassName("theme-coreui")[0]);
        let todoList = [];
        varList.forEach( v => {
            varSubList.forEach( k => {
                let key = `${v}${k}`;
                todoList.push( () => {
                    document.documentElement.style.setProperty(key, style.getPropertyValue(key));
                });
            });
        });

        const doNext = () => {
            setTimeout(() => {
                let func = todoList.shift();
                if (!func) return;
                func();
                doNext();
            }, 0);
        }
        doNext();
    }
    render(createElement) {
        return createElement(CoreUIBase, {
            slots: this.$slots,
            scopedSlots: this.$scopedSlots
        });
    }
}
export default CoreUI;
