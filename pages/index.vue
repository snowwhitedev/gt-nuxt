<template>
  <div>
    <p>this is homepage</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { authNameSpace } from '@/store/auth';
export default class IndexPage extends Vue {
  @authNameSpace.Action('init')
  private init!: () => any;

  created() {
    this.init();
  }
}
</script>
