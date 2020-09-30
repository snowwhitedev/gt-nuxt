<template>
  <form class="form-group" @submit.prevent="search">
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

<style scoped>
.form-group {
  margin-bottom: 0;
  position: relative;
  width: 100%;
}
.icon {
  position: absolute;
  top: 13px;
  left: 18px;
  color: #928f8f;
  font-size: 16px;
  line-height: 16px;
}
.form-group input {
  border: 1px solid #cdcdcd;
  color: #9c9b9f;
  font-size: 14px;
  line-height: 36px;
  background: #fff;
  width: 100%;
  height: 45px;
  padding: 8px 18px 8px 38px;
}
</style>
