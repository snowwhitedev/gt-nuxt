<template>
  <div class="mockup-layout">
    <the-nav-bar @DropDownCart="DropCart" @onLogin="ShowLoginModal" />
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
import TheNavBar from '@/components/Mockup/Navigation/MockTheNavBar.vue';
import TheFooter from '@/components/Mockup/Navigation/MockTheFooter.vue';
@Component({
  components: {
    TheNavBar,
    TheFooter
  }
})
export default class DefaultLayout extends Vue {
  logInModal: boolean = false;
  DropdownCart: boolean = false;

  @authNameSpace.Getter('LoggedIn')
  private loggedIn!: boolean;

  created() {
    this.$nuxt.$on(SHOW_LOGIN_MODAL, (val: any) => {
      this.ShowLoginModal(val);
    });
  }

  DropCart(value: any) {
    this.DropdownCart = value;
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
}
</style>
