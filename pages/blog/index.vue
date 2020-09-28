<template>
  <div class="text-center">
    <spinner v-if="isLoading"></spinner>
    <div v-else>
      <blog-list :blogs="getBlogs" />
    </div>
    <!-- <ul>
      <li v-for="ii in 3" :key="ii">
        <nuxt-link :to="`/blog/${ii}`">Blog item {{ ii }}</nuxt-link>
      </li>
    </ul> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { blogsNameSpace } from '@/store/blogs';
import Spinner from '@/components/UI/Spinner.vue';
import BlogList from '@/components/Blogs/BlogList.vue';
import { FETCH_BLOGS, GET_BLOGS } from '@/store/actionTypes';
@Component({
  middleware: ['check-auth', 'auth'],
  components: {
    Spinner,
    BlogList
  }
})
export default class BlogPage extends Vue {
  @blogsNameSpace.Action(FETCH_BLOGS)
  private fetchBlogs!: () => any;

  @blogsNameSpace.Getter(GET_BLOGS)
  private getBlogs: any;

  private isLoading: boolean = false;

  async created() {
    this.isLoading = true;
    await this.fetchBlogs();
    this.isLoading = false;
  }
}
</script>
