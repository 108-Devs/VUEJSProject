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
            Create QR Code For Blocks
        </v-card-title>
        <div>
            <div></div>
            <v-card-text>
            <v-text-field
            label="Postal Code"
            v-model="blockPostalCode"
            placeholder="Enter Postal Code"
            ></v-text-field>
            <v-textarea
            v-model="blockAddress"
            filled
            label="Address Of The Block"
            auto-grow
            value=""
            ></v-textarea>
            <v-img
            width="200px"
            v-if="fileImgPath" 
            :src="fileImgPath" 
            >
            </v-img>
            
            <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Upload Image Of The Block"
                    prepend-icon="mdi-camera"
                    :label="imageLabel"
                    @change="onFilePicked"
            ></v-file-input>

            </v-card-text>

        </div>
        <v-card-actions>
        <v-btn
            color="green"
            @click="generateQRForBlock"
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

            residentPostalCode: null,
            residentAddress: null,
            
            file: null,
            fileImgPath: null,
    }),
    computed: {
    
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

        generateQRForBlock() {
        //add emergency location into firestore
        //update emergency document with firestore URL
        //redirect to success page

                var storageRef = storage.ref()
                db.collection('EmergencyLocations').add({
                    postalcode:this.residentPostalCode,
                    address: this.residentAddress,
                    img: null,
                    url: null
                }).then(ref => {
                    var locationPic = storageRef.child("/locations/"+ref.id+".jpg")
                    locationPic.put(this.file).then(snapshot => {
                        snapshot.ref.getDownloadURL().then((downloadURL) => {
                            this.itemImgUrl = downloadURL
                            db.collection('EmergencyLocations').doc(ref.id).update({
                                'img': this.itemImgUrl,
                                'url': 'https://scdf-eqr.web.app/emergency/'+ref.id
                            }).then(() => {
                                console.log('updated item img')
                                this.$router.push({name: 'SuccessEQR', params:
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