<template>
  <div>
    <PromotionBar />
    <banner-top />
    <div class="page-options">
      <search />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PromotionBar from '@/components/Mockup/Misc/PromotionBar.vue';
import BannerTop from '@/components/Mockup/Misc/BannerTop.vue';
import Search from '@/components/Mockup/Misc/Search.vue';
@Component({
  layout: 'mockup',
  components: {
    PromotionBar,
    BannerTop,
    Search
  }
})
export default class MockProductPageMobile extends Vue {}
</script>

<style></style>
