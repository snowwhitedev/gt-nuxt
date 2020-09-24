<template>
  <div class="d-flex justify-content-center">
    <div class="registration-form">
      <!-- <Spinner v-if="submitted"></Spinner> -->
      <div class="form-header">
        <h2>Sign Up</h2>
      </div>
      <!-- .form-header -->
      <form @submit.prevent="Signup">
        <div class="form-body">
          <div class="form-group">
            <label class="form-label">E-mail</label>
            <input
              type="email"
              name="email"
              autocomplete="email"
              class="form-control"
              v-model="email"
              required
            />
          </div>
          <!--.form-group -->
          <div class="form-group">
            <label class="form-label">Password</label>
            <input
              type="password"
              name="new-password"
              autocomplete="new-password"
              class="form-control"
              v-model="password"
              required
            />
          </div>
          <!--.form-group -->
          <!-- <div class="form-group">
            <label class="form-label">Phone number</label>
            <vue-tel-input
              v-model="phone"
              defaultCountry="USA"
              placeholder="(123) 456-7890"
              inputClasses="form-control"
              :maxLen="14"
              :required="true"
            ></vue-tel-input>
          </div> -->
        </div>
        <!-- .form-body -->
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="conditions"
            required
            v-model="checked"
          />
          <label
            class="custom-control-label custom-checkbox-label"
            for="conditions"
          >
            I accept <router-link to="/terms">Terms and Conditions</router-link></label
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
            Get Started
            <!-- <font-awesome-icon
              v-if="submitted"
              :icon="['fas', 'circle-notch']"
              class="fa-spin"
              size="2x"
            /> -->
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { SIGN_UP_USER, SIGN_IN_USER } from "../store/actionTypes";
import { authNameSpace } from "@/store/auth";
@Component({
  components: {
    // Spinner,
    // VueTelInput
  }
})
export default class Home extends Vue {

  first_name: string = 'Temp';
  last_name: string = 'Doe';
  email: string = '';
  password: string = '';
  phone: string = '+1-202-555-0152';
  promo_code: string = 'abc';
  checked: boolean = false;
  submitted = false;


  @authNameSpace.Action(SIGN_UP_USER)
  private signUpuser!: (credential: any ) => void

  async Signup() {
    // this.increment();
    try {
      await this.signUpuser({
        email: this.email,
        password: this.password,
        attributes: {
          first_name: this.first_name,
          last_name: this.last_name,
          phone: this.phone.replace(/\D/g, ''),
          promo: this.promo_code,
        }
     });
     this.$router.push({ path: "/" });
    } catch {
      console.log("sign up error");
    }
    
    // NProgress.start();
    // if (this.phone.replace(/\D/g, '').length != 10) {
    //   Vue.notify({
    //     title: 'Oops',
    //     text: 'Please enter a properly formatted phone number.',
    //     type: "warn",
    //   })
    //   return
    // }
    // this.submitted = true;
    // console.log("[submit]", this.email, this.password, this.phone);

    // this.signUpUser(
    //   {
    //     email: this.email,
    //     password: this.password,
    //     attributes: {
    //       first_name: this.first_name,
    //       last_name: this.last_name,
    //       phone: this.phone.replace(/\D/g, ''),
    //       promo: this.promo_code,
    //     }
    //   }
    // ).catch(error => {
    //   console.log(error)
    //   // Vue.notify({
    //   //   title: 'Error',
    //   //   text: 'There was an issue signing up. Please contact Good Tree support: 510-725-4405.',
    //   //   type: "error",
    //   // })
    //   this.handleUnsuccessfulLogin(error);
    //   return Promise.reject(error)
    // }).then((response) => {
    //   console.log(response)
    //   // Vue.notify({
    //   //   title: 'Welcome',
    //   //   text: 'You have successfully signed up. You will receive a text alert when your profile is approved. Please keep in mind that we only verify customers during business hours between 10am and 11pm.'
    //   // })
    //   this.submitted = false
    //   this.$router.push({ name: "validate" });
    // })
  }
}
</script>