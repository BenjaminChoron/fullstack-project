<template>
    <main class="new-post">
        <h2>Modifier l'article</h2>

        <form @submit.prevent="submitForm" class="global-form"> 
            <div class="input-group">
                <label for="title" class="form-label">Titre</label>
                <input type="text" class="form-control" name="title" v-model="form.title">
            </div>

            <div class="input-group">
                <label for="subtitle" class="form-label">Sous-titre</label>
                <input type="text" class="form-control" name="subtitle" v-model="form.subtitle">
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

            <ckeditor :editor="editor" tag-name="textarea" name="content" v-model="form.content"></ckeditor>

            <div class="btn-box">
                <router-link class="form-btn" to="/posts">Retour</router-link>
                <button class="form-btn success" type="submit">Modifier</button>
                <button class="form-btn danger" type="button" @click="publishPost()">Publier</button>
                <button class="form-btn danger" type="button" @click="deletePost(form.id)">
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
    name: 'UpdatePost',
    data() {
        return {
            editor: ClassicEditor,
            images: null,
            form: {
                id: '',
                title: '',
                subtitle: '',
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
        .get(`http://localhost:5000/posts/drafts/${this.$route.params.id}`)
        .then(response => {
            this.form.title = response.data.title;
            this.form.subtitle = response.data.subtitle;
            this.form.image_id = response.data.id_image;
            this.form.content = response.data.content;
            this.form.id = response.data.id;
        })
    },
    methods: {
        submitForm: function() {
            let updateDraftForm = {
                id: this.form.id,
                title: this.form.title,
                subtitle: this.form.subtitle,
                content: this.form.content,
                image_id: parseInt(this.form.image_id, 10),
                user_id: 1
            };
            
            const headers = {
            'Content-Type': 'application/json'
            }

            axios.post('http://localhost:5000/posts/drafts/save', updateDraftForm, { headers: headers })
            .then(() => {
                this.$router.push({path: '/posts'});
            })
            .catch((error) => {
                console.log(error);
            })
        },

        publishPost: function() {
            let publishPostForm = {
                title: this.form.title,
                subtitle: this.form.subtitle,
                content: this.form.content,
                image_id: parseInt(this.form.image_id, 10),
                user_id: 1
            };
            
            const headers = {
            'Content-Type': 'application/json'
            }

            if (confirm('Êtes-vous sûr de vouloir publier cet article ? Il sera immédiatement visible sur votre site')) {
                axios.post('http://localhost:5000/posts/save', publishPostForm, { headers: headers })
                .then(() => {
                    axios
                    .delete(`http://localhost:5000/posts/drafts/delete/${this.$route.params.id}`)
                    .then(() => {
                        this.$router.push({path: '/posts'});
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        },

        deletePost: (id) => {
            if (confirm('Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible...')) {
                axios
                .delete(`http://localhost:5000/posts.drafts/delete/${id}`)
                .then(() => {
                    this.$router.push({path: '/posts'});
                })
            }
        }
    }
}
</script>

<style lang='scss' scoped>

</style>