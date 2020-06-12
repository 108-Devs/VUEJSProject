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
            <v-btn @click="showEmergencyLocationDialog = true" class="d-flex justify-center">Location Information</v-btn>
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


  <v-dialog v-model="showEmergencyLocationDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="showEmergencyLocationDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Emergency Location Information</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list one-line subheader>
          <v-list-item>
            <v-list-item-content class="d-flex justify-center">
                <v-img :src="emergencyLocation.img"></v-img>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
                <v-list-item-subtitle>Location Type</v-list-item-subtitle>
                <v-list-item-title>{{ emergencyLocation.placeType }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
                <v-list-item-subtitle v-if="emergencyLocation.placeType == 'Vehicle'">
                    Carplate
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else>
                    Location
                </v-list-item-subtitle>
                <v-list-item-title>{{ emergencyLocation.locationOrCarplate }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-subtitle>Description</v-list-item-subtitle>
                <v-list-item-title>{{ emergencyLocation.description }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-subtitle v-if="emergencyLocation.people.length > 0">Persons at Risk</v-list-item-subtitle>
                <v-simple-table v-if="emergencyLocation.people.length > 0">
                    <template v-slot:default>
                    <thead>
                        <tr>
                         <th class="text-left"></th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Age</th>
                        <th class="text-left">Blood Type</th>
                        <th class="text-left">Allergies</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in emergencyLocation.people" :key="index">
                        <td>
                            <v-avatar size="40">
                                <img
                                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                                    alt="John"
                                >
                            </v-avatar>
                        </td>
                        <td>{{ item.personName }}</td>
                        <td>{{ item.personAge }}</td>
                        <td>{{ item.personBloodType }}</td>
                        <td>{{ item.personAllergies }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
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
            showEmergencyLocationDialog: false,
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
            console.log('Hi')
            console.log(doc.data())
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