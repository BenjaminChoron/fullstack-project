<template>
    <main class="projects">
        <h2>Projets</h2>

        <router-link class="btn" to="/projects/new">+ Nouveau projet</router-link>

        <div class="projects-box">
            <router-link class="project" :to="`/projects/update/${project.id}`" v-bind:key="index" v-for="(project, index) in projects">
                <img :src="project.image">
                <div class="project-infos">
                    <h4>{{project.title}}</h4>
                </div>
            </router-link>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Projects',
    data() {
        return {
            projects: null
        }
    },
    mounted(){
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