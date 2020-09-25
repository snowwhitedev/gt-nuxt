<template>
  <div id="login-modal" class="modal fade">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form @submit.prevent="Signin">
          <div class="left-side" style="margin: 10px 10px">
            <a class="modal-close" data-dismiss="modal" @click="CloseIt">
              x
              <!-- <font-awesome-icon :icon="['fa', 'times']"></font-awesome-icon> -->
            </a>
          </div>
          <spinner v-if="submitted"></spinner>
          <div class="modal-header">
            <h3 class="modal-title">
              {{ submitted ? 'Signing In...' : 'Sign in' }}
            </h3>
          </div>
          <!-- .modal-header -->
          <div v-if="!submitted" class="modal-body">
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input
                v-model="email"
                type="email"
                name="email"
                class="form-control"
                required
                autocomplete="username"
              />
            </div>
            <!--.form-group -->
            <div class="form-group">
              <label class="form-label">Password</label>
              <input
                v-model="password"
                type="password"
                name="password"
                class="form-control"
                required
                autocomplete="current-password"
              />
            </div>
            <!--.form-group -->
          </div>
          <!-- .modal-body -->
          <div class="modal-footer">
            <button
              type="submit"
              :style="submitted ? 'opacity:0.3;' : ''"
              class="btn btn-submit"
              :disabled="submitted"
            >
              Sign In<font-awesome-icon
                v-if="submitted"
                :icon="['fas', 'circle-notch']"
                class="fa-spin"
                size="2x"
              />
            </button>
            <p class="register-info">
              Need an account? Create one
              <router-link to="/sign-up" @click="CloseIt">here</router-link>
            </p>
            <p class="forgot-password">
              <router-link to="/forget-password" @click="CloseIt">
                Forgot password?
              </router-link>
            </p>
          </div>
          <!-- .modal-footer -->
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { Analytics, Page, Event } from "@/services/AnalyticsService";
// import OnLoginAddressHandler from '@/modules/profile/components/address/OnLoginAddressHandler';
import { authNameSpace } from '@/store/auth';
import { SIGN_IN_USER } from '../store/actionTypes';

library.add(faCircleNotch);

@Component({
  components: {}
})
export default class SigninModal extends Vue {
  email: string = '';
  password: string = '';
  submitted = false;

  @authNameSpace.Action(SIGN_IN_USER)
  private signInUser!: (credential: any) => void;

  async Signin() {
    this.submitted = true;
    try {
      await this.signInUser({
        email: this.email,
        password: this.password
      });
      this.$router.push({ path: '/' });
    } catch {}
    this.submitted = false;
  }
  // created() {
  //   Analytics.registerPageVisit(Page.SignIn);
  // }
  // get loginCreds() {
  //   return {
  //     email: this.email,
  //     password: this.password
  //   }
  // };

  // @Getter("User") user;
  // @Action("attemptLogin") attemptLogin: any;
  // @Action("attemptConfirmation") attemptConfirmation: any;

  // handleUnsuccessfulLogin(err) {

  //   Vue.notify({
  //     title: 'Oops',
  //     text: 'There was an issue signing in:\n' + err.error_description,
  //     type: "warn",
  //   })

  //   Analytics.registerEvent({
  //     event: Event.FailedToLogin,
  //     anonymous_id: btoa(this.email),
  //     properties: {
  //       email: this.email
  //     }
  //   });

  //   this.submitted = false
  //   NProgress.done()
  // }
  // handleSuccessfulLogin(status) {
  //   if (status === "PendingOrder") {
  //     appRouter.push({ name: "order-status" });
  //   } else {
  //     appRouter.push({ name: "home" });
  //   }

  //   Analytics.registerEvent({
  //     event: Event.LoggedIn,
  //     anonymous_id: this.user.id
  //   });

  //   Vue.notify({
  //     title: 'Welcome',
  //     text: 'You have successfully logged in.'
  //   })

  //   this.submitted = false
  // }
  // Signin() {
  //   let token = decodeURIComponent(String(window.location))
  //     .substring(1)
  //     .split("recovery_token=")[1];
  //   NProgress.start();
  //   this.submitted = true;
  //   this.attemptLogin({ token: token, ...this.loginCreds })
  //     .then(async (status) => {

  //       await OnLoginAddressHandler.handleAddressOnLogin();

  //       NProgress.inc();
  //       this.handleSuccessfulLogin(status);
  //     })
  //     .catch(err => {
  //       this.handleUnsuccessfulLogin(err);
  //     });
  // }
  CloseIt() {
    this.$emit('onLoginX', false);
  }
}
</script>

<style scoped>
.modal-close {
  cursor: pointer;
}
</style>
