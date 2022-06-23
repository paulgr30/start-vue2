<template>
  <body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
      <!-- <Preloader></Preloader> -->
      <Navbar></Navbar>
      <Sidebar></Sidebar>

      <div class="content-wrapper">
        <ContentHeader></ContentHeader>

        <section class="content">
          <div class="container-fluid">
            <router-view v-slot="{ Component }">
              <transition name="fade">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </section>
      </div>

      <Footer></Footer>
      <ControlSidebar></ControlSidebar>
    </div>
  </body>
</template>

<script>
//import $ from 'jquery'

//import Preloader from "./Preloader.vue"
import ContentHeader from "./ContentHeader.vue";
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import Footer from "./Footer.vue";
import ControlSidebar from "./ControlSidebar.vue";

export default {
  name: "Container",
  components: {
    //Preloader,
    ContentHeader,
    Navbar,
    Sidebar,
    Footer,
    ControlSidebar,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
</style>
