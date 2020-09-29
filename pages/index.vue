<template>
  <div>
    <p>this is homepage</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { authNameSpace } from '@/store/auth';

@Component({
  name: 'IndexPage'
})
export default class IndexPage extends Vue {
  @authNameSpace.Action('init')
  private init!: () => any;

  created() {
    this.init();
  }
}
</script>
