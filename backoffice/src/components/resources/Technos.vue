<template>
    <main class="images">
        <h2>Technos</h2>

        <form @submit.prevent="submitForm" class="global-form"> 
            <div class="input-group">
                <label for="name" class="form-label">Nom</label>
                <input type="text" class="form-control" name="name" v-model="form.name">
            </div>

            <div class="input-group">
                <label for="image" class="form-label">Url de l'image</label>
                <input type="text" class="form-control" name="image" v-model="form.image">
            </div>

            <div class="btn-box">
                <button class="form-btn success" type="submit">Créer</button>
            </div>
        </form>

        <h3>Toutes les technos</h3>

        <div class="all-technos">
            <div class="techno-box" v-bind:key="index" v-for="(techno, index) in technos">
                <img :src="techno.image">
                <button class="btn techno danger" @click="deleteTechno(techno.id)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Technos',
    data() {
        return {
            technos: null,
            form: {
                name: '',
                image: ''
            }
        }
    },
    mounted(){
        axios
        .get(`http://localhost:5000/technos`)
        .then(response => {
            this.technos = response.data
        })
    },
    methods: {
        submitForm: function() {
            let newTechnoForm = {
                name: this.form.name,
                image: this.form.image
            };
                    
            const headers = {
                'Content-Type': 'application/json'
            }

            axios.post('http://localhost:5000/technos/save', newTechnoForm, { headers: headers })
            .then(() => {
                    window.location.reload();
            })
            .catch((error) => {
                    console.log(error);
            })
        },

        deleteTechno: (id) => {
            if (confirm('Êtes-vous sûr de vouloir supprimer cette techno ? Cette action est irréversible...')) {
                axios
                .delete(`http://localhost:5000/technos/delete/${id}`)
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                    alert("Vous ne pouvez pas supprimer une techno liée à un projet");
                })
            }
        }
    }
}
</script>

<style lang='scss' scoped>

</style>