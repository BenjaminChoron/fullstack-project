<template>
    <main class="new-post">
        <h2>Nouvel article</h2>

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
                <button class="form-btn success" type="submit">Publier</button>
            </div>
        </form>
    </main>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'

export default {
    name: 'NewPost',
    data() {
        return {
            editor: ClassicEditor,
            images: null,
            form: {
                title: '',
                subtitle: '',
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
    },
    methods: {
        submitForm: function() {
            let newPostForm = {
                title: this.form.title,
                subtitle: this.form.subtitle,
                content: this.form.content,
                image_id: parseInt(this.form.image_id, 10),
                user_id: 1
            };
            
            const headers = {
            'Content-Type': 'application/json'
            }

            axios.post('http://localhost:5000/posts/save', newPostForm, { headers: headers })
            .then(() => {
                this.$router.push({path: '/posts'});
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