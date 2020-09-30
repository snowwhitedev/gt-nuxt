<template>
  <div class="goods-detail">
    <div class="d-flex align-items-center justify-content-between">
      <p class="title">Appearance</p>
      <font-awesome-icon :icon="['fas', 'arrow-down']" class="icon" />
    </div>
    <hr class="sep" />
    <div>
      <div class="d-flex align-items-center justify-content-between">
        <p class="title color">Flavor</p>
        <font-awesome-icon :icon="['fas', 'arrow-up']" class="icon" />
      </div>
      <p class="description mt-1">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor ex,
        officiis vel temporibus asperiores quisquam in tenetur, nihil rerum
        tempore quam optio. Quasi fugit sunt tempore obcaecati et dolor
        voluptas.
      </p>
    </div>
    <hr class="sep" />
    <div class="d-flex align-items-center justify-content-between">
      <p class="title">Aroma</p>
      <font-awesome-icon :icon="['fas', 'arrow-down']" class="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class MockProductDetailCard extends Vue {}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.goods-detail {
  background: #f1f2f2;
  padding: 40px 35px;
  .sep {
    background: #474747;
  }
}
.title {
  font-weight: 700;
  font-size: 20px;
  color: #9c9b9f;
  &.color {
    color: $color-main;
  }
}
.icon {
  color: $color-main;
}
.description {
  font-weight: 600;
  font-size: 12px;
}
</style>
