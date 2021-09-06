<template>
    <main class="home">
        <h2>Bonjour {{user.first_name}} et bienvenue dans votre espace de gestion.</h2>

        <p>Nous sommes le {{ $date(Date()).locale('fr').format('dddd D MMMM YYYY') }}</p>

        <div class="resources-box">
            <h3>Ressources</h3>
            <div class="resources-box__buttons">
                <router-link class="resource-btn" to="/resources/avatars">Avatars</router-link>
                <router-link class="resource-btn" to="/resources/images">Images</router-link>
                <router-link class="resource-btn" to="/resources/technos">Technos</router-link>
            </div>
        </div>

        <div class="posts-resume">
            <p>Vous avez {{posts.length}} articles publiés</p>
        </div>

        <div class="projects-resume">
            <p>Vous avez {{projects.length}} projets publiés</p>
        </div>

    </main>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Home',
    data() {
        return {
            user: null,
            posts: null,
            projects: null
        }
    },
    mounted(){
        axios
        .get(`http://localhost:5000/users/1`)
        .then(response => {
            this.user = response.data
        })
        
        axios
        .get(`http://localhost:5000/posts`)
        .then(response => {
            this.posts = response.data
        })

        axios
        .get(`http://localhost:5000/projects`)
        .then(response => {
            this.projects = response.data
        })
    },
}
</script>

<style lang='scss' scoped>

</style>