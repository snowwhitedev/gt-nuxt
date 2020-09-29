<template>
  <div class="d-flex flex-row align-items-center promotion-bar">
    <div class="scale-animation promotion-text">
      Buy 3 get 1 <strong>FREE</strong> on all 1/8ths
    </div>
    <nuxt-link
      id="promotion-navigation"
      to="/products/flower"
      style="padding: 4px 12px"
      class="promotion-link"
    >
      Shop Now
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class PromotionBar extends Vue {}
</script>

<style lang="scss" scoped>
.promotion-bar {
  background: #4f5362;
  color: white;
  padding: 8px;
  justify-content: center;
  font-size: 0.9rem;
}
.promotion-text {
  margin: 0 24px 0 0;
}
.promotion-link {
  color: #000000;
  font-weight: 600;
}
.promotion-link:hover {
  text-decoration: none;
  color: white;
}
</style>
