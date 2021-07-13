<template>
  <div class="app" id="app">

    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="/">
        <!-- <img class="navbar-brand-full" src="img/brand/logo.svg" width="89" height="25" alt="Logo">
        <img class="navbar-brand-minimized" src="img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo"> -->
        <slot name="logo">
          <img class="navbar-brand-full" src="/logo.png" width="89" height="25" alt="Logo">
        </slot>
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />

      <div class="header-container">
        <slot name="header">
            Use &lt;template #header /&gt; to define Header.
        </slot>
      </div>

      <!-- <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>
        <b-nav-item class="px-3">Settings</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-list"></i>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-location-pin"></i>
        </b-nav-item>
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav> -->

      <!-- <b-navbar-nav class="ml-auto" /> -->

      <!-- <AsideToggler class="d-none d-lg-block" /> -->
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>

        <slot name="nav">
          <SidebarNav>
          Use &lt;template #nav /&gt; to define Nav.
          </SidebarNav>
        </slot>

        <!-- <SidebarHeader />
        <SidebarForm />
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter /> -->
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb class="bread-crumb" :list="list"/>
          <iv-scrollbar ref="scrollbar" class="scroll-area" :settings="psSettings">
            <div class="container-fluid">
              <iv-fade-slide>
                <router-view></router-view>
              </iv-fade-slide>
            </div>
          </iv-scrollbar>
      </main>
      <AppAside fixed>
        <!--aside-->
        <!-- <DefaultAside/> -->
      </AppAside>
    </div>
    <TheFooter class="footer">
      <!--footer-->
      <slot name="footer">
          Use &lt;template #footer /&gt; to define Footer.
      </slot>

      <!-- <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://coreui.io">CoreUI for Vue</a>
      </div> -->
    </TheFooter>

  </div>
</template>

<script>
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, /*SidebarNav,*/ Aside as AppAside, AsideToggler, Footer as TheFooter } from '@coreui/vue';
import SidebarNav from './../components/Sidebar/SidebarNav.vue';
import Breadcrumb from './../components/Breadcrumb/Breadcrumb.vue';
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    VuePerfectScrollbar
  },
  data () {
    return {
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.path )
    },
    psSettings () {
      // ToDo: find better rtl fix
        return {
            maxScrollbarLength: 200,
            minScrollbarLength: 40,
            suppressScrollX: getComputedStyle(document.querySelector('html')).direction !== 'rtl',
            wheelPropagation: false,
            interceptRailY: styles => ({ ...styles, height: 0 })
        }
    }
  },
  watch: {
    $route(to, from) {
      let scrollbar = this.$refs['scrollbar'];
      if (!scrollbar) return;
      scrollbar.top();
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  overflow: hidden;
  height: 100vh;
}
.bread-crumb {
  position: fixed !important;
  z-index: 100;
  width: 100%;
}
.scroll-area {
  position: relative;
  height: calc(100vh - 35px - 45px);
}
.container-fluid {
  position: relative;
  box-sizing: border-box;
  margin-top: 4rem;
  margin-bottom: 50px;
}
.main {
  overflow: hidden;
}
.header-container {
  flex: 1;
}
.footer {
  position: fixed !important;
  bottom: 0;
  z-index: 1020;
  width: 100%;
  height: 35px;
}
</style>

<style lang="css">
.ps__scrollbar-y-rail {
  z-index: 2000;
}
</style>