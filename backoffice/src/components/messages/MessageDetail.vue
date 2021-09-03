<template>
    <main class="message-detail">

        <div class="message">
            <h3 class="message__from">{{message.from}}</h3>

            <div class="message__infos">
                <p class="message__email">{{message.email}}</p>
                <p class="message__infos__date">{{$date(message.createdAt).format('DD/MM/YYYY [ - ] HH:mm')}}</p>
            </div>

            <p class="message__content">{{message.content}}</p>

            <div class="btn-box">
                <router-link class="btn" to="/messages">Retour</router-link>
                <button class="btn danger" @click="deleteMessage(message.id, $router)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>

    </main>
</template>

<script>
import axios from 'axios'

export default {
    name: 'MessageDetail',
    data() {
        return {
            message: null
        }
    },
    mounted(){
        axios
        .get(`http://localhost:5000/messages/${this.$route.params.id}`)
        .then(response => {
            this.message = response.data;
        })
    },
    methods: {
        deleteMessage: (id, router) => {
            if (confirm('Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible...')) {
                axios
                .delete(`http://localhost:5000/messages/delete/${id}`)
                router.push({path: '/messages'});
            }
        }
    }
}
</script>

<style lang='scss' scoped>

</style>