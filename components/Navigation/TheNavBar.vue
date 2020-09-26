<template>
  <nav id="main-menu" class="navbar navbar-expand-lg fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="/images/logo-header.svg" class="img-fluid" alt="Good Tree" />
        <span>Good Tree</span>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        name="toggle-nav"
        @click.prevent="toggleNav()"
      >
        <font-awesome-icon :icon="['fa', 'bars']"></font-awesome-icon>
      </button>

      <div
        id="mainMenuContent"
        class="collapse navbar-collapse"
        :class="{ show: dropDown }"
      >
        <ul class="navbar-nav primary-nav">
          <li class="nav-item">
            <!-- <a class="nav-link dropdown-toggle" @click="toggleProductBar()">Products</a> -->
            <nuxt-link
              to="/products/flower"
              class="nav-link"
              aria-label="browse-products"
              @click="close()"
            >
              Products
            </nuxt-link>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link dropdown-toggle" @click="toggleProductBar()">Products</a> -->
            <a
              class="nav-link"
              href="https://goodtreecbd.com/"
              target="_blank"
              aria-label="browse-cbd"
              >CBD</a
            >
          </li>
        </ul>
        <search></search>
        <ul v-if="!loggedIn" class="navbar-nav secondary-nav">
          <li class="nav-item">
            <!-- make login modal appear -->
            <a class="nav-link" @click="signin()">Sign In</a>
          </li>
          <li class="nav-item highlighted">
            <nuxt-link to="/signup" class="nav-link" @click="close()">
              Sign Up
            </nuxt-link>
          </li>
        </ul>
        <ul v-else class="navbar-nav secondary-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/profile">My orders</router-link>
          </li>
        </ul>
        <ul v-if="orderStatus != 'Submitted'" class="navbar-nav tertiary-nav">
          <li class="nav-item">
            <a class="nav-link click-for-cart" @click="toggleCartNav()">
              <font-awesome-icon
                style="margin-right: 0.5em"
                :icon="['fa', 'shopping-cart']"
              ></font-awesome-icon
              >Cart
              <font-awesome-icon
                :style="{ color: '#ED008C' }"
                :icon="['fa', 'arrows-alt-h']"
              ></font-awesome-icon>
              {{ cartCount }} items
            </a>
          </li>
        </ul>
      </div>
      <!-- .collapse -->
    </div>
    <!-- .container -->
  </nav>
  <!-- #main-menu -->
</template>

<script lang="ts">
// need to fix nav menu for cellphones
// change when authenticated to display cart
import Vue from 'vue';
import Component from 'vue-class-component';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faShoppingCart,
  faArrowsAltH,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { authNameSpace } from '@/store/auth';
// import NavCartItem from '@/modules/checkout/components/NavCartItem.vue';
// import NavCart from '@/modules/checkout/components/NavCart.vue';
import Search from './Search.vue';
// import Signin from '@/components/Signin.vue';
library.add(faBars, faShoppingCart, faArrowsAltH, faSearch);
Vue.component('font-awesome-icon', FontAwesomeIcon);
@Component({
  name: 'TheNavBar',
  components: {
    // Signin,
    // NavCartItem,
    // NavCart,
    Search
  }
})
export default class NavBar extends Vue {
  dropDown: boolean = false;
  cartCount: Number = 3;

  @authNameSpace.Getter('LoggedIn')
  private loggedIn!: boolean;

  orderStatus: string = 'not';

  // @Getter('CustomerName') Customer!: string;
  // @Getter('CustomerStatus') Status;
  // @Getter('OrderStatus') OrderStatus;
  // @Action('attemptLogout') Logout;
  // @State((state) => state.Order.OrderStatus) status: string;
  // //tax : Number = 3;
  // //fee : Number = 3;
  // //total : Number = 30;
  // dropDown: boolean = false;
  // productDropDown: boolean = false;
  // DropdownCart: boolean = false;
  // DropdownAccount: boolean = false;
  // @Getter('ShoppingCart') Cart!: Array<Object>;
  // @Getter('CartID') CartID!: string;
  // get CartCount(): Number {
  //   return this.Cart.length;
  // }
  // logout() {
  //   this.Logout();
  //   this.close();
  //   this.$router.push({ name: 'home' });
  // }
  // toggleNav() {
  //   this.DropdownAccount = false;
  //   this.DropdownCart = false;
  //   this.dropDown = !this.dropDown;
  //   this.$emit('DropDownCart', this.DropdownCart);
  //   this.setBodyOverflow();
  // }
  // toggleProductBar() {
  //   this.DropdownAccount = false;
  //   this.DropdownCart = false;
  //   this.productDropDown = !this.productDropDown;
  //   this.setBodyOverflow();
  //   this.$emit('DropDownCart', this.DropdownCart);
  // }
  // toggleCartNav() {
  //   this.DropdownCart = !this.DropdownCart;
  //   this.productDropDown = false;
  //   this.dropDown = false;
  //   if (this.DropdownCart) {
  //     Analytics.registerEvent({
  //       event: Event.CartViewed,
  //       cart_id: this.CartID,
  //       products: this.Cart
  //     });
  //   }
  //   this.setBodyOverflow();
  //   this.DropdownAccount = false;
  //   this.$emit('DropDownCart', this.DropdownCart);
  // }
  // toggleAccountNav() {
  //   this.DropdownAccount = !this.DropdownAccount;
  //   this.DropdownCart = false;
  //   this.$emit('DropDownCart', this.DropdownCart);
  // }
  // close() {
  //   this.DropdownAccount = false;
  //   this.DropdownCart = false;
  //   this.productDropDown = false;
  //   this.dropDown = false;
  //   this.setBodyOverflow();
  //   this.$emit('DropDownCart', this.DropdownCart);
  // }
  // setBodyOverflow() {
  //   if (this.dropDown) {
  //     document.getElementsByTagName('body')[0].classList.add('overflown');
  //     document.getElementById('main-menu').style.zIndex = '9999';
  //   } else {
  //     document.getElementsByTagName('body')[0].classList.remove('overflown');
  //     document.getElementById('main-menu').style.zIndex = '1031';
  //   }
  // }
  signin() {
    // this.DropdownAccount = false;
    // this.DropdownCart = false;
    // this.productDropDown = false;
    // this.dropDown = false;
    // //this.$emit("DropDownCart", this.DropdownCart);
    // this.setBodyOverflow();
    this.$emit('onLogin', true);
  }
}
</script>
<style>
.fade.show {
  display: block !important;
}
</style>
