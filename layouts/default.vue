<template>
  <div>
    <the-nav-bar @DropDownCart="DropCart" @onLogin="ShowLoginModal" />
    <transition name="modal">
      <sign-in-modal
        :class="{ show: logInModal && !loggedIn }"
        @onLoginX="ShowLoginModalX"
      />
    </transition>
    <!-- <transition name="slide-fade">
      <Sidecart
        v-if="DropdownCart"
        :class="{ slideInRight: DropdownCart, slideOutRight: !DropdownCart }"
      ></Sidecart>
    </transition> -->
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
