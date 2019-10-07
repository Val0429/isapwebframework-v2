<template>
    <SidebarHeaderCore>
        <template v-if="$slots.default">
            <slot />
        </template>
        <template v-else-if="label">
            {{ label }}
        </template>
    </SidebarHeaderCore>
</template>


<script lang="ts">
/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Component, Vue, Prop } from 'vue-property-decorator';
import { SidebarHeader as SidebarHeaderCore } from '@coreui/vue';

@Component({
    components: { SidebarHeaderCore }
})
export default class SidebarHeader extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label: string;

    private test() {}
}
</script>
