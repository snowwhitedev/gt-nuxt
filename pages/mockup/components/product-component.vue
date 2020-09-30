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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductListCard from '@/components/Mockup/Products/ProductListCard.vue';
import ProductOffer from '@/components/Mockup/Products/ProductOffer.vue';
@Component({
  components: {
    ProductListCard,
    ProductOffer
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
  width: fit-content;
}
.component-section {
  width: 450px;
  border: 2px solid #cccccc;
  border-radius: 10px;
  padding: 15px 10px;
}
</style>
