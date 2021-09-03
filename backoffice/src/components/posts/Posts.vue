<template>
    <main class="posts">
        <h2>Articles</h2>

        <router-link class="btn" to="/posts/new">+ Nouvel article</router-link>

        <div class="posts-box">
            <div class="post" v-bind:key="index" v-for="(post, index) in posts">
                <img :src="post.image">
                <div class="post-infos">
                    <h4>{{post.title}}</h4>
                    <p>{{post.subtitle}}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Posts',
    data() {
        return {
            posts: null
        }
    },
    mounted(){
        axios
        .get(`http://localhost:5000/posts`)
        .then(response => {
            this.posts = response.data
        })
    },
}
</script>

<style lang='scss' scoped>

</style>