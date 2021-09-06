<template>
    <main class="new-project">
        <h2>Nouveau projet</h2>

        <form @submit.prevent="submitForm" class="global-form"> 
            <div class="input-group">
                <label for="title" class="form-label">Titre</label>
                <input type="text" class="form-control" name="title" v-model="form.title">
            </div>

            <div class="input-group">
                <label for="github_link" class="form-label">Github</label>
                <input type="text" class="form-control" name="github_link" v-model="form.github_link">
            </div>

            <div class="input-group">
                <label for="web_link" class="form-label">Web</label>
                <input type="text" class="form-control" name="web_link" v-model="form.web_link">
            </div>

            <div class="input-group">
                <label for="image" class="form-label">Image</label>
                <div class="images">
                    <div v-bind:key="index" v-for="(image, index) in images" class="image-choice">
                        <input type="radio" name="image-choice" :value="image.id" v-model="form.image_id">
                        <img :src="image.url">
                    </div>
                </div>
            </div>

            <div class="input-group">
                <label for="techno" class="form-label">Technos</label>
                <div class="technos">
                    <div v-bind:key="index" v-for="(techno, index) in technos" class="techno-choice">
                        <input type="checkbox" :id="techno.id" :value="techno.id" v-model="ass_technos">
                        <img :src="techno.image">
                    </div>
                </div>
            </div>

            <ckeditor :editor="editor" tag-name="textarea" name="content" v-model="form.content"></ckeditor>

            <div class="btn-box">
                <router-link class="form-btn" to="/projects">Retour</router-link>
                <button class="form-btn success" type="submit">Publier</button>
            </div>
        </form>
    </main>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'

export default {
    name: 'NewProject',
    data() {
        return {
            editor: ClassicEditor,
            images: null,
            technos: null,
            ass_technos: [],
            form: {
                title: '',
                github_link: '',
                web_link: '',
                content: '',
                image_id: ''
            }
        }
    },
    mounted(){
        axios
        .get(`http://localhost:5000/images`)
        .then(response => {
            this.images = response.data
        })

        axios
        .get(`http://localhost:5000/technos`)
        .then(response => {
            this.technos = response.data
        })
    },
    methods: {
        submitForm: function() {
            let newProjectForm = {
                title: this.form.title,
                github_link: this.form.github_link,
                web_link: this.form.web_link,
                content: this.form.content,
                image_id: parseInt(this.form.image_id, 10),
                user_id: 1
            };
            
            const headers = {
            'Content-Type': 'application/json'
            }

            axios.post('http://localhost:5000/projects/save', newProjectForm, { headers: headers })
            .then(() => {
                axios
                .get(`http://localhost:5000/projects/bytitle/${this.form.title}`)
                .then(response => {
                    for(const item of this.ass_technos) {
                        let newAssocationForm = {
                            project_id: response.data.id,
                            techno_id: item
                        };
                        axios.post('http://localhost:5000/projects/technos/save', newAssocationForm, { headers: headers })
                    }
                    this.$router.push({path: '/projects'});
                })
            })
            .catch((error) => {
                console.log(error);
            })

            
        }
    }
}
</script>

<style lang='scss' scoped>

</style>