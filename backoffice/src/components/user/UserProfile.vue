<template>
    <main class="profile">
        <h2>Mon profil</h2>

        <form @submit.prevent="submitForm" class="profile-form"> 
            <div class="input-group">
                <label for="first_name" class="form-label">Nom</label>
                <input type="text" class="form-control" name="first_name" v-model="form.first_name">
            </div>

            <div class="input-group">
                <label for="last_name" class="form-label">Prénom</label>
                <input type="text" class="form-control" name="last_name" v-model="form.last_name">
            </div>

            <div class="input-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" name="email" v-model="form.email">
            </div>

            <div class="input-group">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" name="password" v-model="form.password">
            </div>

            <div class="input-group">
                <label for="confirmPassword" class="form-label">Confirmation du mot de passe</label>
                <input type="password" class="form-control" name="confirmPassword" v-model="form.confirmPassword">
            </div>

            <div class="input-group">
                <label for="github" class="form-label">Github</label>
                <input type="text" class="form-control" name="github" v-model="form.github">
            </div>

            <div class="input-group">
                <label for="linkedin" class="form-label">LinkedIn</label>
                <input type="text" class="form-control" name="linkedin" v-model="form.linkedin">
            </div>

            <div class="input-group">
                <label for="twitter" class="form-label">Twitter</label>
                <input type="text" class="form-control" name="twitter" v-model="form.twitter">
            </div>

            <div class="input-group">
                <label for="avatar_id" class="form-label">Avatar</label>
                <div class="avatars">
                    <div v-bind:key="index" v-for="(avatar, index) in avatars" class="avatar-choice">
                        <input type="radio" name="avatar-choice" :value="avatar.id" v-model="form.avatar_id">
                        <img :src="avatar.url" width="100px">
                    </div>
                </div>
            </div>

            <div class="btn-box">
                <button class="form-btn send" type="submit">Modifier</button>
            </div>
        </form>
    </main>
</template>

<script>
import axios from 'axios'
import bcrypt from 'bcryptjs'

export default {
    name: 'UserProfile',
    data() {
        return {
            form: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirmPassword: '',
                github: '',
                linkedin: '',
                twitter: '',
                avatar_id: ''
            }
        }
    },
    mounted(){
        axios
        .get(`https:/localhost:5000/users/1`)
        .then(response => {
            this.form.first_name = response.data.first_name;
            this.form.last_name = response.data.last_name;
            this.form.email = response.data.email;
            this.form.github = response.data.github;
            this.form.linkedin = response.data.linkedin;
            this.form.twitter = response.data.twitter;
            this.form.avatar_id = response.data.avatar_id;
        })
    },
    methods: {
        submitForm: function() {
            if(this.form.password === this.form.confirmPassword) {
                if (confirm('Êtes-vous sûr de vouloir modifier vos informations ?')) {
                    let updateUserForm = {
                        id: 2,
                        first_name: this.form.first_name,
                        last_name: this.form.last_name,
                        email: this.form.email,
                        password: bcrypt.hashSync(this.form.password, 10),
                        github: this.form.github,
                        linkedin: this.form.linkedin,
                        twitter: this.form.twitter,
                        avatar_id: this.form.avatar_id
                    };
                    
                    const headers = {
                    'Content-Type': 'application/json'
                    }

                    axios.post('https://localhost:5000/users/save', updateUserForm, { headers: headers })
                    .then(() => {
                        this.$router.push({path: '/profile'});
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                } else {
                    this.$router.push({path: '/profile'});
                }
                
            } else {
                console.log('Les mots de passe ne sont pas identiques...');
            }
        }
    }
}
</script>

<style lang='scss' scoped>

</style>