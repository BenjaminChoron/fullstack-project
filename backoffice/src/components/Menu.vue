<template>
    <nav class="menu">
        <h1 class="menu__title">Backoffice</h1>
        <ul class="menu__nav">
            <li class="menu__nav__item">
                <router-link class="menu__nav__item__link" to="/">
                    <i class="fas fa-home"></i>
                </router-link>
            </li>
            <li class="menu__nav__item">
                <router-link class="menu__nav__item__link" to="/profile">
                    <i class="fas fa-user"></i>
                </router-link>
            </li>
            <li class="menu__nav__item">
                <router-link class="menu__nav__item__link" to="/messages">
                    <i class="fas fa-envelope"></i>
                </router-link>
            </li>
            <li class="menu__nav__item">
                <router-link class="menu__nav__item__link" to="/posts">
                    <i class="fas fa-newspaper"></i>
                </router-link>
            </li>
            <li class="menu__nav__item">
                <router-link class="menu__nav__item__link" to="/projects">
                    <i class="fas fa-tools"></i>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Menu'
}
</script>

<style lang='scss' scoped>

</style>