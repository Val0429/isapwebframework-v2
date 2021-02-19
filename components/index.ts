export * from './interfaces';

export * from './i18n';
export * from './transitions';
export * from './utilities';
export * from './toolbox';
export * from './form';
export * from './table';
export * from './step-progress';
export * from './cards';
export * from './modal';
export * from './topic';

import Vue from 'vue';

/// register components
const requireComponent = require.context(
    "./../components",
    true,
    /\/.*\.vue?$/
);

const componentsNameMap = {};

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentName = `iv-${fileName.split("/").pop().replace(/\.vue$/, "")}`;

    Vue.component(
        componentName,
        componentConfig.default || componentConfig
    );
});