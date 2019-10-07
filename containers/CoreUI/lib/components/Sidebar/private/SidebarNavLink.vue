<template>
    <div v-if="isInvalid()" :class="classList()">
        {{ url }}
    </div>
    <element
        v-else
        :is="isExternalLink ? 'a' : 'router-link'"
        :href="url" :to="url"
        :class="classList()"
        >
            <i :class="classIcon"></i> {{getLabel()}}
            <b-badge v-if="data.badge && data.badge.label" pill :variant="data.badge.variant">{{data.badge.label}}</b-badge>
    </element>
</template>

<script lang="ts">
/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import lang from '@/../core/i18n';
import { FindRouter } from '@/../core/router';
import { sjPermissions } from '@/../core/private/plugins/authentication';
import { filter } from 'rxjs/operators';
import { isObjectEmpty } from '@/../core/utilities';
let config = require('@/config/default/debug');

interface IData {
    variant?: string;
    badge?: {
        label?: string;
        variant?: string;
    }
}

@Component
export class SidebarNavLink extends Vue {
    @Prop({
        type: String,
        required: true
    })
    name: string;

    @Prop({
        type: String,
        required: false
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
        default: () => ({})
    })
    data: IData;

    /// badge, variant
    /// private helpers
    private get isExternalLink() {
        return Boolean(/^http/.test(this.url));
    }

    private isBlocked() {
        /// 1) allow external link
        if (this.isExternalLink) return false;
        let routers = FindRouter({ path: this.url });
        if (routers.length === 0) return false;
        let router = routers[routers.length - 1];
        /// 2) allow non permission
        let permission = router.permission;
        if (permission === false) return false;
        /// 3) default: true | undefined, check login status
        if (permission === true || permission === undefined) {
            if (isObjectEmpty(this.$permissions)) return true;
            //if (!this.$permissions) return true;
            return false;
        }
        /// 4) check permission
        return !((this.$permissions || {})[permission as string] || {})['Get'];
    }

    private isInvalid() {
        let routers = FindRouter({ path: this.url });
        return routers.length === 0;
    }

    private classList() {
        return [
            'nav-link',
            this.data && this.data.variant ? `nav-link-${this.data.variant}` : '',
            this.isBlocked() ? (
                config.prodMode || !config.showNonePermissionBlock ? 'blocked-prod' : 'blocked'
            ) : '',
            this.isInvalid() ? (
                config.prodMode || !config.showNonePermissionBlock ? 'invalid-prod' : 'invalid'
            ) : '',
        ]
    }

    private getLabel(): string {
        if (this.name) return this.name;
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

    private handleClick(e) {
        e.preventDefault()
        e.target.parentElement.classList.toggle('open');
    }

    private static subscription;
    private subs;
    private created() {
        this.subs = sjPermissions.pipe( filter(v=>v) ).subscribe( (v) => {
            this.$forceUpdate();
        });

        /// do only once
        if (SidebarNavLink.subscription) return;
        SidebarNavLink.subscription = lang.getObservable()
            .subscribe( (value) => {
                document.documentElement.style
                    .setProperty('--permission-denied', `"${lang.translate("mb_PermissionDenied")}"`);
                document.documentElement.style
                    .setProperty('--content-invalid', `"${lang.translate("mb_ContentInvalid")}"`);
            });
    }
    private destroyed() {
        this.subs && this.subs.unsubscribe();
    }
}
export default SidebarNavLink;
</script>

<style lang="scss" scoped>
.nav-icon {
    position: relative;
    top: 0.05rem;
}
.blocked-prod, .invalid-prod {
    display: none;
}
.invalid {
    position: relative;
    background: var(--warning) !important;
    border: 2px dashed var(--danger);
    pointer-events: none;
}
.invalid::after {
    position: absolute;
    right: 3px; bottom: 0;
    font-size: 10px;
    color: var(--light);
    content: var(--content-invalid) !important;
}

.blocked {
    position: relative;
    background: var(--danger) !important;
    border: 2px dashed var(--info);
    pointer-events: none;
}
.blocked::after {
    position: absolute;
    right: 3px; bottom: 0;
    font-size: 10px;
    color: var(--light);
    content: var(--permission-denied) !important;
}
</style>

<style lang="scss">
@media (min-width: 992px) {
    .sidebar-nav {
        .nav {
            .sidebar-minimized {
                .invalid::after {
                    content: "" !important;
                }
                .blocked::after {
                    content: "" !important;
                }
            }
        }
    }
}
</style>
