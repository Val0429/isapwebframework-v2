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
