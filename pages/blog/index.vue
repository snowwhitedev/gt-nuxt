<template>
  <div>
    this is blog page
    <ul>
      <li v-for="ii in 3" :key="ii">
        <nuxt-link :to="`/blog/${ii}`">Blog item {{ ii }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
@Component({
  middleware: ["check-auth", "auth"],
  components: {
  }
})

export default class BlogPage extends Vue {


}
</script>