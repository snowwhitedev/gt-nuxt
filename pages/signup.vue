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
            <router-link to="/terms">Terms and Conditions</router-link>
          </label>
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
import { Component, Vue } from 'vue-property-decorator';
import { authNameSpace } from '@/store/auth';
import { SIGN_UP_USER } from '../store/actionTypes';
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
  private signUpuser!: (credential: any) => void;

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
          promo: this.promo_code
        }
      });
      this.$router.push({ path: '/' });
    } catch {}
  }
}
</script>
