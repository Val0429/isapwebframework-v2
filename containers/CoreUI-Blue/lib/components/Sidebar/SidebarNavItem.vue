<template>
    <li v-if="$slots.default" :class="{ 'nav-item': true, 'nav-dropdown': true, open: innateOpen }" :to="url" disabled>
        <div class="nav-link nav-dropdown-toggle" style="cursor: pointer">
            <div class="row dropdown-container">
                <!-- <div style="flex: 1">
                    <i :class="classIcon"></i> {{getLabel()}}
                </div> -->
                <div v-if="!hasComponent" style="flex: 1" :class="classList()" @click="handleClick">
                    <i :class="classIcon"></i> {{getLabel()}}
                </div>
                <element v-else
                    style="flex: 1"
                    :is="isExternalLink ? 'a' : 'router-link'"
                    :href="url" :to="url"
                    :class="classList()"
                    >
                    <i :class="classIcon"></i> {{getLabel()}}
                </element>

                <div class="dropdown-btn" @click="handleClick" />
            </div>
        </div>
        <ul class="nav-dropdown-items">
            <slot></slot>
        </ul>
    </li>
    <SidebarNavItemCore v-else>
        <SidebarNavLinkCore :name="getLabel()" :url="url" :icon="icon" :data="data" />
    </SidebarNavItemCore>
</template>


<script lang="ts">
/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { SidebarNavItem as SidebarNavItemCore } from '@coreui/vue';
import SidebarNavLinkCore from './private/SidebarNavLink.vue';
import { FindRouter } from '@/../core/router';

interface IData {
    variant?: string;
    badge?: {
        label?: string;
        variant?: string;
    }
}

@Component({
    components: { SidebarNavItemCore, SidebarNavLinkCore }
})
export default class SidebarNavItem extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label: string;

    @Prop({
        type: String,
        required: true
    })
    url: string;

    @Prop({
        type: String,
        required: false
    })
    icon: string;

    @Prop({
        type: Boolean,
        default: true
    })
    open: boolean;

    @Prop({
        type: Object,
        required: false,
    })
    data: IData;

    /// private helper
    private innateOpen: boolean = true;
    @Watch("open", {immediate: true})
    private onOpenChanged(newval: boolean, oldval: boolean) {
        if (newval === oldval) return;
        this.innateOpen = newval;
    }

    private handleClick(e) {
        e.preventDefault();
        this.innateOpen = !this.innateOpen;
        //e.target.parentElement.classList.toggle('open');
    }

    private getLabel(): string {
        if (this.label) return this.label;
        let routers = FindRouter({ path: this.url });
        return routers.length === 0 ? '' : this.parseName(routers[routers.length-1].name);
    }

    private parseName(name): string {
        let regex = /_\(\'*(.*)\'\)/;
        if (!name) return name;
        let matches = name.match(regex);
        if (!matches || matches.length < 2) return name;
        return this._(matches[1]);
    }

    private get classIcon() {
        let classes = ['nav-icon', 'fa'];
        let icon = this.icon;
        if (!icon) {
            let routers = FindRouter({ path: this.url });
            if (routers.length === 0) return classes;
            icon = routers[routers.length-1].icon;
        }
        if (!icon) return classes;
        if (/^isap/.test(icon)) classes.push('isap-icon');
        classes.push(icon);
        return classes;
    }

    private get hasComponent () {
      /// function: has component
      /// object: router
      let routers = FindRouter({ path: this.url });
      if (routers.length === 0) return false;
      let router = routers[0];
      return router.component != undefined;
    }

    private get isExternalLink() {
        return Boolean(/^http/.test(this.url));
    }

    private classList() {
        return [
            'nav-link'
        ];
    }
}
</script>

<style lang="scss" scoped>
.nav-item /deep/ .nav-item {
    text-indent: 8px;
}
/deep/ .nav-icon {
    min-width: 1.3rem;
}
.dropdown-container {
    margin-top: -12px;
    margin-bottom: -12px;
    .dropdown-btn {
        position: absolute;
        right: 0;
        top: 0;
        width: 45px;
        height: 45px;
    }
}
</style>