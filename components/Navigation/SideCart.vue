<template>
  <nav-cart
    v-on-clickaway="close"
    :class="{ slideInRight: DropdownCart, slideOutRight: !DropdownCart }"
  >
    <transition-group
      style="position: relative; display: block"
      name="anim"
      tag="div"
    >
      <NavCartItem
        v-for="product in Cart"
        :key="product.Product.SKU"
        :item="product"
      ></NavCartItem>
    </transition-group>
  </nav-cart>
</template>

<script lang="ts">
// need to fix nav menu for cellphones
// change when authenticated to display cart
import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter, Mutation, Action, State } from 'vuex-class';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faShoppingCart,
  faArrowsAltH,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mixin as clickaway } from 'vue-clickaway';
import { OrderItem } from '@/types';
import { Analytics, Event } from '../../../services/AnalyticsService';
import NavCartItem from './NavCartItem.vue';
library.add(faBars, faShoppingCart, faArrowsAltH, faSearch);

Vue.component('font-awesome-icon', FontAwesomeIcon);
@Component({
  name: 'TheNavBar',
  components: {
    NavCartItem
  },
  mixins: [clickaway]
})
export default class NavBar extends Vue {
  @Getter('LoggedIn') LoggedIn!: boolean;
  @Getter('CustomerName') Customer!: string;
  @Getter('CustomerStatus') Status;
  @Action('attemptLogout') Logout;
  @State((state) => state.Order.OrderStatus) status: string;
  // tax : Number = 3;
  // fee : Number = 3;
  // total : Number = 30;
  dropDown: boolean = false;
  productDropDown: boolean = false;
  DropdownCart: boolean = false;
  DropdownAccount: boolean = false;
  loginBool = false;
  @Getter('ShoppingCart') Cart: OrderItem[];
  @Getter('CartID') CartID!: string;

  get CartCount(): Number {
    return this.Cart.length;
  }

  logout() {
    this.Logout();
    this.close();
    this.$router.push({ name: 'home' });
  }

  toggleNav() {
    this.DropdownAccount = false;
    this.DropdownCart = false;
    this.dropDown = !this.dropDown;
    if (this.dropDown) {
      document.getElementsByTagName('body')[0].classList.add('overflown');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('overflown');
    }
  }

  toggleProductBar() {
    this.DropdownAccount = false;
    this.DropdownCart = false;
    this.productDropDown = !this.productDropDown;
  }

  toggleCartNav() {
    this.DropdownCart = !this.DropdownCart;
    this.productDropDown = false;
    if (this.DropdownCart) {
      Analytics.registerEvent({
        event: Event.CartViewed,
        cart_id: this.CartID,
        products: Array.from(this.Cart.values())
      });
    }
    this.DropdownAccount = false;
  }

  toCart() {
    this.$router.push({ name: 'checkout' });
    this.DropdownAccount = false;
    this.DropdownCart = false;
    this.dropDown = false;
  }

  toggleAccountNav() {
    this.DropdownAccount = !this.DropdownAccount;
    this.DropdownCart = false;
  }

  close() {
    this.DropdownAccount = false;
    this.DropdownCart = false;
    this.productDropDown = false;
    this.dropDown = false;
  }

  signin() {
    this.DropdownAccount = false;
    this.DropdownCart = false;
    this.productDropDown = false;
    this.dropDown = false;
    this.loginBool = true;
  }
}
</script>
<style>
.anim-enter-active {
  transition: all 1s;
}
.anim-leave-active {
  transition: all 400ms ease-in;
  position: absolute !important;
  z-index: 0;
}
.anim-enter, .anim-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
.anim-move {
  transition: all 600ms ease-in-out 50ms;
}
</style>
