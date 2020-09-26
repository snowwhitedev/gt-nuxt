<template>
  <div>this is products {{ $route.params.category }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  transition(to) {
    return to.query.trans ? to.query.trans.toString() : 'slide-fade-right';
  }
})
export default class CategoryPage extends Vue {}
</script>
