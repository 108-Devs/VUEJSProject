<template>
<!-- Submit an emergency request from this page -->
  <div>
    <v-card
        style="margin-top: 20px;"
        class="mx-auto"
        max-width="400"
    >
        <v-card-title class="d-flex justify-center">
           Submit Emergency Request
        </v-card-title>
        <v-card-text>
               <v-alert
      outlined
      type="warning"
      prominent
      border="left"
    >
    Please submit only emergency requests! Do not misuse!
    </v-alert>
        </v-card-text>
        <div class="d-flex justify-center">
            <v-btn class="d-flex justify-center">Location Information</v-btn>
        </div>
        <div>
            <v-card-text>
            <v-text-field
                v-model="currentContact"
                label="Contact"
                placeholder="Enter contact"
                type="number"
            ></v-text-field>
            <v-text-field
                v-model="currentContact"
                label="Location"
                placeholder="Enter location"
            ></v-text-field>
            </v-card-text>
        </div>
        <v-card-actions>
        <v-btn
            color="green"
            @click="submitNewEmergencyRequest"
            block
            style="color: white;"
        >
           Submit!
        </v-btn>
        </v-card-actions>
    </v-card>

    <v-dialog v-model="requestDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Confirmation</v-card-title>
        <v-card-text>You are about to submit an official emergency request.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="requestDialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="onConfirmSubmit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
    top
    color="green"
      v-model="snackbar"
    >
      Request Submitted!
      <v-btn
        text
        @click="snackbar = false"
      >
        Dismiss
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import db, {storage} from '@/firebase/init'
export default {
    data() {
        return {
            requestDialog: false,
            snackbar: false,
            emergencyLocation: null,

            currentLocation: null, //TODO: get from google api
            currentContact: null, //POC of person who initiated the request
            
            file: null,
            fileImgPath: null,
        }
    },
    created() {
        db.collection('EmergencyLocations').doc(this.$route.params.id)
        .get().then(doc => {
            this.emergencyLocation.id = doc.id
            this.emergencyLocation = doc.data()
        })
    },
    methods: {
        submitNewEmergencyRequest() {
            this.requestDialog = true
        },
        onConfirmSubmit() {
            this.requestDialog = false
            this.snackbar = true
        }
    }

}
</script>

<style>

</style>