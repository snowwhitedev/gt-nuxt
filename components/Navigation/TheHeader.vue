<template>
  <header>
    <nav class="main-menu">
      <ul>
        <li v-for="navItem in navItems" :key="navItem.name" class="nav-item">
          <nuxt-link :to="navItem.link" class="nav-link">{{ navItem.name }}</nuxt-link>
        </li>
      </ul>
      <div class="spacer"></div>
      <div class="right-menu">
         <nuxt-link to="/signin" class="nav-item nav-link">
          Sign In
        </nuxt-link>
        <span>
          <nuxt-link to="signup" class="nav-item nav-link">Sign Up</nuxt-link>
        </span>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import Vue from 'vue'
import { navItems } from './navItem';
export default Vue.extend({
  data() {
    return {
      navItems: navItems
    }
  }
})

</script>
<style>
body {
  margin: 0 !important;
}
</style>
<style scoped>
header {
  width: 100%;
  padding: 20px 10px;
  border-bottom: 1px solid #cccccc;
  box-sizing: border-box;
}
.main-menu {
  width: 100%;
  max-width: 1200px;
  display: flex;
  margin: 0 auto;
}
ul {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
}
.nav-item {
  margin-right: 20px;
}
.nav-item:last-child {
  margin-right: 0;
}
.right-menu {
  display: flex;
  align-items: center;
}
.spacer {
  flex-grow: 1;
}
.nav-link {
  text-decoration: none !important;
}
</style>