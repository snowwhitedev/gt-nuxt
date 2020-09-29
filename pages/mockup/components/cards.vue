<template>
  <div class="component-container">
    <h5>Cards components</h5>
    <div class="component-section">
      <div>
        <div class="d-flex align-items-center">
          <div class="mr-3" :class="`progress-badge doing`"></div>
          <p class="font-weight-bold">Product List Card</p>
        </div>
        <ProductListCard />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductListCard from '@/components/Mockup/Cards/ProductListCard.vue';
@Component({
  components: {
    ProductListCard
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
