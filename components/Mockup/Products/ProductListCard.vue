<template>
  <div class="product-list-card">
    <b-overlay :show="added">
      <div class="d-flex align-items-center">
        <div class="mr-4">
          <p class="product-name">GT Royal OG</p>
          <p class="product-brief">Indica THC 21.6%</p>
          <p class="amount mt-4">$xx.xx / xx G</p>
        </div>
        <img :src="image" alt="Product image" class="product-image" />
      </div>
      <button-count v-model="count" class="card-count" />
      <template v-slot:overlay>
        <div class="d-flex flex-column align-items-center">
          <div class="check-mark">
            <font-awesome-icon :icon="['fas', 'check']" class="icon-check" />
          </div>
          <p class="added-text mt-3">Added to Cart</p>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import ButtonCount from '../Buttons/ButtonCount.vue';
library.add(faCheck);
@Component({
  props: {
    added: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: ''
    }
  },
  components: {
    ButtonCount
  }
})
export default class MockProductListCard extends Vue {
  @Prop(Number) propCount!: any;

  private count: number = 0;

  created() {
    this.count = this.propCount;
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.product-list-card {
  position: relative;
  padding: 30px 25px;
}
.product-name {
  font-weight: 600;
  color: $color-main;
  margin-bottom: 5px;
}
.product-brief {
  color: #aaaaaa;
}
.product-image {
  width: 80px;
  height: 120px;
}
.card-count {
  position: absolute;
  right: 20px;
  top: 20px;
}
.amount {
  font-weight: bold;
}
.added-text {
  font-weight: bold;
  font-size: 1.1em;
}
.check-mark {
  width: 50px;
  height: 50px;
  background: $color-main;
  border-radius: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-check {
  font-size: 32px;
}
</style>
