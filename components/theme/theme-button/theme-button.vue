<template>
        <b-dropdown :text="_(themeList[theme()])" variant="primary" class="m-md-2">
            <b-dropdown-item :key="key" v-for="(value, key) in themeList"
                             :active="theme() === key"
                             @click="updateTheme(key)"
                             >
                {{ _(value) }}
            </b-dropdown-item>
        </b-dropdown>
</template>

<script src="./theme-button.vue.ts" />

