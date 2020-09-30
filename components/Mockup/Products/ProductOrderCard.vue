<template>
  <div class="product-detail-card">
    <img :src="image" alt="Product detail" />
    <div class="mt-4 text-center">
      <h1 class="product-title">{{ title }}</h1>
      <p class="product-text">{{ description }}</p>
    </div>
    <div class="card-actions">
      <button-count v-model="count" direction="horizontal" class="card-count" />
      <button class="add-btn mt-2">Add to cart - ${{ cost }}</button>
    </div>
    <div
      class="summary d-flex align-items-center justify-content-around pb-4 pt-2"
    >
      <div class="text-center">
        <p class="summary-title">Type</p>
        <p class="summary-content">{{ type }}</p>
      </div>
      <div class="text-center">
        <p class="summary-title">THC</p>
        <p class="summary-content">{{ thc }}</p>
      </div>
      <div class="text-center">
        <p class="summary-title">CBD</p>
        <p class="summary-content">{{ cbd }}</p>
      </div>
    </div>
    <div class="pt-4 text-center">
      <p class="summary-title">EFFECTS</p>
      <p class="font-weight-bold">{{ effects }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ButtonCount from '../Buttons/ButtonCount.vue';
@Component({
  components: {
    ButtonCount
  }
})
export default class MockProductDetailCard extends Vue {
  @Prop(String) title!: any;
  @Prop(String) description!: any;
  @Prop(String) image!: any;
  @Prop(Number) orderCount!: any;
  @Prop(Number) cost!: any;
  @Prop(String) type!: any;
  @Prop(String) thc!: any;
  @Prop(String) cbd!: any;
  @Prop(String) effects!: any;

  private count: number = 0;

  created() {
    this.count = this.orderCount;
  }
}
</script>

<style lang="scss" scoped>
.product-detail-card {
  padding: 30px 20px;
  img {
    width: 100%;
  }
}
h1.product-title {
  font-size: 30px;
  color: $color-main;
  font-weight: 600;
}
.product-text {
  font-size: 14px;
  font-weight: 600;
  color: #6c7378;
}
.card-actions {
  padding: 30px 15px;
}
.add-btn {
  width: 100%;
  background: $color-main;
  color: #ffffff;
  border: none;
  height: 40px;
  border-radius: 20px;
}
.add-btn:focus {
  outline: none;
}
.summary {
  margin: 0 15px;
  border-bottom: 2px solid #474747;
}
.summary-title {
  color: $color-main;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
}
.summary-content {
  font-weight: 600;
  font-size: 18px;
}
</style>
