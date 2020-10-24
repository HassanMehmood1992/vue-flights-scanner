<template>
  <v-app>
    <v-progress-linear
      :active="topLoader"
      :indeterminate="topLoader"
      absolute
      top
      color="white"
      style="z-index: 9;"
      height="3"
    ></v-progress-linear>

    <v-app-bar fixed app color="primary" dark :height="50">
      <v-icon color="white" class="mx-2" style="border-radius: 100%;"
        >mdi-airplane</v-icon
      >
      <v-toolbar-title v-text="title" />

      <v-spacer></v-spacer>

      <div class="body-2 mr-2">
        Hassan Mehmood
      </div>

      <v-avatar :size="35" class="secondary">
        <span>H</span>
      </v-avatar>
    </v-app-bar>

    <v-main>
      <vue-perfect-scrollbar
        class="drawer-menu--scroll"
        :settings="scrollSettings"
      >
        <v-container fluid class="pt-0" id="page-wrapper">
          <nuxt />
        </v-container>
      </vue-perfect-scrollbar>
      <snackbar />
    </v-main>
    
  </v-app>
</template>
<script>
export default {
  data: () => ({
    clipped: false,
    drawer: true,
    fixed: false,
    miniVariant: false,
    userprofileMenu: false,
    right: true,
    rightDrawer: false,
    title: "Flight Scanner",
    notificationsCount: 0,
    scrollSettings: {
      maxScrollbarLength: 160
    }
  }),
  head() {
    return {
      titleTemplate: "Flight"
    };
  },
  computed: {
    menuItems() {
      return this.$pluginsData.mainMenu;
    },
    topLoader() {
      return this.$store.getters["pageHeader/getTopLoader"];
    }
  },
  created() {
    // Register the events
    window.getApp = this;
  },
  mounted() {},
  methods: {},
  watch: {
    $route() {
      const container = document.querySelector("#page-wrapper");
      container.scrollTop = 0;
    }
  }
};
</script>
<style lang="scss">
.main-navigation {
  a:hover {
    text-decoration: none;
  }
}
.hover:hover {
  background: #fefefe;
  cursor: pointer;
  width: 97%;
}
.mini-variant-wrap {
  position: absolute !important;
  bottom: 30px !important;
  left: 22px;

  &.close {
    left: 15px;
  }
}

.mini-variant-wrap2 {
  position: absolute !important;
  bottom: 10px !important;
  left: 22px;
}

.mini-variant-wrap3 {
  position: absolute !important;
  bottom: 60px !important;
}

.scroll-area {
  height: calc(100vh - 102px);
}
.notification-badge {
  .v-badge__badge {
    font-size: 10px !important;
    left: -15px !important;
  }
}
</style>
