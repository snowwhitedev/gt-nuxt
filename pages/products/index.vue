<template>
  <div>
    <CategoryNavigation @transition-name-changed="setTransitionName" />
    <!-- <transition :name="transitionName" mode="out-in"> -->
    <nuxt-child
      id="category-home-router-view"
      :key="$router.currentRoute.params.category"
      style="padding-top: 88px"
    />
    <!-- </transition> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import CategoryNavigation from '@/components/Products/CategoryNavigation.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faShoppingCart);

@Component({
  layout: 'default',
  components: {
    CategoryNavigation,
    FontAwesomeIcon
  }
})
export default class Home extends Vue {
  @Getter('Subtotal') Subtotal!: number;
  private transitionName = 'slide-fade-right';

  private setTransitionName(transitionName: string) {
    this.transitionName = transitionName;
  }
}
</script>

<style scoped></style>
