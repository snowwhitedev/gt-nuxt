<template>
  <div>
    <div class="text-center title-container">
      <h2 class="category-title">{{ category.Name.toUpperCase() }}</h2>
      <h3 class="category-subtitle">{{ category.subtitle }}</h3>
    </div>
    <b-overlay :show="isLoadingProducts" rounded="sm" blur="none" opacity="0">
      <template v-slot:overlay>
        <SpinnerInline style="margin-top: 3em"></SpinnerInline>
      </template>
      <transition name="fade">
        <ProductsFilter
          v-if="!isLoadingProducts"
          :package-sizes="packageSizes"
          :min-price="minMaxPrices.min"
          :max-price="minMaxPrices.max"
          :filters="filters"
          :uom="category.UOM"
          :products-count="filteredProducts.length"
        ></ProductsFilter>
      </transition>
      <ProductsList
        title="All Items"
        subtitle="Get while supplies last"
        :pages="filteredProducts"
      />
    </b-overlay>
    <div
      v-if="!isLoadingProducts"
      class="text-center"
      style="margin-top: -50px; color: white"
    >
      <h2 class="category-title">
        We are sorry! We currently don't have any items available in this
        category.
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import CategoryService, {
  ICategory,
  Categories
} from '@/modules/products/CategoryService';
import ProductsFilterService, {
  IMinMaxValues
} from '@/modules/products/ProductsFilterService';
import { productsNameSpace } from '@/store/products';
import { Product } from '@/store/interfaces';
import ProductsList from '@/components/Products/ProductsList.vue';
import SpinnerInline from '@/components/UI/SpinnerInline.vue';
import ProductsFilter from '@/components/Products/ProductsFilter.vue';
import {
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_IS_LOADED
} from '@/store/actionTypes';

@Component({
  components: {
    ProductsList,
    SpinnerInline,
    ProductsFilter
  },
  transition(to) {
    return to.query.trans ? to.query.trans.toString() : 'slide-fade-right';
  }
})
export default class ProductCategory extends Vue {
  private category: ICategory = {};
  private isLoadingProducts = true;
  private xpackageSizes: any = [];
  private filters = {
    searchValue: '',
    // maxPriceValue: undefined,
    // maxPriceValue: Number,
    maxPriceValue: 0.0,
    packageSizes: this.xpackageSizes
  };

  public products: Array<Product> = [];
  private packageSizes: any = [];
  private minMaxPrices: IMinMaxValues = {};
  // @Getter("Zone") zone;
  private zone: string = 'Oakland';

  @productsNameSpace.Getter(GET_PRODUCTS_BY_CATEGORY)
  private getCategoryProducts!: (type: any) => any;

  @productsNameSpace.Getter(GET_PRODUCTS_IS_LOADED)
  private productIsLoaded!: any;

  public get filteredProducts() {
    return this.products.filter((product: Product) => {
      let isItemValid = true;
      // Verify Name
      if (this.filters.searchValue) {
        isItemValid = product.Name.toLowerCase().includes(
          this.filters.searchValue.toLowerCase()
        );
      }

      // Verify price
      if (isItemValid && this.filters.maxPriceValue) {
        isItemValid = product.Price <= this.filters.maxPriceValue;
      }

      // Verify package size
      if (
        isItemValid &&
        Array.isArray(this.filters.packageSizes) &&
        this.filters.packageSizes.length > 0
      ) {
        isItemValid = this.filters.packageSizes.includes(product.PackageSize);
      }

      return isItemValid;
    });
  }

  private getPages() {
    this.isLoadingProducts = true;
    const categoryService = new CategoryService();
    this.category = categoryService.getCategoryByName(
      this.$route.params.category as Categories
    );
    const products = this.getCategoryProducts(this.category.Name);

    if (Array.isArray(products)) {
      this.products = products.filter((product: any) => product);
    } else {
      this.products = [];
    }

    const productsFilterService = new ProductsFilterService();

    this.packageSizes = productsFilterService.getUniqueValues(
      this.products,
      'PackageSize'
    );

    this.minMaxPrices = productsFilterService.getMinMaxPrices(this.products);

    if (this.minMaxPrices.max)
      this.filters.maxPriceValue = this.minMaxPrices.max;
    this.products = products;
    this.$emit('updateHead');
    this.isLoadingProducts = false;
  }

  @Watch('zone', { deep: true })
  onZoneChange() {
    this.getPages();
  }

  @Watch('productIsLoaded', { deep: true })
  onProductsChange() {
    this.getPages();
  }

  created() {
    this.getPages();
  }
}
</script>

<style>
.title-container {
  margin-bottom: 2em;
  margin-top: 3em;
}
@media only screen and (max-width: 420px) {
  .title-container {
    margin-bottom: 1em;
    margin-top: 0.5em;
  }
}
</style>
