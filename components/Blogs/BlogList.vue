<template>
  <div class="blog-list">
    <BlogCard
      v-for="(item, idx) in blogs"
      :key="idx"
      :blog="item"
      class="mt-4"
    />
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
  name: 'BlogList',
  components: {
    BlogCard
  }
})
export default class BlogList extends Vue {
  @Prop(Array) readonly blogs: any;
}
</script>

<style scoped>
.blog-list {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  margin-bottom: 85px;
}
</style>
