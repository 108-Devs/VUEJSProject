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
            <v-card-text>
                <v-text-field
                    v-model="location"
                    label="Share Location For First Responders"
                    placeholder="Location"
                ></v-text-field>
                <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    label="Avatar"
                    @change="onFilePicked"
                ></v-file-input>
            </v-card-text>
        </div>
        <v-card-actions>
        <v-btn
            color="red"
            text
            @click="createEmergencyResponseLocation"
        >
            Create
        </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase'
import db, {storage} from '@/firebase/init'

export default {
    data() {
        return {
            location: null,
            file: null,
            fileImgPath: null,
        }
    },
    methods: {
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
            var storageRef = storage.ref()
            if(this.location && this.file) {
                db.collection('EmergencyLocations').add({
                    location: this.location,
                    img: null,
                }).then(ref => {
                    console.log('created! ', ref)
                    var locationPic = storageRef.child("/locations/"+ref.id+".jpg")
                    locationPic.put(this.file).then(snapshot => {
                        snapshot.ref.getDownloadURL().then((downloadURL) => {
                            this.itemImgUrl = downloadURL
                            db.collection('EmergencyLocations').doc(ref.id).update({
                                'img': this.itemImgUrl
                            }).then(() => {
                                console.log('updated item img')
                            })
                        })
                    })
                })
            }
        }
    }
}
</script>

<style>

</style>