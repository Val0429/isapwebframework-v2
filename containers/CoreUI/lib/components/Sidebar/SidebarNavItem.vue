<template>
    <li v-if="$slots.default" class="nav-item nav-dropdown" :to="url" disabled>
        <div class="nav-link nav-dropdown-toggle" @click="handleClick"><i :class="classIcon"></i> {{getLabel()}}</div>
        <ul class="nav-dropdown-items">
            <slot></slot>
        </ul>
    </li>
    <SidebarNavItemCore v-else>
        <SidebarNavLinkCore :name="getLabel()" :url="url" :icon="icon" :data="data" />
    </SidebarNavItemCore>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
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
        type: Object,
        required: false,
    })
    data: IData;

    private handleClick(e) {
        e.preventDefault()
        e.target.parentElement.classList.toggle('open');
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
            if (routers.length === 0) return;
            icon = routers[routers.length-1].icon;
        }
        if (!icon) return;
        if (/^isap/.test(icon)) classes.push('isap-icon');
        classes.push(icon);
        return classes;
    }
}
</script>
