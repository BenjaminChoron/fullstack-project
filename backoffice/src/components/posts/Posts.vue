<template>
    <main class="posts">
        <h2>Articles</h2>

        <router-link class="btn" to="/posts/new">+ Nouvel article</router-link>

        <h3>Publiés</h3>
        <div class="posts-box">
            <router-link class="post" :to="`/posts/update/${post.id}`" v-bind:key="index" v-for="(post, index) in posts">
                <img :src="post.image">
                <div class="post-infos">
                    <h4>{{post.title}}</h4>
                    <p>{{post.subtitle}}</p>
                </div>
            </router-link>
        </div>

        <h3>Brouillons</h3>
        <div class="posts-box">
            <router-link class="post" :to="`/posts/drafts/update/${post.id}`" v-bind:key="index" v-for="(post, index) in drafts">
                <img :src="post.image">
                <div class="post-infos">
                    <h4>{{post.title}}</h4>
                    <p>{{post.subtitle}}</p>
                </div>
            </router-link>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Posts',
    data() {
        return {
            posts: null,
            drafts: null
        }
    },
    mounted(){
        axios
        .get(`http://localhost:5000/posts`)
        .then(response => {
            this.posts = response.data
        })

        axios
        .get(`http://localhost:5000/posts/drafts`)
        .then(response => {
            this.drafts = response.data
        })
    },
}
</script>

<style lang='scss' scoped>

</style>