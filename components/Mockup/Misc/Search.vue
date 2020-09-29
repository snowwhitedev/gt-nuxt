<template>
  <form class="form-inline" @submit.prevent="search">
    <div class="form-group">
      <div class="icon">
        <font-awesome-icon :icon="['fa', 'search']"></font-awesome-icon>
      </div>
      <input
        v-model="input"
        class="form-control"
        type="search"
        name="search"
        placeholder="Search"
        aria-label="search-for-products"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class Search extends Vue {
  input: string = '';
  search() {
    const route = { path: '/menu/search', query: { search: this.input } };
    this.$router.push(route);
  }
}
</script>

<style scoped></style>
