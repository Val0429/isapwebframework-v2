/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

/// install style
import "./core/scss/style.scss";

import Vue from 'vue';
import router from '@/../core/router';


/// components //////////////////////////////
/// install `select2`
import 'select2';
import 'select2/dist/css/select2.min.css';
import 'select2-bootstrap-theme/dist/select2-bootstrap.min.css';

/// install core components
import "./components";
import "@/components";
/////////////////////////////////////////////


/// plugins /////////////////////////////////
/// install vuerx support
import VueRx from 'vue-rx';
Vue.use(VueRx);

/// install theme support
import { ThemePlugin } from './core/private/plugins/theme';
Vue.use(ThemePlugin);

/// install language support
import { LangPlugin } from './core/i18n';
Vue.use(LangPlugin);

/// install form support
import { FormPlugin } from './core/private/plugins/form';
Vue.use(FormPlugin);

/// install life cycle support
import { LifeCyclesPlugin } from './core/private/plugins/life-cycles';
Vue.use(LifeCyclesPlugin);

/// install modal support
import { ModalPlugin } from './core/private/plugins/modal';
Vue.use(ModalPlugin);

/// install auth support
import { AuthPlugin } from './core/private/plugins/authentication';
Vue.use(AuthPlugin);

/// install fragment support
let Fragment = require('vue-fragment');
Vue.use(Fragment.Plugin);

/// install bootstrap ui support
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';
Vue.use(BootstrapVue);
/////////////////////////////////////////////


/// install shells //////////////////////////
/// install modal response
import '@/../core/private/shells';
/////////////////////////////////////////////


import '@/main';
/// make sure `views` are imported for route
import '@/views';

/// load config
import MainApp from '@/../core/private/main-app/index.vue';
(async () => {
    new MainApp({
        router: await router
    }).$mount('#app');
})();

import "@/scss/styles.scss";