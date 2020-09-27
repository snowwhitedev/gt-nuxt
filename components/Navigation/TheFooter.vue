<template>
  <footer>
    <div class="container-1250">
      <div class="row">
        <div class="col-md-4">
          <img
            class="lazyload img-fluid"
            src="/images/logo-footer.svg"
            alt="Good Tree"
          />
          <!-- <p class="description">{{ page.fields.footer_text }}</p> -->
          <p class="description">Footer description</p>
        </div>
        <!-- .col-md-4 -->
        <div class="col-md-2">
          <ul class="link-list">
            <li>
              <a href="http://growingtalent.org/">Equity Incubator</a>
            </li>
            <li>
              <a href="http://careers.goodtreedelivery.com/">Careers</a>
            </li>
          </ul>
        </div>
        <!-- .col-md-2 -->
        <div class="col-md-2">
          <ul class="link-list">
            <li>
              <router-link to="/contact">Contact</router-link>
            </li>
            <li>
              <router-link to="/terms">Term and conditions</router-link>
            </li>
            <li>
              <router-link to="/privacy">Privacy Policy</router-link>
            </li>
          </ul>
        </div>
        <!-- .col-md-2 -->
        <div class="col-md-2">
          <ul v-if="!loggedIn" class="link-list">
            <li>
              <router-link to="/signup">Sign up</router-link>
            </li>
            <li class="link-item" @click="onLogIn">Login</li>
          </ul>
          <ul v-else class="link-list">
            <li>
              <router-link to="/profile">My Orders</router-link>
            </li>
            <!--<li>
              <router-link to="/account">Account Info</router-link>
            </li>-->
            <li class="link-item" @click="onLogOut">Sign Out</li>
          </ul>
        </div>
        <!-- .col-md-2 -->
      </div>
      <!-- .row -->
      <div class="row">
        <div class="col-md-12">
          <p class="copyright">
            Copyright &copy; 2020 Good Tree Inc. All photos their respective
            owners.
          </p>
        </div>
        <!-- .col-md-12 -->
      </div>
      <!-- .row -->

      <ul class="social-icons">
        <li>
          <a
            href="https://twitter.com/getgoodtree?lang=en"
            aria-label="good-tree-twitter"
          >
            <font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon>
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/GoodTreeLA"
            aria-label="good-tree-facebook"
          >
            <font-awesome-icon :icon="['fab', 'facebook']"></font-awesome-icon>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/getgoodtree"
            aria-label="good-tree-instagram"
          >
            <font-awesome-icon :icon="['fab', 'instagram']"></font-awesome-icon>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/company/good-tree-la/"
            aria-label="good-tree-linkedin"
          >
            <font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon>
          </a>
        </li>
      </ul>
      <!-- .social-icons -->
    </div>
    <!-- .container-1250 -->
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import { authNameSpace } from '@/store/auth';
import { SHOW_LOGIN_MODAL } from '../../store/actionTypes';
library.add(faFacebook, faTwitter, faLinkedin, faInstagram);

@Component({
  name: 'TheFooter'
})
export default class Footer extends Vue {
  @authNameSpace.Getter('LoggedIn')
  private loggedIn!: boolean;

  @authNameSpace.Action('logout')
  private logout!: any;

  async onLogOut() {
    await this.logout();
    this.$router.push('/');
  }

  onLogIn() {
    this.$nuxt.$emit(SHOW_LOGIN_MODAL, true);
  }
}
</script>

<style scoped>
.link-item {
  cursor: pointer;
}
</style>
