<template>
    <main class="home">
        <div class="resources-box">
            <h3>Ressources</h3>
            <router-link class="resource-btn" to="/resources/avatars">Avatars</router-link>
            <router-link class="resource-btn" to="/resources/images">Images</router-link>
            <router-link class="resource-btn" to="/resources/technos">Technos</router-link>
        </div>
    </main>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style lang='scss' scoped>

</style>