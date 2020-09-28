<template>
  <div style="display: flex; position: relative">
    <b-overlay
      :show="isUpdatingCart"
      rounded="sm"
      blur="1px"
      opacity="0.5"
      no-wrap
    >
      <template v-slot:overlay>
        <SpinnerInline></SpinnerInline>
      </template>
    </b-overlay>
    <div class="product-container" :class="{ 'in-cart': inCart }">
      <div class="product-header">
        <a>
          <v-lazy-image
            class="lazyload img-fluid"
            :src="image"
            alt="Product Image"
          />
        </a>
      </div>

      <div class="product-body">
        <h4 class="color-main">
          &dollar;{{ price }}
          <span
            v-if="
              packageSize ===
              3.5 /*||
                (name.includes('Stiiizy') && !name.includes('Battery'))*/
            "
            class="label color"
            >Buy 3 get 1 free</span
          >
          <span class="label" style="margin-right: 4px">{{
            packageSize + ' ' + uom
          }}</span>
        </h4>

        <h5 style="font-size: 1.2em">{{ name }}</h5>
        <hr v-if="shortDescription" style="border: " />
        <div
          v-if="packageSize === 3.5"
          style="margin-bottom: 1em"
          class="text-center color-main"
        ></div>
        <div v-if="shortDescription" class="product-text text-center">
          <small
            >{{ shortDescription }}
            <br />
            <span
              v-if="shortDescription && shortDescription.length >= 75"
              class="text-center"
              style="border-bottom: 1px dashed; cursor: pointer"
              @click="showProductDetails = true"
              >Read more</span
            >
          </small>
        </div>
      </div>

      <div>
        <transition name="slide-fade-bottom" mode="out-in">
          <div v-if="amount < 1" key="1" style="min-height: 42px">
            <!-- This div is a placeholder for appearing input so it does not extend container causing resizing -->
          </div>
          <div
            v-if="amount > 0"
            key="2"
            style="
              display: flex;
              justify-content: space-around;
              align-items: center;
            "
          >
            <div style="flex: 1; margin-right: -1px">
              <button
                class="base-button"
                style="
                  display: block;
                  width: 100%;
                  border: 1px solid #d9d9d9;
                  color: black;
                "
                @click="editAmount(-1)"
              >
                <font-awesome-icon :icon="['fas', 'minus']"></font-awesome-icon>
              </button>
            </div>
            <div style="flex: 2">
              <input
                v-model.number.lazy="amount"
                type="number"
                style="
                  width: 100%;
                  height: 42px;
                  padding: 0px;
                  text-align: center;
                  z-index: 150;
                  outline: none;
                  border: 1px solid #d9d9d9;
                "
                @change="editAmount(0)"
              />
            </div>
            <div style="flex: 1; margin-right: -1px; margin-left: -1px">
              <button
                class="base-button text-center"
                style="
                  text-align: center;
                  display: block;
                  width: 100%;
                  border: 1px solid #d9d9d9;
                  color: black;
                "
                @click="editAmount(1)"
              >
                <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div style="position: absolute; bottom: 1px; left: 50%; z-index: 100">
      <transition name="slide-fade-bottom" mode="out-in">
        <div
          v-if="amount > 0 && !isUpdatingCart"
          key="1"
          class="label"
          style="
            position: relative;
            left: -50%;
            transition-delay: 0.2s;
            padding-left: 15px;
            padding-right: 15px;
          "
        >
          <span style="padding: 0em 1em"
            ><strong
              :class="{
                'strike-through': total - totalOnCart > 1
              }"
              >${{ total && total.toFixed(2) }}</strong
            >
            <strong v-if="total - totalOnCart > 1" style="margin-left: 4px"
              >${{ totalOnCart && totalOnCart.toFixed(2) }}</strong
            ></span
          >
        </div>
        <button
          v-if="amount < 1"
          key="2"
          class="base-button"
          aria-label="add-to-cart"
          style="
            position: relative;
            bottom: -4.5px;
            left: -50%;
            border: 1px solid #ed008c;
            color: #ed008c;
            width: 45px;
            height: 45px;
            border-radius: 50%;
          "
          @click="addToCart()"
        >
          <font-awesome-icon
            style="margin-left: -2px; margin-bottom: -1px"
            size="lg"
            :icon="['fas', 'cart-plus']"
          ></font-awesome-icon>
        </button>
      </transition>
    </div>

    <PopUp v-if="showProductDetails" @close="showProductDetails = false">
      <template v-slot:header>
        <h4 style="margin-right: 10px">{{ name }}</h4>
      </template>
      <template v-slot:body>
        <p style="text-align: justify; max-height: 300px; overflow-y: auto">
          {{ description }}
        </p>
      </template>
    </PopUp>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { library } from '@fortawesome/fontawesome-svg-core';
import SpinnerInline from '@/components/UI/SpinnerInline.vue';

import PopUp from '@/components/UI/PopUp.vue';
import {
  faPlusCircle,
  faInfoCircle,
  faTimes,
  faPlus,
  faMinus,
  faCartPlus
} from '@fortawesome/free-solid-svg-icons';

import { Prop } from 'vue-property-decorator';
import { ProductDescriptionService } from '@/modules/products/ProductDescriptionService';
import { productsNameSpace } from '@/store/products';
import { GET_PRODUCTS_BY_IDS } from '@/store/actionTypes';

library.add(faPlusCircle, faInfoCircle, faTimes, faPlus, faMinus, faCartPlus);
Vue.component('font-awesome-icon');

const debounce = require('lodash.debounce');

@Component({
  name: 'ProductCard',
  components: { PopUp, SpinnerInline }
})
export default class ProductCard extends Vue {
  // @Mutation('SetItem') SetItem;
  // @productsNameSpace.Mutation(GET_PRODUCTS_BY_CATEGORY)
  // private getCategoryProducts!: (credential: any) => any;
  // @Getter('ShoppingCart') Cart;
  @productsNameSpace.Getter(GET_PRODUCTS_BY_IDS)
  private getProductsByIds!: any;

  @Prop(String) id: any;
  @Prop(String) product_id: any;
  @Prop(String) name: any;
  @Prop(Number) price: any;
  @Prop(String) description: any;
  @Prop(String) image: any;
  @Prop(String) uom: any;
  @Prop(Number) packageSize: any;

  private amount = 0;

  private get totalOnCart() {
    return this.price * this.amount - this.savings;
  }

  // Id of product in cart not product itself
  private productCartId: string = '';
  // Reference to product in cart
  private productOnCart: any;
  private isUpdatingCart = false;
  private showProductDetails = false;
  private shortDescription: string = '';
  private cartWatcher: any;
  private wasAddToCartClicked = false;

  private get total() {
    return this.price * this.amount;
  }

  private get inCart() {
    return this.amount > 0;
  }

  mounted() {
    this.shortDescription = ProductDescriptionService.getShortDescription(
      this.description
    );
    this.productOnCart = this.getProductFromCart(this.product_id);
    if (this.productOnCart) {
      this.initializeCartWatcher();
      this.amount = this.productOnCart.Quantity;
      // this.totalOnCart = (this.productOnCart.Quantity* this.price)-this.productOnCart.Savings;
      // this.savings=this.productOnCart.Savings;
      // this.productCartId = this.productOnCart.Product.SKU;
    }
  }

  private delayedOnCartChanged = debounce(this.onCartChanged, 500);

  private onCartChanged(newValue: any, oldValue: any) {
    console.log('[for compile1]', newValue, oldValue);
    this.isUpdatingCart = false;
    const productOnCart = this.getProductFromCart(this.product_id);

    if (!productOnCart) {
      this.amount = 0;
      return;
    }

    // this.amount = productOnCart.Quantity;

    // this.savings=productOnCart.Savings;
    // this.totalOnCart = (productOnCart.Quantity*this.price)-productOnCart.Savings;
    this.$forceUpdate();
  }

  private get savings() {
    // const item = this.getProductFromCart(this.product_id);
    // return item ? item.Savings : 0;
    return 0;
  }

  private getProductFromCart(productId: string) {
    // return this.Cart.filter((product: any) => product.Product.SKU === productId)[0];
    // return productId;
    console.log('[for compile2]', productId);
    return null;
  }

  addToCart() {
    this.wasAddToCartClicked = true;
    this.amount = 1;
    // this.SetItem({
    //   Savings: 0,
    //   Quantity: 1,
    //   Product: this.getProductsByIds([this.product_id])[0]
    // });
    this.wasAddToCartClicked = false;
  }

  private delayedItemEdit = debounce(this.editItem, 0);

  private editItem(productCard: any) {
    return productCard;
    // this.SetItem({
    //   Savings: 0,
    //   Quantity: productCard.quantity,
    //   Product: this.getProductsByIds([this.product_id])[0]
    // });
  }

  private editAmount(itemAmountToAdd: number) {
    itemAmountToAdd = Math.ceil(itemAmountToAdd);

    this.amount = this.amount + itemAmountToAdd;

    if (this.amount < 0) {
      this.amount = 0;
    }

    if (this.amount > 1000) {
      this.amount = 1000;
    }

    // this.totalOnCart = this.total;

    this.delayedItemEdit({
      id: this.productCartId,
      quantity: this.amount
    });
  }

  private initializeCartWatcher() {
    if (this.cartWatcher) {
      return;
    }

    this.cartWatcher = this.$watch('Cart', this.delayedOnCartChanged);
  }

  private destroyCartWatcher() {
    if (this.cartWatcher) {
      this.cartWatcher();
      this.cartWatcher = undefined;
    }
  }

  public beforeDestroy() {
    this.destroyCartWatcher();
  }
}
</script>

<style>
#btn-add-to-cart {
  display: inline-block;
  width: 100%;
}

.fade.show {
  display: block !important;
}

.product-container {
  margin: 1em;
  padding: 0.5em;
  width: 310px;
  display: flex;
  border-top: 3px solid #ed008c;
  border-bottom: 1px solid #ed008c;
  flex-direction: column;
  border-radius: 4px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  -webkit-box-shadow: 0px 0px 31px -13px rgba(0, 0, 0, 0.39);
  -moz-box-shadow: 0px 0px 31px -13px rgba(0, 0, 0, 0.39);
  box-shadow: 0px 0px 31px -13px rgba(0, 0, 0, 0.39);
  transition: box-shadow 0.35s ease-in-out;
  box-sizing: border-box;
  background-color: white;
}

.product-container.in-cart {
  -webkit-box-shadow: 0px 0px 14px 0px rgba(237, 0, 140, 0.8);
  -moz-box-shadow: 0px 0px 14px 0px rgba(237, 0, 140, 0.8);
  box-shadow: 0px 0px 14px 0px rgba(237, 0, 140, 0.8);
}

.product-header {
  text-align: center;
  height: 150px;
}

.product-body {
  padding: 0.5em;
  height: 100%;
}

.product-text {
  line-height: 1.3;
  text-align: justify;
  text-justify: inter-word;
  color: gray;
}

.product-body > h3 {
  padding-bottom: 4px;
  margin: 0px;
  color: #333;
}

.product-header > a > img {
  height: 100%;
  width: auto;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
