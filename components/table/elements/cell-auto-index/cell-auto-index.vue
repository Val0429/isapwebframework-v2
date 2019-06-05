<template>
    <fragment>
    {{ $attrs.index + (($attrs.paging.page || 1) - 1) * ($attrs.paging.pageSize || 0) + 1 }}
    </fragment>
</template>

<script lang="ts" src="./cell-auto-index.vue.ts" />
