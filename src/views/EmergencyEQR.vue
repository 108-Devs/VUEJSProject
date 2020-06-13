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
      <div>
        <v-list one-line subheader>
          <v-list-item>
            <v-list-item-content class="d-flex justify-center">
              <v-img :src="emergencyLocation.img"></v-img>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Address</v-list-item-subtitle>
              <v-list-item-title>{{ emergencyLocation.address }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>
                Postal Code
              </v-list-item-subtitle>
              <v-list-item-title>{{ emergencyLocation.postalcode }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-text>
          <v-text-field outlined
              v-model="currentContact"
              label="Mobile Phone (required)"
              placeholder="Enter number"
          ></v-text-field>
          <v-textarea auto-grow outlined
              v-model="incidentDescription"
              label="Description of the incident (optional)"
              placeholder="Enter"
          ></v-textarea>
          <v-alert type="error" v-if="error">
            {{ error }}
          </v-alert>
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
        <v-card-text>An OTP will be send to your mobile phone via SMS.</v-card-text>
        <v-otp-input
            class="d-flex justify-center"
            ref="otpInput"
            input-classes="otp-input"
            separator="-"
            :num-inputs="6">
        </v-otp-input>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="requestDialog=false">Cancel</v-btn>
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
                currentContact: null, //POC of person who initiated the request

                file: null,
                fileImgPath: null,
                incidentDescription: null,
                error: null
            }
        },
        created() {
            const collectionList = ['EmergencyLocations', 'EmergencyResidentInfo']
            for (const cname of collectionList) {
                console.log(cname);
                db.collection(cname).doc(this.$route.params.id).get()
                    .then((doc) => {
                        if (doc.exists) {
                            this.emergencyLocation = doc.data()
                        }
                    })
            }
        },
        methods: {
            submitNewEmergencyRequest() {
                if (!this.currentContact) {
                    this.error = "Contact Required"
                } else {
                    this.error = null
                    this.requestDialog = true
                }
            },
            onConfirmSubmit()  {
                this.requestDialog = false
                this.snackbar = true
                db.collection('EmergencyRequests').add({
                    timestamp: Date.now(),
                    location: this.$route.params.id,
                    contact: this.currentContact,
                    description: this.incidentDescription
                })
            }
        }
    }
</script>

<style>
.otp-input {
  width: 35px;
  height: 40px;
  padding: 1px;
  margin: 0 3px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
</style>
