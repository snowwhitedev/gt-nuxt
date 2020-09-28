<template>
  <div class="text-left blog-card">
    <div class="pt-2 px-2">
      <h4 class="text-center">{{ blog.title }}</h4>
      <p class="author-name text-center">
        {{ blog.author.first_name }}&nbsp;{{ blog.author.last_name }}
      </p>
      <p class="text-justify">{{ blog.summary }}</p>
      <a class="go-detail" @click="goDetail">Details</a>
    </div>
    <img :src="blog.featured_image" :alt="blog.featured_image_alt" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class BlogPage extends Vue {
  @Prop(Object) readonly blog: any;

  private goDetail() {
    this.$router.push(`/blog/${this.blog.title}`);
  }
}
</script>

<style scoped>
p {
  margin: 0;
}
.blog-card {
  display: flex;
  align-items: flex-start;
  border: 1px solid gray;
}
.blog-card img {
  width: 30%;
  height: auto;
}
.author-name {
  font-size: 12px;
}
.go-detail {
  text-align: left;
  cursor: pointer;
}
</style>
