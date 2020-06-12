<template>
  <div>
    <v-card
        style="margin-top: 20px;"
        class="mx-auto"
        max-width="400"
    >
        <v-img
            width="200px"
            v-if="fileImgPath" 
            :src="fileImgPath" 
        >
        </v-img>
        <v-card-title class="d-flex justify-center">
            Create QR Code For Residents
        </v-card-title>
        <div>
            <div></div>
            <v-card-text>
                <v-text-field
                v-model="residentName"
                label="Name Of Resident"
                placeholder="Enter Resident's Name"
                ></v-text-field>
                <v-text-field
                v-model="residentNric"
                label="NRIC Of Resident"
                placeholder="Enter Resident's NRIC"
                ></v-text-field>
                <v-select
                :items="['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']"
                v-model="bloodType"
                label="Blood Type"
                ></v-select>
                <v-menu
                ref="dobOfResident"
                v-model="dobOfResident"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted"
              label="Date Of Birth"
              hint="MM/DD/YYYY format"
              persistent-hint
              v-bind="attrs"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title @input="dobOfResident = false"></v-date-picker>
            </v-menu>
            <v-select
            :items="['Male', 'Female']"
            v-model="residentGender"
            label="Gender"
            ></v-select>
            <v-textarea
            name="residentMedication"
            filled
            label="Medications"
            auto-grow
            value=""
            ></v-textarea>
            <v-textarea
            name="residentMedicationHistory"
            filled
            label="Medication History"
            auto-grow
            value=""
            ></v-textarea>
            <v-textarea
            name="residentAllergies"
            filled
            label="Resident's Allergies"
            auto-grow
            value=""
            ></v-textarea>
            <v-text-field
            label="Postal Code"
            name="residentPostalCode"
            placeholder="Enter Postal Code"
            ></v-text-field>
            <v-textarea
            name="residentAddress"
            filled
            label="Resident's Address"
            auto-grow
            value=""
            ></v-textarea>
            <v-text-field
            label="Contact Number"
            name="residentContactNumber"
            placeholder="Enter Contact Number"
            ></v-text-field>
            </v-card-text>

        </div>
        <v-card-actions>
        <v-btn
            color="green"
            @click="generateQRForResident"
            block
            style="color: white;"
        >
            Generate Emergency QR
        </v-btn>
        </v-card-actions>
    </v-card>


    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Person</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>             
            <v-col cols="12" sm="6" md="4">
                <v-avatar size="100">
                    <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                    >
                </v-avatar>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name" v-model="personName"></v-text-field>
              </v-col>
            <v-col cols="12">
                <v-textarea
                  label="Allergies"
                  required
                  v-model="personAllergies"
                ></v-textarea>
              </v-col>
            <v-col cols="12" sm="6">
                <v-text-field
                  label="Age"
                  type="number"
                  v-model="personAge"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="['O+', 'O-', 'B+', 'B-', 'A+', 'A-', 'AB+', 'AB-']"
                  label="Blood Type"
                  v-model="personBloodType"
                  required
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="addPerson">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from 'firebase'
import db, {storage} from '@/firebase/init'

export default {
     data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      dobOfResident: false,
    }),
    computed: {
         computedDateFormatted () {
            return this.formatDate(this.date)
        },
    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },

    methods: {
        formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
        },
        parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },

        generateQRForResident() {
        //add emergency location into firestore
        //update emergency document with firestore URL
        //redirect to success page

            var storageRef = storage.ref()
                db.collection('EmergencyResidentInfo').add({
                    name: 'dane',
                    nric: 's993',
                    bloodtype: 'A+',
                    dateOfBirth: '01/01/90',
                    gender: 'Male',
                    medication: 'saasda',
                    medicalhistory: 'v',
                    allergics: 'ssa',
                    address: 'asdasda',
                    contact: '88989'
                })
        }
    },
}
</script>

<style>

</style>