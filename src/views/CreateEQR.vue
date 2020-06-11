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
        <v-card-title>
            Create an EMERGENCY QR
        </v-card-title>
        <div>
            <div></div>
            <v-card-text>
                <v-select
                :items="['Public', 'Workplace', 'Residential', 'Vehicle']"
                v-model="placeType"
                label="Type of place"
                ></v-select>
                <v-textarea
                    v-if="checkPlaceType"
                    v-model="locationOrCarplate"
                    label="Location"
                    placeholder="Enter address"
                ></v-textarea>
                <v-text-field
                    v-if="placeType && !checkPlaceType"
                    v-model="locationOrCarplate"
                    label="Vehicle Carplate"
                    placeholder="Enter carplate number"
                ></v-text-field>
                <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Choose an image"
                    prepend-icon="mdi-camera"
                    :label="imageLabel"
                    @change="onFilePicked"
                ></v-file-input>
                <v-textarea
                    v-model="description"
                    label="Description"
                    placeholder="Enter description"
                ></v-textarea>
                <p>Enter details of persons at risk</p>
                 <v-simple-table v-if="people.length > 0">
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Blood Type</th>
                        <th class="text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in people" :key="index">
                        <td>{{ item.personName }}</td>
                        <td>{{ item.personBloodType }}</td>
                        <td>     
                            <v-btn @click="removePerson(index)" class="ma-2" text icon color="red lighten-2">
                                 <v-icon>mdi-delete</v-icon>
                            </v-btn> 
                        </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
                <v-btn style="margin-top: 10px;" block @click="dialog = true" color="red" dark>Add Person</v-btn>
            </v-card-text>
        </div>
        <v-card-actions>
        <v-btn
            color="green"
            @click="createEmergencyResponseLocation"
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
    methods: {
    },
    computed: {
        imageLabel() {
            if(this.placeType == 'Vehicle') {
                return "Image of Vehicle"
            } else {
                return "Image of location"
            }
        },
        checkPlaceType() {
            if(this.placeType == "Public" || this.placeType == "Workplace" || this.placeType == "Residential")
                return true
            else 
                return false
        }
    },
    data() {
        return {
            placeType: null,
            locationOrCarplate: null,
            description: null,

            dialog: false,
            file: null,
            fileImgPath: null,

            people: [],

            personName: null,
            personAllergies: null,
            personAge: null,
            personBloodType: null,

        }
    },
    methods: {
        close() {
            this.dialog = false
            this.personName = null
            this.personAllergies = null
            this.personBloodType = null
            this.personAge = null
        },
        removePerson(index) {
            this.people.splice(index,1)
        },
        addPerson() {
            this.people.push({
                personName: this.personName,
                personAllergies: this.personAllergies,
                personAge: this.personAge,
                personBloodType: this.personBloodType
            })
            this.close()
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
        createEmergencyResponseLocation() {
            //add emergency location into firestore
            //update emergency document with firestore URL
            //redirect to success page

            var storageRef = storage.ref()
                db.collection('EmergencyLocations').add({
                    placeType: this.placeType,
                    locationOrCarplate: this.locationOrCarplate,
                    description: this.description,
                    people: this.people,
                    img: null,
                    url: null,
                }).then(ref => {
                    var locationPic = storageRef.child("/locations/"+ref.id+".jpg")
                    locationPic.put(this.file).then(snapshot => {
                        snapshot.ref.getDownloadURL().then((downloadURL) => {
                            this.itemImgUrl = downloadURL
                            db.collection('EmergencyLocations').doc(ref.id).update({
                                'img': this.itemImgUrl,
                                'url': 'https://scdf-eqr.web.app/emergency/'+ref.id
                            }).then(() => {
                                var data = {
                                    placeType: this.placeType,
                                    locationOrCarplate: this.locationOrCarplate,
                                    description: this.description,
                                    people: this.people,
                                    img: this.itemImgUrl,
                                    url: 'https://scdf-eqr.web.app/emergency/'+ref.id,
                                }
                                console.log('updated item img')
                                this.$router.push({name: 'SuccessEQR', params:
                                    {
                                        id: ref.id,
                                        data: data
                                    }
                                })
                            })
                        })
                    })
                })
        }
    }
}
</script>

<style>

</style>