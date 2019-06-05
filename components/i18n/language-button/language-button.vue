<template>
        <b-dropdown v-bind:text="languageList[lang]" variant="primary" class="m-md-2">
            <b-dropdown-item v-bind:key="key" v-for="(value, key) in languageList"
                             v-bind:active="lang === key"
                             v-on:click="updateLanguage(key)"
                             >
                {{ value }}
            </b-dropdown-item>
        </b-dropdown>
</template>

<script src="./language-button.vue.ts" />

