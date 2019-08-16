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

import Vue from 'vue';

/// register components
const requireComponent = require.context(
    "./../components",
    true,
    /\/.*\.vue?$/
);

const componentsNameMap = {};
export function registerComponentByName(name: string, config: any) {
    componentsNameMap[name] = config.default || config;
}
export function getComponentByName(name: string) {
    return componentsNameMap[name];
}

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentName = `iv-${fileName.split("/").pop().replace(/\.vue$/, "")}`;

    registerComponentByName(componentName, componentConfig);

    Vue.component(
        componentName,
        componentConfig.default || componentConfig
    );
});