<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/users">
        <i class="material-icons">supervised_user_circle</i>
        <p>Users</p>
      </sidebar-link>
      <sidebar-link to="/gyms">
        <i class="material-icons">accessibility</i>
        <p>Gyms</p>
      </sidebar-link>
      <sidebar-link to="/reviews">
        <i class="material-icons">speaker_notes</i>
        <p>Reviews</p>
      </sidebar-link>
      <sidebar-link to="/cities">
        <i class="material-icons">location_city</i>
        <p>Cities</p>
      </sidebar-link>
      <sidebar-link to="/activities">
        <i class="material-icons">sports_handball</i>
        <p>Activities</p>
      </sidebar-link>
      <sidebar-link to="/achievements">
        <i class="material-icons">emoji_events</i>
        <p>Achievement</p>
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
