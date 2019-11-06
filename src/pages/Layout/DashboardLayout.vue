<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/users">
        <md-icon>supervised_user_circle</md-icon>
        <p>Users</p>
      </sidebar-link>
      <sidebar-link to="/gyms">
        <md-icon>accessibility</md-icon>
        <p>Gyms</p>
      </sidebar-link>
      <sidebar-link to="/reviews">
        <md-icon>speaker_notes</md-icon>
        <p>Reviews</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">

      <div class="d-flex justify-content-between flex-column min-vh-100">
        <div>
          <top-navbar></top-navbar>

          <dashboard-content></dashboard-content>
        </div>

        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>


    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  }
};
</script>
