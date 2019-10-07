<template>
  <li class="nav-title">
    <template v-if="$slots.default">
        <slot />
    </template>
    <template v-else>
      {{label}}
    </template>
  </li>
</template>

<script lang="ts">
/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export class SidebarNavTitle extends Vue {
    @Prop({
        type: String,
        required: false
    })
    label: string;
}
export default SidebarNavTitle;
</script>
