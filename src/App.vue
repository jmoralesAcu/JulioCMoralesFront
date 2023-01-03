<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Cesar Morales Acuna</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view :key="$route.fullPath"></router-view>
      </v-container>
    </v-main>
    <v-row justify="center">
      <v-dialog v-model="Dialog" persistent max-width="300">
        <v-card color="#eaeaea">
          <v-card-text class="text-center py-3">
            <span style="color: #d30000">Su solicitud está siendo procesada.</span>
            <br />
            <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false
  }),
  computed: {
    Dialog() {
      return this.$store.state.dialog
    }
  }
}
</script>
