<template>
  <div>
    <PromotionBar />
    <ProductOrderCard
      :title="product.title"
      :description="product.description"
      :image="product.image"
      :order-count="product.orderCount"
      :cost="product.cost"
      :type="product.type"
      :thc="product.thc"
      :cbd="product.cbd"
      :effects="product.effects"
    />
    <ProductDetailCard />
    <banner-top :title="bannerTitle" :description="bannerText" />
    <div class="page-options mt-4 mb-4">
      This is carousel part. It is comming soon.
    </div>
    <About />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PromotionBar from '@/components/Mockup/Misc/PromotionBar.vue';
import ProductOrderCard from '@/components/Mockup/Products/ProductOrderCard.vue';
import ProductDetailCard from '@/components/Mockup/Products/ProductsDetailCard.vue';
import BannerTop from '@/components/Mockup/Misc/BannerTop.vue';
import About from '@/components/Mockup/Products/About.vue';
@Component({
  layout: 'mockup',
  components: {
    PromotionBar,
    ProductOrderCard,
    ProductDetailCard,
    BannerTop,
    About
  },
  data() {
    return {};
  }
})
export default class MockProductPageMobile extends Vue {
  private product: object = {
    title: 'Budzila',
    description:
      'Your Description here. Your Description here. Your Description here. Your Description here. Your Description here. Your Description here. Your Description here.',
    image:
      'https://leafly-production.imgix.net/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fleafly-images%2Fmenu%2F1kJ6kYfTOe22V32LKlC3_14g+Special.PNG?ixlib=rails-4.0.0&w=490&h=&fit=crop&bg=FFFFFF&fm=jpg&q=80&s=ba033af4663d197859cfb441bf6ed117',
    orderCount: 1,
    cost: 59.99,
    type: 'Indica',
    thc: '17%',
    cbd: '3%',
    effects: 'Happy, Peaceful, and Relaxed'
  };

  private bannerTitle: string = 'Grown With The Highest Standards';
  private bannerText: string = 'Your text here. Your text here. Your text here';
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
}
p {
  margin: 0;
}
.page-options {
  border-bottom: 1px solid #cccccc;
}
.page-option {
  width: 220px;
  margin: 0 auto;
  margin-bottom: 15px;
}
.sort-option {
  position: relative;
  width: 100%;
  height: 40px;
  border: 2px solid #4e4e4e;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .sort-icon {
    position: absolute;
    right: 10px;
    color: $color-main;
  }
}
ul.products-list li {
  border-bottom: 1px solid #cccccc;
}
ul.products-list li:last-child {
  border-bottom: none;
}
</style>
