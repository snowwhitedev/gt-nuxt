<template>
  <div class="blog-list">
    <transition-group
      tag="div"
      class="products-list-container"
      name="anim2"
      style="position: relative"
    >
      <BlogCard
        v-for="(item, idx) in blogs"
        :key="idx"
        :blog="item"
        class="mt-4"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
// need to fix how items render in rows because CSS
import Vue from 'vue';
import Component from 'vue-class-component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Prop } from 'vue-property-decorator';
import BlogCard from './BlogCard.vue';
library.add(faAngleRight);

Vue.component('font-awesome-icon', FontAwesomeIcon);
@Component({
  name: 'ProductsList',
  components: {
    BlogCard
  }
})
export default class ProductsList extends Vue {
  @Prop(Array) readonly blogs: any;
}
</script>

<style scoped>
.products-list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.blog-list {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  margin-bottom: 85px;
}

.anim2-enter-active {
  transition: all 0.1s;
}
.anim2-leave-active {
  transition: all 400ms ease-in;
  position: absolute !important;
  z-index: -10;
}
.anim2-enter, .anim2-leave-to /* .list-leave-active below version 2.1.8 */ {
  transform: scale(0);
  opacity: 0;
  /* opacity: 0; */
  /* transform: translateX(30px); */
}
.anim2-move {
  transition: all 600ms ease-in-out 50ms;
}
</style>
