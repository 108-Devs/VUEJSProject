<template>
  <div class="home">
    <v-card
        style="margin-top: 20px;"
        class="mx-auto"
        max-width="400"
    >
        <v-card-title class="d-flex justify-center" style="font-size: 30px;">
           Home
        </v-card-title>
        <v-card-text>
        <v-btn
            color="green"
            @click="goToBlocks()"
            block
            style="color: white;"
        >
            Create EQR for Blocks
        </v-btn>
        <br>
        <v-btn
            color="green"
            @click="goToResidents()"
            block
            style="color: white;"
        >
            Create EQR for Residents
        </v-btn>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goToResidents() {
      this.$router.push({name: 'CreateQRForResidents'})
    },
    goToBlocks() {
      this.$router.push({name: 'CreateQRForBlocks'})
    },

  }
}
</script>
