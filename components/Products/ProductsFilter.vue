<template>
  <div class="text-center">
    <b-input-group style="width: 310px; margin: 0px auto">
      <b-form-input
        v-model="filters.searchValue"
        placeholder="Search..."
      ></b-form-input>
      <template v-slot:append>
        <b-input-group-text>
          <small class="text-info">
            {{ productsCount + ' product' + (productsCount != 1 ? 's' : '') }}
          </small>
        </b-input-group-text>
      </template>
    </b-input-group>
    <div class="filters-container">
      <div v-if="packageSizes.length > 1" class="filter-container">
        <h5 style="position: relative">
          Package size {{ productsCount }}
          <transition name="slide-fade">
            <font-awesome-icon
              v-if="filters.packageSizes.length"
              style="margin-left: 0.5em; position: absolute; top: 1px"
              class="text-info"
              :icon="['fa', 'undo-alt']"
              @click="clearFilter('package')"
            />
          </transition>
        </h5>
        <div style="display: flex; align-item: center; justify-content: center">
          <b-form-checkbox
            v-for="pac in packageSizes"
            :key="pac.size"
            v-model="pac.selected"
            style="margin: 0em 0.5em"
            :value="true"
            :unchecked-value="false"
            @change="packageSizeSelectionChanged(pac, $event)"
          >
            <span> {{ pac.size + ' ' + uom }}</span>
          </b-form-checkbox>
        </div>
      </div>

      <div class="filter-container">
        <h5 style="position: relative">
          Max price -
          <span class="color-main">${{ immediateMaxPriceSliderValue }}</span>
          <transition name="slide-fade">
            <font-awesome-icon
              v-if="filters.maxPriceValue !== maxPrice"
              style="margin-left: 0.5em; position: absolute; top: 1px"
              class="text-info clickable"
              :icon="['fa', 'undo-alt']"
              @click="clearFilter('price')"
            />
          </transition>
        </h5>
        <div class="flex-row">
          <div
            style="margin-right: 0.5em"
            class="clickable"
            @click="selectMinMax(true)"
          >
            ${{ minPrice }}
          </div>
          <b-form-input
            v-model="immediateMaxPriceSliderValue"
            type="range"
            :min="minPrice"
            :max="maxPrice"
            step="5"
            @change="updateMaxPriceFilter()"
          ></b-form-input>

          <div
            style="margin-left: 0.5em"
            class="clickable"
            @click="selectMinMax(false)"
          >
            ${{ maxPrice }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {
  faChevronLeft,
  faChevronRight,
  faSearch,
  faFilter,
  faUndoAlt
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faChevronLeft, faChevronRight, faSearch, faFilter, faUndoAlt);

@Component({
  components: { FontAwesomeIcon }
})
export default class ProductsFilter extends Vue {
  @Prop(Object) readonly filters!: any;
  @Prop(Array) readonly packageSizes!: any;
  @Prop(String) readonly uom!: any;
  @Prop(Number) readonly minPrice!: any;
  @Prop(Number) readonly maxPrice!: any;
  @Prop(Number) readonly productsCount!: any;

  immediateMaxPriceSliderValue: number = this.filters.maxPriceValue;

  private packageSizeSelectionChanged(packageSize: any, isSelected: any) {
    if (isSelected) {
      this.filters.packageSizes.push(packageSize.size);
    } else {
      const packageSizeIndex = this.filters.packageSizes.indexOf(
        packageSize.size
      );
      this.filters.packageSizes.splice(packageSizeIndex, 1);
    }
  }

  private selectMinMax(isMin: boolean) {
    if (isMin) {
      this.immediateMaxPriceSliderValue = this.minPrice;
    } else {
      this.immediateMaxPriceSliderValue = this.maxPrice;
    }
    this.updateMaxPriceFilter();
  }

  private clearFilter(filter: string) {
    switch (filter) {
      case 'price':
        this.immediateMaxPriceSliderValue = this.maxPrice;
        this.updateMaxPriceFilter();
        break;
      case 'package':
        this.filters.packageSizes = [];
        this.packageSizes.forEach((packageSize: any) => {
          packageSize.selected = false;
        });

        break;
    }
  }

  private updateMaxPriceFilter() {
    this.filters.maxPriceValue = this.immediateMaxPriceSliderValue;
  }
}
</script>

<style>
.filters-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 2em;
}

.filter-container {
  padding: 0em 2em;
  border-right: 1px solid silver;
}

.filter-container > h5 {
  font-size: 1em;
}

.filter-container:last-child {
  border-right: none;
}

@media only screen and (max-width: 530px) {
  .filters-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1em;
  }

  .filter-container {
    padding: 0em 0.5em;
    border-bottom: 1px solid silver;
    border-right: none;
    padding: 1em 0em;
  }

  .filter-container:last-child {
    border-bottom: none;
  }
}
</style>
