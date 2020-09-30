<template>
  <div class="component-container">
    <h5>Misc components</h5>
    <div class="component-section">
      <div>
        <div class="d-flex align-items-center">
          <div class="mr-3" :class="`progress-badge doing`"></div>
          <p class="font-weight-bold">Promotion Bar</p>
        </div>
        <promotion-bar />
      </div>
      <div class="mt-3">
        <div class="d-flex align-items-center">
          <div class="mr-3" :class="`progress-badge doing`"></div>
          <p class="font-weight-bold">Banner Top</p>
        </div>
        <banner-top title="Your Title Here" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PromotionBar from '@/components/Mockup/Misc/PromotionBar.vue';
import BannerTop from '@/components/Mockup/Misc/BannerTop.vue';

@Component({
  components: {
    PromotionBar,
    BannerTop
  }
})
export default class MockButtons extends Vue {}
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
  width: 100%;
  max-width: 450px;
  border: 2px solid #cccccc;
  border-radius: 10px;
  padding: 15px 10px;
}
</style>
