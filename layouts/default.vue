<template>
  <div>
    <the-nav-bar @onLogin="ShowLoginModal" />
    <transition name="modal">
      <sign-in-modal
        :class="{ show: logInModal && !loggedIn }"
        @onLoginX="ShowLoginModalX"
      />
    </transition>
    <div class="page-content">
      <Nuxt />
    </div>
    <the-footer />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { authNameSpace } from '@/store/auth';
import { SHOW_LOGIN_MODAL } from '@/store/actionTypes';
import TheNavBar from '@/components/Navigation/TheNavBar.vue';
import TheFooter from '@/components/Navigation/TheFooter.vue';
@Component({
  components: {
    TheNavBar,
    TheFooter
  }
})
export default class DefaultLayout extends Vue {
  logInModal: boolean = false;

  @authNameSpace.Getter('LoggedIn')
  private loggedIn!: boolean;

  created() {
    this.$nuxt.$on(SHOW_LOGIN_MODAL, (val: any) => {
      this.ShowLoginModal(val);
    });
  }

  ShowLoginModal(val: boolean) {
    this.logInModal = val;
  }

  ShowLoginModalX(val: boolean) {
    this.logInModal = val;
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  margin-top: 88px;
  padding: 20px;
}
</style>
