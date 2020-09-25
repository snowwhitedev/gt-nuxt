<template>
  <div class="d-flex justify-content-center">
    <div class="registration-form">
      <spinner v-if="submitted"></spinner>
      <div class="form-header">
        <h2>Sign Up</h2>
      </div>
      <!-- .form-header -->
      <form @submit.prevent="Signup">
        <div class="form-body">
          <div class="form-group">
            <label class="form-label">E-mail</label>
            <input
              v-model="email"
              type="email"
              name="email"
              autocomplete="email"
              class="form-control"
              required
            />
          </div>
          <!--.form-group -->
          <div class="form-group">
            <label class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              name="new-password"
              autocomplete="new-password"
              class="form-control"
              required
            />
          </div>
          <!--.form-group -->
          <div class="form-group">
            <label class="form-label">Phone number</label>
            <vue-tel-input
              v-model="phone"
              default-country="USA"
              placeholder="(123) 456-7890"
              input-classes="form-control"
              :max-len="14"
              :required="true"
            ></vue-tel-input>
          </div>
        </div>
        <!-- .form-body -->
        <div class="custom-control custom-checkbox">
          <input
            id="conditions"
            v-model="checked"
            type="checkbox"
            class="custom-control-input"
            required
          />
          <label
            class="custom-control-label custom-checkbox-label"
            for="conditions"
          >
            I accept
            <router-link to="/terms">Terms and Conditions</router-link></label
          >
        </div>
        <!-- .custom-control -->
        <div class="form-footer">
          <button
            type="submit"
            :style="submitted ? 'opacity:0.3;' : ''"
            class="btn btn-submit"
            :disabled="submitted"
          >
            Get Started<font-awesome-icon
              v-if="submitted"
              :icon="['fas', 'circle-notch']"
              class="fa-spin"
              size="2x"
            />
          </button>
          <b
            ><p class="or-login">
              <router-link to="/sign-in">I have an account already</router-link>
            </p></b
          >
        </div>
        <!-- .form-footer -->
      </form>
    </div>
    <!-- .flex-content -->
  </div>
  <!-- .flex-center -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { authNameSpace } from '@/store/auth';
import { SIGN_UP_USER } from '../store/actionTypes';
library.add(faCircleNotch);
@Component({
  components: {}
})
export default class Home extends Vue {
  first_name: string = 'Temp';
  last_name: string = 'Doe';
  email: string = '';
  password: string = '';
  phone: string = '+1-202-555-0152';
  promo_code: string = 'abc';
  checked: boolean = false;
  // imageID : string;
  // medID : string;
  submitted = false;

  @authNameSpace.Action(SIGN_UP_USER)
  private signUpuser!: (credential: any) => void;

  async Signup() {
    this.submitted = true;
    try {
      await this.signUpuser({
        email: this.email,
        password: this.password,
        attributes: {
          first_name: this.first_name,
          last_name: this.last_name,
          phone: this.phone.replace(/\D/g, ''),
          promo: this.promo_code
        }
      });
      this.$router.push({ path: '/' });
    } catch {}
    this.submitted = false;
  }

  // HandleUnsuccessfulLogin(err) {
  //   Vue.notify({
  //     title: 'Oops',
  //     text: 'There was issue signing up:\n' + err,
  //     type: 'warn'
  //   });
  //   this.submitted = false;
  //   NProgress.done();
  // }
  // created() {
  //   Analytics.registerPageVisit(Page.SignUp);
  //   this.phone = <string>this.$route.query.phone;
  //   this.promo_code = this.$route.query.referrer as string;
  // }

  // @Watch('$route')
  // onRouteChanged() {
  //   //this.getPage();
  //   this.phone = <string>this.$route.query.phone;
  // }

  // Signup() {
  //   NProgress.start();
  //   if (this.phone.replace(/\D/g, '').length != 10) {
  //     Vue.notify({
  //       title: 'Oops',
  //       text: 'Please enter a properly formatted phone number.',
  //       type: 'warn'
  //     });
  //     return;
  //   }
  //   this.submitted = true;
  //   this.attemptSignup({
  //     email: this.email,
  //     password: this.password,
  //     attributes: {
  //       first_name: this.first_name,
  //       last_name: this.phone.replace(/\D/g, ''),
  //       phone: this.phone.replace(/\D/g, ''),
  //       promo: this.promo_code
  //     }
  //   })
  //     .catch((error) => {
  //       console.log(error);
  //       Vue.notify({
  //         title: 'Error',
  //         text:
  //           'There was an issue signing up. Please contact Good Tree support: 510-725-4405.',
  //         type: 'error'
  //       });
  //       this.HandleUnsuccessfulLogin(error);
  //       return Promise.reject(error);
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       Vue.notify({
  //         title: 'Welcome',
  //         text:
  //           'You have successfully signed up. You will receive a text alert when your profile is approved. Please keep in mind that we only verify customers during business hours between 10am and 11pm.'
  //       });
  //       this.submitted = false;
  //       this.$router.push({ name: 'validate' });
  //     });
  // }
}
</script>
