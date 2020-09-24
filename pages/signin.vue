<template>
  <div class="d-flex justify-content-center">
    <div class="registration-form">
      <!-- <Spinner v-if="submitted"></Spinner> -->
      <div class="form-header">
        <h2>Sign In</h2>
      </div>
      <!-- .form-header -->
      <form @submit.prevent="Signin">
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
        </div>
        <!-- .custom-control -->
        <div class="form-footer">
          <button
            type="submit"
            :style="submitted ? 'opacity:0.3;' : ''"
            class="btn btn-submit"
            :disabled="submitted"
          >
            Sign In
          </button>
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
import {  SIGN_IN_USER } from "../store/actionTypes";
import { authNameSpace } from "@/store/auth";
@Component({
  components: {
    // Spinner,
    // VueTelInput
  }
})

export default class SiginPage extends Vue {

  first_name: string = 'Temp';
  last_name: string = 'Doe';
  email: string = '';
  password: string = '';
  phone: string = '+1-202-555-0152';
  promo_code: string = 'abc';
  checked: boolean = false;
  submitted = false;


  @authNameSpace.Action(SIGN_IN_USER)
  private signInUser!: (credential: any ) => void

  async Signin() {
    try {
      await this.signInUser({
        email: this.email,
        password: this.password
      });
      this.$router.push({ path: "/" });
    } catch (err) {
      console.log("[error]", err);
    }
    
  }

}
</script>