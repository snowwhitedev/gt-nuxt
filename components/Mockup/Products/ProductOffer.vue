<template>
  <div class="product-offer">
    <img
      src="https://www.quiltybox.com/SSP%20Applications/Quilty%20Box/Quilty%20Box/03-2020-THREAD_Media.png"
      alt="product-image"
    />
    <div class="description">
      <h5 class="">Good Tree One Gram Vapes for $40</h5>
      <button>Shop Now</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class MockProductOffer extends Vue {}
</script>

<style lang="scss" scoped>
.product-offer {
  background: #000000;
  padding: 40px 20px;
  display: flex;
  align-items: center;
  img {
    width: 180px;
  }
  .description {
    h5 {
      color: white;
      font-weight: 600;
      font-size: 28px;
    }
    button {
      background: $color-main;
      border-radius: 50px;
      border: none;
      color: white;
      font-size: 18px;
      font-weight: 600;
      width: 100%;
      min-width: 100px;
      padding: 10px;
    }
    button:focus {
      outline: none;
    }
  }
}
</style>
