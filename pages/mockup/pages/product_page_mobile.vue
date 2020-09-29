<template>
  <div>
    <PromotionBar />
    <banner-top />
    <div class="page-options mt-4">
      <div class="page-option"><search /></div>
      <div class="page-option">
        <div class="sort-option">
          <p class="font-weight-bold">Sort By</p>
          <font-awesome-icon :icon="['fas', 'arrow-down']" class="sort-icon" />
        </div>
      </div>
      <div class="page-option">
        <h4 class="text-center font-weight-bold">Flower</h4>
      </div>
    </div>
    <ul>
      <li v-for="product in products" :key="product.id">
        <ProductListCard
          :added="product.added"
          :propCount="product.propCount"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PromotionBar from '@/components/Mockup/Misc/PromotionBar.vue';
import BannerTop from '@/components/Mockup/Misc/BannerTop.vue';
import ProductListCard from '@/components/Mockup/Cards/ProductListCard.vue';
import Search from '@/components/Mockup/Misc/Search.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowDown);
@Component({
  layout: 'mockup',
  components: {
    PromotionBar,
    BannerTop,
    ProductListCard,
    Search
  },
  data() {
    return {
      products: [
        { id: 1, added: false, propCount: 0 },
        { id: 2, added: true, propCount: 0 },
        { id: 3, added: false, propCount: 1 }
      ]
    };
  }
})
export default class MockProductPageMobile extends Vue {}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
}
p {
  margin: 0;
}
.page-options {
  border-bottom: 1px solid #cccccc;
}
.page-option {
  width: 220px;
  margin: 0 auto;
  margin-bottom: 15px;
}
.sort-option {
  position: relative;
  width: 100%;
  height: 40px;
  border: 2px solid #4e4e4e;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .sort-icon {
    position: absolute;
    right: 10px;
    color: $color-main;
  }
}
li {
  border-bottom: 1px solid #cccccc;
}
</style>
