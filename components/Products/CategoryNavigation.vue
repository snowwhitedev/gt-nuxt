<template>
  <div class="categorynavigation" style="position: relative; height: 100%">
    <div
      id="category-navigation"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        z-index: 1031;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      "
    >
      <button
        v-if="isNavigationVisible"
        class="base-button text-center navigation-button"
        :class="{ 'disabled-btn': !isLeftNavigationEnabled }"
        style="display: block; flex: 1"
        type="button"
        @click.prevent="scroll(-200)"
      >
        <font-awesome-icon :icon="['fa', 'chevron-left']" size="2x" />
      </button>
      <div
        id="category-container"
        style="display: flex; min-height: 87px; flex: 15; overflow-x: auto"
      >
        <button
          v-for="category in categories"
          :key="category.name"
          class="base-button category-navigation-button"
          style="
            border: none;
            padding-left: 1.5em;
            padding-right: 1.5em;
            flex: 1;
            color: black;
            box-sizing: border-box;
          "
          :class="{
            'color-main': category.isActive,
            activated: category.isActive
          }"
          @click="navigateCategory(category)"
        >
          <div class="d-flex align-items-center justify-content-center">
            <img style="width: auto; height: 50px" :src="category.image" />
            <div style="margin-left: 10px; font-size: 1.2em; font-weight: 400">
              <strong>{{ category.name }}</strong>
            </div>
          </div>
        </button>
      </div>
      <button
        v-if="isNavigationVisible"
        class="base-button text-center navigation-button"
        :class="{ 'disabled-btn': !isRightNavigationEnabled }"
        style="display: block; flex: 1"
        type="button"
        @click.prevent="scroll(200)"
      >
        <font-awesome-icon size="2x" :icon="['fa', 'chevron-right']" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import * as _ from "lodash";

library.add(faChevronLeft, faChevronRight);

const debounce = require('lodash.debounce');

@Component({
  components: { FontAwesomeIcon }
})
export default class CategoryNavigation extends Vue {
  private isSticky = false;
  private readonly categories = [
    {
      name: 'Flowers',
      url: 'flower',
      image: require('~/assets/icons/marijuana.png'),
      order: 0,
      isActive: false
    },
    {
      name: 'Vapes',
      url: 'vapes',
      image: require('~/assets/icons/vape.png'),
      order: 1,
      isActive: false
    },
    {
      name: 'Prerolls',
      url: 'prerolls',
      image: require('~/assets/icons/cigar.png'),
      order: 2,
      isActive: false
    },
    {
      name: 'Extracts',
      url: 'extracts',
      image: require('~/assets/icons/cannabis-oil.png'),
      order: 3,
      isActive: false
    },
    {
      name: 'Edibles',
      url: 'edibles',
      image: require('~/assets/icons/chocolate-bar.png'),
      order: 4,
      isActive: false
    },
    {
      name: 'Accessories',
      url: 'accessories',
      image: require('~/assets/icons/smoke.png'),
      order: 5,
      isActive: false
    }
  ];

  private scroll(amount: number) {
    const container = document.getElementById('category-container');
    if (container) container.scrollBy({ left: amount, behavior: 'smooth' });
  }

  private getTransitionName(fromOrder: number, toOrder: number) {
    return toOrder > fromOrder ? 'slide-fade-right' : 'slide-fade-left';
  }

  private getCurrentCategoryOrder(): number {
    const result = this.categories.find(
      (category) => category.url === this.$router.currentRoute.params.category
    );

    return result ? result.order : 0;
  }

  private navigateCategory(category: any) {
    if (category.url === this.$route.params.category) {
      return;
    }

    const currentCategoryOrder = this.getCurrentCategoryOrder();
    this.$emit(
      'transition-name-changed',
      this.getTransitionName(currentCategoryOrder, category.order)
    );
    const transName = this.getTransitionName(
      currentCategoryOrder,
      category.order
    );
    this.$router.push({
      path: `/products/${category.url}`,
      query: { trans: transName }
    });
  }

  private categoryHeaderElement: any; // HTMLElement = new HTMLElement();
  private categoryContainer: any; // HTMLElement = new HTMLElement();
  private isNavigationVisible = false;
  private isLeftNavigationEnabled = false;
  private isRightNavigationEnabled = true;
  private stickyPositionOn: number = 0;
  private stickyPositionOff: number = 0;
  private categoryWatcher: any; // () => void;

  private onCategoryChanged(newCategory: any, oldCategory: any) {
    const res = this.categories.find(
      (category) => category.url === newCategory
    );
    if (res) res.isActive = true;

    if (oldCategory) {
      const oldRes = this.categories.find(
        (category) => category.url === oldCategory
      );
      if (oldRes) oldRes.isActive = false;
    }
  }

  private setIsNavigationVisibleDebounced = debounce(
    this.setIsNavigationVisible,
    50
  );

  private setIsNavigationVisible() {
    this.isNavigationVisible =
      this.categoryContainer.scrollWidth > this.categoryContainer.clientWidth;
  }

  private setNavigationButtonsVisibilityDebounced = debounce(
    this.setNavigationButtonsVisibility,
    50
  );

  private setNavigationButtonsVisibility() {
    this.isLeftNavigationEnabled = this.categoryContainer.scrollLeft > 0;
    this.isRightNavigationEnabled =
      this.categoryContainer.scrollLeft + this.categoryContainer.clientWidth !==
      this.categoryContainer.scrollWidth;
  }

  public mounted() {
    this.categoryHeaderElement = document.getElementById('category-navigation');
    this.categoryContainer = document.getElementById('category-container');

    this.setIsNavigationVisible();
    this.onCategoryChanged(this.$route.params.category, undefined);
    this.stickyPositionOn = this.categoryHeaderElement.offsetTop;
    this.stickyPositionOff =
      this.categoryHeaderElement.offsetTop -
      this.categoryHeaderElement.offsetHeight;

    // Event listeners
    this.categoryContainer.addEventListener(
      'scroll',
      this.setNavigationButtonsVisibilityDebounced
    );
    window.addEventListener('resize', this.setIsNavigationVisibleDebounced);
    window.addEventListener(
      'resize',
      this.setNavigationButtonsVisibilityDebounced
    );
    this.categoryWatcher = this.$watch(
      '$route.params.category',
      this.onCategoryChanged
    );
    window.addEventListener('scroll', this.setNavigationHeaderOffset, false);
  }

  public beforeDestroy() {
    // Clear events to prevent memory leak
    window.removeEventListener('scroll', this.setNavigationHeaderOffset, false);
    window.removeEventListener('resize', this.setIsNavigationVisibleDebounced);
    window.removeEventListener(
      'resize',
      this.setNavigationButtonsVisibilityDebounced
    );
    this.categoryContainer.removeEventListener(
      'scroll',
      this.setNavigationButtonsVisibilityDebounced
    );

    if (this.categoryWatcher) {
      this.categoryWatcher();
    }
  }

  private setNavigationHeaderOffset() {
    if (window.pageYOffset > this.stickyPositionOn) {
      this.categoryHeaderElement.classList.add('sticky');
      this.isSticky = true;
    }
    if (window.pageYOffset - 172 <= this.stickyPositionOff) {
      this.categoryHeaderElement.classList.remove('sticky');
      this.isSticky = false;
    }
  }
}
</script>

<style scoped>
#category-container::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 0;
  height: 0;
}

#category-container {
  scrollbar-width: none;
}

#category-navigation {
  position: absolute;
  width: 100%;
  top: 0px;
  transition: top 0.5s ease-out;
}

#category-navigation.sticky {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0px;
}

.category-navigation-button:active {
  background: white;
}

.category-navigation-button.activated {
  border-bottom: 3px solid #ed008c !important;
}

.disabled-btn {
  opacity: 0.25;
}
button:focus {
  outline: none;
}
</style>
