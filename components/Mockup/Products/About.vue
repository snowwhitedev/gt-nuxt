<template>
  <div class="about">
    <img
      src="https://goodtreecbd.com/wp-content/uploads/2020/07/DSC5383-Edit-1.jpg"
      alt="GoodTree"
    />
    <div class="description text-center p-5">
      <p class="title">Goodbye Middle Man.</p>
      <p class="title mt-1">Hello More Savings</p>
      <p class="text mt-3">
        Good Tree cannabis products are grown, manufactured, and delivered by
        our team so we gurantee our prices get you the best bang for your buck.
      </p>
      <button class="cta-btn mt-4">Shop Now</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.about {
  img {
    width: 100%;
  }
  .description {
    background: #f1f2f2;
    .title {
      font-weight: 600;
      font-size: 24px;
    }
    .text {
      font-size: 16px;
      font-weight: 500;
    }
    .cta-btn {
      width: 220px;
      height: 40px;
      background: $color-main;
      border-radius: 20px;
      border: none;
      color: #ffffff;
      font-weight: 600;
    }
  }
}
button:focus {
  outline: none;
}
</style>
