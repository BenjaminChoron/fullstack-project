<template>
    <main class="images">
        <h2>Images</h2>

        <form @submit.prevent="submitForm" class="global-form"> 
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

        <h3>Toutes les images</h3>

        <div class="all-images">
            <div class="image-box" v-bind:key="index" v-for="(image, index) in images">
                <img :src="image.url">
                <p>{{image.name}}</p>
                <button class="btn danger" @click="deleteImage(image.id)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Images',
    data() {
        return {
            images: null,
            form: {
                name: '',
                url: ''
            }
        }
    },
    mounted(){
        axios
        .get(`http://localhost:5000/images`)
        .then(response => {
            this.images = response.data
        })
    },
    methods: {
        submitForm: function() {
            let newImageForm = {
                name: this.form.name,
                url: this.form.url
            };
                    
            const headers = {
                'Content-Type': 'application/json'
            }

            axios.post('http://localhost:5000/images/save', newImageForm, { headers: headers })
            .then(() => {
                    window.location.reload();
            })
            .catch((error) => {
                    console.log(error);
            })
        },

        deleteImage: (id) => {
            if (confirm('Êtes-vous sûr de vouloir supprimer cette image ? Cette action est irréversible...')) {
                axios
                .delete(`http://localhost:5000/images/delete/${id}`)
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                    alert("Vous ne pouvez pas supprimer une image lié à un article ou un projet");
                })
            }
        }
    }
}
</script>

<style lang='scss' scoped>

</style>