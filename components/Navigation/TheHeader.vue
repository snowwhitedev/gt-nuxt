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
        <span v-if="loggedIn" class="nav-item nav-link" @click="onLogOut">Log out</span>
        <nuxt-link v-if="!loggedIn" to="/signin" class="nav-item nav-link">
          Sign In
        </nuxt-link>
        <span v-if="!loggedIn">
          <nuxt-link to="signup" class="nav-item nav-link">Sign Up</nuxt-link>
        </span>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  { authNameSpace } from "@/store/auth";
import { navItems } from './navItem';
@Component({
  components: {
    // Spinner,
    // VueTelInput
  },
  data() {
    return {
      navItems: navItems
    }
  }
})

export default class HeaderComponent extends Vue {
  
  @authNameSpace.Getter("LoggedIn")
  private loggedIn!: boolean;
  @authNameSpace.Action("logout")
  private logout!: any;

  async onLogOut() {
    await this.logout();
    this.$router.push("/signin");
  }
}

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
  cursor: pointer;
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