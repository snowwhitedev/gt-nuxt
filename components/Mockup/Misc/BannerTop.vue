<template>
  <div class="banner-top">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/4/46/Litchi_chinensis_fruits.JPG"
      alt="Banner"
    />
    <div class="banner-text">
      <h1 class="banner-title">{{ title }}</h1>
      <h5 class="banner-description mt-2">{{ description }}</h5>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
})
export default class MockBannerTop extends Vue {}
</script>

<style lang="scss" scoped>
.banner-top {
  position: relative;
  background: #fafafa;
}
.banner-top img {
  width: 100%;
}
.banner-text {
  position: absolute;
  top: 20%;
  transform: translateY(-20%);
  width: 100%;
  text-align: center;
  color: white;
}
.banner-title {
  margin-bottom: 0em;
  font-size: 2em;
  margin: 0px;
  padding: 0px;
  font-weight: 700;
}
.banner-description {
  font-size: 1em;
  font-weight: 500;
}
</style>
