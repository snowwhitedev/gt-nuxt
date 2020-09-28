<template>
  <div class="product-list">
    <div class="category-header text-center">
      <router-link :to="'/products/' + title.toLowerCase()">
        <button
          v-if="title != 'All Items' && pages.length"
          class="base-button btn-dashed"
          style="margin-top: 24px; margin-bottom: 24px"
        >
          Explore all
        </button>
      </router-link>
    </div>
    <!-- style="position:relative;display:block;" name="anim" tag="div" -->
    <transition-group
      tag="div"
      class="products-list-container"
      name="anim2"
      style="position: relative"
    >
      <ProductCard
        v-for="item in pages"
        :id="item.SKU"
        :key="item.SKU"
        :product_id="item.SKU"
        :name="item.Name"
        :price="item.Price"
        :description="item.Description"
        :image="item.ImageUrl"
        :uom="item.UOM"
        :package-size="item.PackageSize"
      />
    </transition-group>
  </div>
  <!-- .product-list -->
</template>

<script lang="ts">
// need to fix how items render in rows because CSS
import Vue from 'vue';
import Component from 'vue-class-component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Prop } from 'vue-property-decorator';
import ProductCard from './ProductCard.vue';
library.add(faAngleRight);

Vue.component('font-awesome-icon', FontAwesomeIcon);
@Component({
  name: 'ProductsList',
  components: {
    ProductCard
  }
})
export default class ProductsList extends Vue {
  @Prop(Array) readonly pages: any;
  @Prop(String) readonly title: any;
  @Prop(String) readonly subtitle: any;
}
</script>

<style scoped>
.products-list-container {
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.product-list {
  margin-bottom: 85px;
}

.anim2-enter-active {
  transition: all 0.1s;
}
.anim2-leave-active {
  transition: all 400ms ease-in;
  position: absolute !important;
  z-index: -10;
}
.anim2-enter, .anim2-leave-to /* .list-leave-active below version 2.1.8 */ {
  transform: scale(0);
  opacity: 0;
  /* opacity: 0; */
  /* transform: translateX(30px); */
}
.anim2-move {
  transition: all 600ms ease-in-out 50ms;
}
</style>
