<template>
    <fragment>
    {{ value ? new Date(value).toLocaleString() : '' }}
    </fragment>
</template>


<script lang="ts" src="./cell-date.vue.ts" />
