<template>
  <div class="component-container">
    <h5>Button components</h5>
    <div class="component-section">
      <div class="d-flex align-items-center">
        <div class="mr-3" :class="`progress-badge doing`"></div>
        <button-count v-model="cnt1" direction="vertical" />
      </div>
      <div class="d-flex align-items-center mt-3">
        <div class="mr-3" :class="`progress-badge doing`"></div>
        <button-count v-model="cnt1" direction="horizontal" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ButtonCount from '@/components/Mockup/Buttons/ButtonCount.vue';
@Component({
  components: {
    ButtonCount
  }
})
export default class MockButtons extends Vue {
  private cnt1: number = 0;
}
</script>

<style lang="scss" scoped>
.component-container {
  margin: 0 auto;
  width: fit-content;
}
.component-section {
  width: 450px;
  border: 2px solid #cccccc;
  border-radius: 10px;
  padding: 15px 10px;
}
</style>
