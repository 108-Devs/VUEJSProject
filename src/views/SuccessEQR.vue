<template>
  <div>
    <v-card
        style="margin-top: 20px;"
        class="mx-auto"
        max-width="400"
    >
        <v-card-title class="d-flex justify-center" style="font-size: 30px;">
           EQR Generation Success!
        </v-card-title>
        <div class="d-flex justify-center">
            <qrcode-vue :value="this.url" size="300" level="H"></qrcode-vue>
        </div>
        <v-card-actions>
        <v-btn
            color="green"
            @click="createEmergencyResponseLocation"
            block
            style="color: white;"
        >
            Download Emergency QR
        </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import db, {storage} from '@/firebase/init'
export default {
    data() {
        return {
            url: null
        }
    },
    components: {
      QrcodeVue,
    },
    created() {
        db.collection('EmergencyLocations').doc(this.$route.params.id)
        .get().then(doc => {
            this.url = doc.data().url
        })
    },
    methods: {

    }
}
</script>

<style>

</style>