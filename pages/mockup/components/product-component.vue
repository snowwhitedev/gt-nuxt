<template>
  <div class="component-container">
    <h5>Cards components</h5>
    <div class="component-section">
      <div>
        <div class="d-flex align-items-center">
          <div class="mr-3" :class="`progress-badge doing`"></div>
          <p class="font-weight-bold">Product List Card</p>
        </div>
        <ProductListCard
          image="https://banner2.cleanpng.com/20180323/pve/kisspng-fruit-tree-fruit-tree-clip-art-tree-5ab48b2116fcb7.7236415115217815370942.jpg"
        />
      </div>
      <div class="mt-3">
        <div class="d-flex align-items-center mb-2">
          <div class="mr-3" :class="`progress-badge doing`"></div>
          <p class="font-weight-bold">Product offer</p>
        </div>
        <product-offer />
      </div>
      <div class="mt-3">
        <div class="d-flex align-items-center mb-2">
          <div class="mr-3" :class="`progress-badge doing`"></div>
          <p class="font-weight-bold">Product Introduction Card</p>
        </div>
        <ProductIntroCard
          image="https://leafly-production.imgix.net/https%3A%2F%2Fleafly-public.s3-us-west-2.amazonaws.com%2Fproducts%2Fphotos%2FYz5iPPazSGjXmz25JBbD_Grapefruit+Durban.jpg?ixlib=rails-4.0.0&w=240&h=&fit=crop&bg=FFFFFF&fm=jpg&q=80&s=7bcde35f13e34cb916fc8408f4f6a952"
          name="Mango Shebert"
          cost="$xx.xx / xx G"
        />
      </div>
      <div class="mt-3">
        <div class="d-flex align-items-center mb-2">
          <div class="mr-3" :class="`progress-badge doing`"></div>
          <p class="font-weight-bold">Product Carousel</p>
        </div>
        <Carousel>
          <div class="slide">
            <h3>slide 1</h3>
          </div>
          <div class="slide">
            <h3>slide 2</h3>
          </div>
          <div class="slide">
            <h3>slide 3</h3>
          </div>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductListCard from '@/components/Mockup/Products/ProductListCard.vue';
import ProductOffer from '@/components/Mockup/Products/ProductOffer.vue';
import ProductIntroCard from '@/components/Mockup/Products/ProductIntroCard.vue';
import Carousel from '@/components/Mockup/Products/Carousel.vue';
@Component({
  components: {
    ProductListCard,
    ProductOffer,
    ProductIntroCard,
    Carousel
  }
})
export default class MockButtons extends Vue {
  private cnt1: number = 0;
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.component-container {
  margin: 0 auto;
  width: 100%;
  max-width: 450px;
}
.component-section {
  width: 100%;
  border: 2px solid #cccccc;
  border-radius: 10px;
  padding: 15px 10px;
}
</style>
