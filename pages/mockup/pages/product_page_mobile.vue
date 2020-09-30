<template>
  <div>
    <PromotionBar />
    <banner-top :title="bannerTitle" />
    <div class="page-options mt-4">
      <div class="page-option"><search /></div>
      <div class="page-option">
        <div class="sort-option">
          <p class="font-weight-bold">Sort By</p>
          <font-awesome-icon :icon="['fas', 'arrow-down']" class="sort-icon" />
        </div>
      </div>
      <div class="page-option">
        <h4 class="text-center font-weight-bold">Flower</h4>
      </div>
    </div>
    <ul class="products-list">
      <li v-for="product in products" :key="product.id">
        <ProductListCard
          :added="product.added"
          :prop-count="product.propCount"
          :image="product.image"
        />
      </li>
    </ul>
    <product-offer />
    <ul class="products-list">
      <li v-for="product in relatedProducts" :key="product.id">
        <ProductListCard
          :added="product.added"
          :prop-count="product.propCount"
          :image="product.image"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PromotionBar from '@/components/Mockup/Misc/PromotionBar.vue';
import BannerTop from '@/components/Mockup/Misc/BannerTop.vue';
import ProductListCard from '@/components/Mockup/Products/ProductListCard.vue';
import Search from '@/components/Mockup/Misc/MockSearch.vue';
import ProductOffer from '@/components/Mockup/Products/ProductOffer.vue';
@Component({
  layout: 'mockup',
  components: {
    PromotionBar,
    BannerTop,
    ProductListCard,
    Search,
    ProductOffer
  },
  data() {
    return {
      products: [
        {
          id: 1,
          added: false,
          propCount: 0,
          image:
            'https://banner2.cleanpng.com/20180323/pve/kisspng-fruit-tree-fruit-tree-clip-art-tree-5ab48b2116fcb7.7236415115217815370942.jpg'
        },
        {
          id: 2,
          added: true,
          propCount: 0,
          image:
            'https://banner2.cleanpng.com/20180323/pve/kisspng-fruit-tree-fruit-tree-clip-art-tree-5ab48b2116fcb7.7236415115217815370942.jpg'
        },
        {
          id: 3,
          added: false,
          propCount: 1,
          image:
            'https://banner2.cleanpng.com/20180323/pve/kisspng-fruit-tree-fruit-tree-clip-art-tree-5ab48b2116fcb7.7236415115217815370942.jpg'
        }
      ],
      relatedProducts: [
        {
          id: 1,
          added: false,
          propCount: 0,
          image:
            'https://banner2.cleanpng.com/20180323/pve/kisspng-fruit-tree-fruit-tree-clip-art-tree-5ab48b2116fcb7.7236415115217815370942.jpg'
        },
        {
          id: 2,
          added: false,
          propCount: 0,
          image:
            'https://banner2.cleanpng.com/20180323/pve/kisspng-fruit-tree-fruit-tree-clip-art-tree-5ab48b2116fcb7.7236415115217815370942.jpg'
        },
        {
          id: 3,
          added: false,
          propCount: 0,
          image:
            'https://banner2.cleanpng.com/20180323/pve/kisspng-fruit-tree-fruit-tree-clip-art-tree-5ab48b2116fcb7.7236415115217815370942.jpg'
        }
      ]
    };
  }
})
export default class MockProductPageMobile extends Vue {
  private bannerTitle: string = 'Get 1 Free 8th When You Buy 3 or More';
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
