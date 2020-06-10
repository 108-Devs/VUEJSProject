<template>
  <v-app>
    <v-app-bar
      app
      color="red"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          class="shrink mr-2"
          contain
          src="./assets/scdf_logo.png"
          transition="scale-transition"
          width="90"
        />
        <h2>EMERGENCY QR</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
       <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
