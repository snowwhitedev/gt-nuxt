<template>
  <div style="position: relative">
    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding-right: 24px;
      "
    >
      <div class="text-center" style="flex: 1">
        <v-lazy-image
          style="width: auto; height: 50px"
          :src="item.Product.ImageUrl || '/images/logo-footer.svg'"
        />
      </div>
      <div style="flex: 3; margin-left: 16px">
        <div style="font-size: 0.9em; line-height: 1.15; margin-bottom: 0.5em">
          <div style="display: flex; justify-content: space-between">
            <div class="color-main">
              {{ item.Product.Name }}
            </div>
            <div class="text-right" style="width: 1em" @click="remove">
              <font-awesome-icon
                class="clickable"
                :icon="['fa', 'times']"
              ></font-awesome-icon>
            </div>
          </div>
        </div>

        <div
          class="flex-row"
          style="justify-content: space-between; align-items: center"
        >
          <div style="display: flex; flex-direction: column">
            <div class="text-muted text-center" style="font-size: 0.7em">
              Price
            </div>
            <div>
              <strong>${{ item.Product.Price }}</strong>
            </div>
          </div>

          <div class="flex-column" style="width: 100%">
            <div class="text-muted text-center" style="font-size: 0.7em">
              Quantity
            </div>
            <div class="flex-row flex-center">
              <button
                style="border: none"
                type="button"
                class="clickable-btn"
                @click="deincrement"
              >
                <font-awesome-icon
                  :icon="['fa', 'minus']"
                  style="margin: 8px; display: block"
                ></font-awesome-icon>
              </button>
              <div
                class="text-center"
                style="
                  color: #ed008c;
                  border: 1px solid #ed008c;
                  border-radius: 50%;
                  width: 32px;
                  height: 32px;
                  line-height: 32px;
                  font-size: 1em;
                "
              >
                {{ item.Quantity }}
              </div>
              <button
                style="border: none"
                type="button"
                class="clickable-btn"
                @click.prevent="increment"
              >
                <font-awesome-icon
                  style="margin: 8px; display: block"
                  :icon="['fa', 'plus']"
                ></font-awesome-icon>
              </button>
            </div>
          </div>
          <div class="flex-column text-right" style="width: 60px">
            <div class="text-muted" style="font-size: 0.7em">Total</div>
            <div class="color-main" style="font-size: 1.2em">
              <strong
                >${{
                  item.Quantity * item.Product.Price - item.Savings
                }}</strong
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="text-center"
      style="background: #ed008c; color: white; margin-top: 1rem"
      v-if="item.Savings"
    >
      <small style=""> Saved ${{ item.Savings }} for buy 3 get 1 free </small>
    </div>

    <hr
      style="margin-bottom: 1rem; border-top: 1px dashed rgba(0, 0, 0, 0.25)"
    />
  </div>
</template>

<script lang = "ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, Mutation } from 'vuex-class';
import { OrderItem } from '@/types';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrashAlt,
  faPlusSquare,
  faMinusSquare
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faTrashAlt, faMinusSquare, faPlusSquare);

@Component({
  name: 'NavCartItem',
  components: { FontAwesomeIcon },
  props: {
    item: Object
  }
})
export default class NavCartItem extends Vue {
  @Mutation('SetItem') SetItem: any;
  @Mutation('RemoveItem') RemoveItem: any;
  item: OrderItem;
  increment() {
    this.SetItem({
      Savings: 0,
      Quantity: this.item.Quantity + 1,
      Product: this.item.Product
    });
  }
  deincrement() {
    if (this.item.Quantity - 1 > 0) {
      this.SetItem({
        Savings: 0,
        Quantity: this.item.Quantity - 1,
        Product: this.item.Product
      });
    } else {
      this.remove();
    }
  }
  remove() {
    this.RemoveItem(this.item);
  }
}
</script>

<style scoped>
#main-menu .product-image {
  width: 26%;
}
#main-menu .product-name {
  width: 45%;
}
#main-menu .product-name h4 {
  font-size: 15px;
  line-height: 22.5px;
  margin: 0 0 10px 0;
  color: #ed008c;
  text-transform: uppercase;
}
#main-menu .product-price {
  width: 29%;
}
#main-menu .product-price h4 {
  font-size: 32px;
  line-height: 28px;
  margin: 0 0 10px 0;
  text-transform: uppercase;
}
#main-menu .product-price .btn-remove-product {
  font-size: 14px;
  line-height: 21px;
  color: #4f5362;
  padding: 2px 0;
}
#main-menu .input-group {
  border: 1px solid #eff0f4;
  border-radius: 2px;
  max-width: 100px;
}
#main-menu .input-group .form-control {
  background: transparent;
  color: #4f5362;
  padding: 8px 10px;
  text-align: center;
}
#main-menu .input-group .form-control:focus  {
  border: 1px solid transparent;
  box-shadow: none;
}
#main-menu .input-group-text {
  font-size: 14px;
  line-height: 21px;
  color: #4f5362;
  background: transparent;
  padding: 2px 8px;
  border: none;
}
#main-menu .input-group-text:hover {
  text-decoration: none;
}
</style>
