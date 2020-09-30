<template>
  <footer>
    <div class="container-1250">
      <div class="row">
        <div class="col-md-4 col-sm-12 text-center">
          <img
            class="lazyload img-fluid"
            src="/images/logo-footer.svg"
            alt="Good Tree"
          />
          <!-- <p class="description">{{ page.fields.footer_text }}</p> -->
        </div>
        <!-- .col-md-4 -->
        <div class="col-md-2 col-sm-12 text-center mt-4">
          <p class="description">Need to Get In Touch?</p>
        </div>
        <div class="col-md-2 col-sm-12 text-center mt-4">
          <p class="contact-description">GIVE US A CALL</p>
          <p class="contact-info">519-0-725-4405</p>
        </div>
        <div class="col-md-2 col-sm-12 text-center mt-4">
          <p class="contact-description">SEND US AN EMAIL</p>
          <p class="contact-info">team@getgoodtree.com</p>
        </div>
        <ul class="social-icons col-sm-12 text-center mt-4">
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
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/getgoodtree"
              aria-label="good-tree-instagram"
            >
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/good-tree-la/"
              aria-label="good-tree-linkedin"
            >
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </a>
          </li>
        </ul>
        <!-- .social-icons -->
        <!-- .col-md-2 -->
        <div class="col-md-2 col-sm-12 text-center">
          <ul class="link-list">
            <li>
              <router-link to="/contact">Flower</router-link>
            </li>
            <li>
              <router-link to="/contact">Vapes</router-link>
            </li>
            <li>
              <router-link to="/contact">Edibles</router-link>
            </li>
            <li>
              <router-link to="/contact">Prerolls</router-link>
            </li>
            <li>
              <router-link to="/contact">Extracts</router-link>
            </li>
            <li>
              <router-link to="/contact">Accessories</router-link>
            </li>
            <li>
              <router-link to="/contact">Learn</router-link>
            </li>
            <li>
              <router-link to="/contact">Careers</router-link>
            </li>
            <li>
              <router-link to="/contact">Equity Incubator</router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- .row -->
      <div class="row mt-4">
        <div class="col-md-12">
          <p class="copyright">
            <router-link to="/policy" class="footer-link">
              Privacy Policy
            </router-link>
            &nbsp;|&nbsp;
            <router-link to="/policy" class="footer-link">
              Terms &#38; Conditions
            </router-link>
          </p>
          <p class="copyright">
            Copyright &copy; 2020 Good Tree Inc. All photos their respective
            owners.
          </p>
        </div>
        <!-- .col-md-12 -->
      </div>
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
import { SHOW_LOGIN_MODAL } from '@/store/actionTypes';
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

<style lang="scss" scoped>
footer {
  margin: 0;
  padding: 0;
  border: none;
}
p {
  margin: 0;
}
.container-1250 {
  padding: 30px 15px 10px;
  background: #000000;
}
.contact-description {
  font-weight: 600;
  color: $color-main;
}
.contact-info {
  font-weight: 500;
  color: #ffffff;
}
.link-item {
  cursor: pointer;
}
.social-icons {
  position: relative;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  font-size: 28px;
}
.copyright {
  font-size: 10px;
}
.footer-link {
  color: #a8acb9;
}
</style>
