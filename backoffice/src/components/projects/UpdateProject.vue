<template>
    <main class="new-project">
        <h2>Modifier le projet</h2>

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
                <label for="techno" class="form-label">Techno(s) associée(s)</label>
                <div class="technos">
                    <div v-bind:key="index" v-for="(techno, index) in ass_technos" class="techno-choice">
                        <img :src="techno.techno_image">
                        <button @click="deleteAssociation(techno.project_id, techno.techno_id)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>

            <form @submit.prevent="addTechnoForm" class="global-form add-tech">
                <div class="input-group">
                    <label for="techno" class="form-label">Ajouter techno(s)</label>
                    <div class="technos">
                        <div v-bind:key="index" v-for="(techno, index) in technos" class="techno-choice">
                            <input type="checkbox" :id="techno.id" :value="techno.id" v-model="new_ass_technos">
                            <img :src="techno.image">
                        </div>
                    </div>
                    <div class="btn-box">
                        <button class="form-btn success" type="submit">Ajouter</button>
                    </div>
                </div>
            </form>

            <ckeditor :editor="editor" tag-name="textarea" name="content" v-model="form.content"></ckeditor>

            <div class="btn-box">
                <router-link class="form-btn" to="/projects">Retour</router-link>
                <button class="form-btn success" type="submit">Modifier</button>
                <button class="form-btn danger" @click="deleteProject(form.id)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </form>
    </main>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'

export default {
    name: 'UpdateProject',
    data() {
        return {
            editor: ClassicEditor,
            images: null,
            technos: null,
            ass_technos: [],
            new_ass_technos: [],
            form: {
                id: '',
                title: '',
                github_link: '',
                web_link: '',
                content: '',
                image_id: null
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

        axios
        .get(`http://localhost:5000/projects/${this.$route.params.id}`)
        .then(response => {
            this.form.title = response.data.title;
            this.form.github_link = response.data.github_link;
            this.form.web_link = response.data.web_link;
            this.form.image_id = response.data.id_image;
            this.form.content = response.data.content;
            this.form.id = response.data.id;
        })

        axios
        .get(`http://localhost:5000/projects/${this.$route.params.id}/technos`)
        .then(response => {
            this.ass_technos = response.data
        })
    },
    methods: {
        submitForm: function() {
            let updateProjectForm = {
                id: this.form.id,
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

            axios.post('http://localhost:5000/projects/save', updateProjectForm, { headers: headers })
            .then(() => {
                this.$router.push({path: '/projects'});
            })
            .catch((error) => {
                console.log(error);
            })
        },

        addTechnoForm: function() {
            for(const item of this.new_ass_technos) {
                let newAssocationForm = {
                    project_id: this.$route.params.id,
                    techno_id: item
                };

                const headers = {
                'Content-Type': 'application/json'
                }

                axios.post('http://localhost:5000/projects/technos/save', newAssocationForm, { headers: headers })
                .then(() => {
                    document.location.reload();
                })
                .catch((error) => {
                console.log(error);
            })
            }
        },

        deletePost: (id) => {
            if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible...')) {
                axios
                .delete(`http://localhost:5000/projects/delete/${id}`)
                this.$router.push({path: '/projects'});
            }
        },

        deleteAssociation: (projectID, technoID) => {
            if (confirm('Êtes-vous sûr de vouloir supprimer cette association ?')) {
                axios
                .delete(`http://localhost:5000/projects/${projectID}/technos/${technoID}/delete`)
                document.location.reload();
            }
        }
    }
}
</script>

<style lang='scss' scoped>

</style>