<template>
  <div>
    <v-simple-table>
        <template v-slot:default>
        <thead>
            <tr>
            <th class="text-left">Timestamp</th>
            <th class="text-left">Contact</th>
            <th class="text-left">Description</th>
            <th class="text-left">Location</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in orderRequest" :key="index">
            <td>{{ formatTimestamp(item.timestamp) }}</td>
            <td>{{ item.contact }}</td>
            <td>{{ item.description }}</td>
            <td><v-btn>{{ getLocationName(item.location) }}</v-btn></td>
            </tr>
        </tbody>
        </template>
    </v-simple-table>
  </div>
</template>

<script>
import firebase from 'firebase'
import db, {storage} from '@/firebase/init'
import moment from 'moment'
export default {
    data() {
        return {
            requests: [],
            locations: [],

        }
    },
    methods: {
        formatTimestamp(timestamp) {
            return moment(timestamp).format('HH:mm DD-MMM-YYYY')
        },
        getLocationName(id) {
            if(this.locations.find( location => location.id == id).address)
                return this.locations.find( location => location.id == id).address
            else 
                return this.locations.find( location => location.id == id).locationOrCarplate
        },
        retrieveLocations(){
            db.collection('EmergencyLocations').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    var data = doc.data()
                    data.id = doc.id
                    console.log(data)
                    this.locations.push(data)
                })
                db.collection('EmergencyResidentInfo').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        var data = doc.data()
                        data.id = doc.id
                        this.locations.push(data)
                    })
                })
            })
        }
    },
    computed: {
        orderRequest() {
            return this.requests.sort((a,b) => {
                return b.timestamp - a.timestamp
            })
        }
    },
    created() {
        db.collection('EmergencyRequests')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            var doc = change.doc;
            var requestData = doc.data();
            requestData.id = doc.id
            if (change.type == "added") {
                if(!this.requests.find(request => request.id == requestData.id))
                    this.requests.push(requestData)
            }
            if (change.type == "modified") {
                this.requests = this.requests.filter(request => {
                    return request.id != requestData.id
                })
                if(!this.requests.find(request => request.id == requestData.id))
                    this.requests.push(requestData)
            }
            if (change.type == "removed") {
                this.requests = this.requests.filter(request => {
                    return request.id != requestData.id
                })
            }
          })
        })
        this.retrieveLocations()
    }
}
</script>

<style>

</style>