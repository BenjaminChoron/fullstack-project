<template>
    <main class="messages">
        <h2>Messages</h2>

        <div class="messages-box">
            <router-link class="message" :to="`/messages/${message.id}`" v-bind:key="index" v-for="(message, index) in messages">
                <div class="message-infos">
                    <p>{{$date(message.createdAt).format('DD/MM/YYYY [ - ] HH:mm')}}</p>
                    <h4>{{message.from}}</h4>
                    <p>{{message.email}}</p>
                </div>
            </router-link>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Messages',
    data() {
        return {
            messages: null
        }
    },
    mounted(){
        axios
        .get(`http://localhost:5000/messages`)
        .then(response => {
            this.messages = response.data
        })
    }
}
</script>

<style lang='scss' scoped>

</style>