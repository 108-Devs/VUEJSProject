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
            v-model="residentMedication"
            filled
            label="Medications"
            auto-grow
            value=""
            ></v-textarea>
            <v-textarea
            v-model="residentMedicationHistory"
            filled
            label="Medication History"
            auto-grow
            value=""
            ></v-textarea>
            <v-textarea
            v-model="residentAllergies"
            filled
            label="Resident's Allergies"
            auto-grow
            value=""
            ></v-textarea>
            <v-text-field
            label="Postal Code"
            v-model="residentPostalCode"
            placeholder="Enter Postal Code"
            ></v-text-field>
            <v-textarea
            v-model="residentAddress"
            filled
            label="Resident's Address"
            auto-grow
            value=""
            ></v-textarea>
            <v-text-field
            label="Contact Number"
            v-model="residentContactNumber"
            placeholder="Enter Contact Number"
            ></v-text-field>
            
            <v-img
            width="200px"
            v-if="fileImgPath" 
            :src="fileImgPath" 
            >
            </v-img>
            
            <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Upload Image Of Resident's Apartment"
                    prepend-icon="mdi-camera"
                    :label="imageLabel"
                    @change="onFilePicked"
            ></v-file-input>

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

  </div>
</template>

<script>
import firebase from 'firebase'
import db, {storage} from '@/firebase/init'

export default {
     data: vm => ({
            placeType: null,

            date: new Date().toISOString().substr(0, 10),
            dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
            dobOfResident: false,
            residentName: null,
            residentNric: null,
            bloodType: null,
            dobOfResident: null,
            residentGender: null,
            residentMedication: null,
            residentMedicationHistory: null,
            residentAllergies: null,
            residentPostalCode: null,
            residentAddress: null,
            residentContactNumber: null,
            
            file: null,
            fileImgPath: null,
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

        onFilePicked(f) {
        this.file = f
        console.log(this.file)
        var reader = new FileReader()
        reader.onload = (e) => {
          this.fileImgPath = e.target.result
          console.log(this.fileImgPath)
        }
        reader.readAsDataURL(this.file);
        },

        generateQRForResident() {
        //add emergency location into firestore
        //update emergency document with firestore URL
        //redirect to success page

                var storageRef = storage.ref()
                db.collection('EmergencyResidentInfo').add({
                    name: this.residentName,
                    nric: this.residentNric,
                    bloodtype: this.bloodType,
                    dateOfBirth: this.dobOfResident,
                    gender: this.residentGender,
                    medication: this.residentMedication,
                    medicalhistory: this.residentMedicationHistory,
                    allergics: this.residentAllergies,
                    postalcode:this.residentPostalCode,
                    address: this.residentAddress,
                    contact: this.residentContactNumber,
                    img: null,
                    url: null
                }).then(ref => {
                    var locationPic = storageRef.child("/residentApartment/"+ref.id+".jpg")
                    locationPic.put(this.file).then(snapshot => {
                        snapshot.ref.getDownloadURL().then((downloadURL) => {
                            this.itemImgUrl = downloadURL
                            db.collection('EmergencyResidentInfo').doc(ref.id).update({
                                'img': this.itemImgUrl,
                                'url': 'https://scdf-eqr.web.app/emergency/'+ref.id
                            }).then(() => {
                                console.log('updated item img')
                                this.$router.push({name: 'SuccessQRForResidents', params:
                                    {
                                        id: ref.id,
                                    }
                                })
                            })
                        })
                    })
                })
        }
    },
}
</script>

<style>

</style>