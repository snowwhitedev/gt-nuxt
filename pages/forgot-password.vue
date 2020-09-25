<template>
  <div class="account-page">
    <!-- <p>
      for test click
      <nuxt-link to="/recovery-password/12345testtoken">here</nuxt-link>
    </p> -->
    <div class="d-flex justify-content-center">
      <div class="flex-content">
        <div class="form-header">
          <div class="logo">
            <img
              src="images/logo-footer.svg"
              class="img-fluid"
              alt="Good Tree"
            />
          </div>
          <!-- .logo -->
          <h2>Forgot password</h2>
        </div>
        <!-- .form-header -->

        <form @submit.prevent="NewPassword">
          <div class="form-box mini">
            <div class="form-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12">
                    <div class="forgot-password-text">
                      <p>
                        Email with your credentials will be sent to your email
                        address
                      </p>
                    </div>
                    <!-- .forgot-password-text -->
                    <div class="form-group">
                      <label class="form-label">E-mail</label>
                      <input
                        v-model="email"
                        type="email"
                        name="email"
                        class="form-control"
                      />
                    </div>
                    <!--.form-group -->
                  </div>
                  <!-- .col-md-12 -->
                </div>
                <!-- .row -->
              </div>
              <!-- .container-fluid -->
            </div>
            <!-- .form-body -->
            <div class="form-footer">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12">
                    <input
                      type="submit"
                      class="btn btn-submit"
                      value="Get started"
                      @click.prevent="NewPassword"
                    />
                  </div>
                  <!-- .col-md-6 -->
                </div>
                <!-- .row -->
              </div>
              <!-- .container-fluid -->
            </div>
            <!-- .form-footer -->
          </div>
          <!-- .form-box -->
        </form>
      </div>
      <!-- .flex-content -->
    </div>
    <!-- .flex-center -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ForgotPasswordPage extends Vue {
  email = '';
}
</script>
