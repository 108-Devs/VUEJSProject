<template>
  <div>
    <v-simple-table>
        <template v-slot:default>
        <thead>
            <tr>
            <th class="text-left">Timestamp</th>
            <th class="text-left">Contact</th>
            <th class="text-left">Location</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in requests" :key="index">
            <td>{{ item.timestamp }}</td>
            <td>{{ item.contact }}</td>
            <td><v-btn>{{ item.location }}</v-btn></td>
            </tr>
        </tbody>
        </template>
    </v-simple-table>
  </div>
</template>

<script>
import firebase from 'firebase'
import db, {storage} from '@/firebase/init'
export default {
    data() {
        return {
            requests: []
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
    }
}
</script>

<style>

</style>