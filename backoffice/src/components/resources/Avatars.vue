<template>
    <main class="avatars">
        <h2>Avatars</h2>

        <form @submit.prevent="submitForm" class="profile-form"> 
            <div class="input-group">
                <label for="name" class="form-label">Nom</label>
                <input type="text" class="form-control" name="name" v-model="form.name">
            </div>

            <div class="input-group">
                <label for="url" class="form-label">Url de l'image</label>
                <input type="text" class="form-control" name="url" v-model="form.url">
            </div>

            <div class="btn-box">
                <button class="form-btn success" type="submit">Créer</button>
            </div>
        </form>

        <h3>Tous les avatars</h3>

        <div class="all-avatars">
            <div class="avatar-box" v-bind:key="index" v-for="(avatar, index) in avatars">
                <img :src="avatar.url" width="100px">
                <button class="link warning" @click="deleteAvatar(avatar.id)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Avatars',
    data() {
        return {
            avatars: null,
            form: {
                name: '',
                url: ''
            }
        }
    },
    mounted(){
        axios
        .get(`http://localhost:5000/avatars`)
        .then(response => {
            this.avatars = response.data
        })
    },
    methods: {
        submitForm: function() {
            let newAvatarForm = {
                name: this.form.name,
                url: this.form.url
            };
                    
            const headers = {
                'Content-Type': 'application/json'
            }

            axios.post('http://localhost:5000/avatars/save', newAvatarForm, { headers: headers })
            .then(() => {
                    window.location.reload();
            })
            .catch((error) => {
                    console.log(error);
            })
        },

        deleteAvatar: (id) => {
            if (confirm('Êtes-vous sûr de vouloir supprimer cet avatar ? Cette action est irréversible...')) {
                axios
                .delete(`http://localhost:5000/avatars/delete/${id}`)
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                    alert("Vous ne pouvez pas supprimer un avatar lié à un utilisateur");
                })
            }
        }
    }
}
</script>

<style lang='scss' scoped>

</style>