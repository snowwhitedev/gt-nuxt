<template>
  <div class="button-count" :class="direction">
    <span class="counter" @click="increment">+</span>
    <input
      ref="cntInput"
      :type="value > 0 ? 'text' : 'hidden'"
      :value="value"
    />
    <span v-if="value > 0" class="counter" @click="decrement">-</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
@Component({
  props: {
    value: {
      type: Number,
      default: 0
    },
    direction: {
      type: String,
      default: 'vertical'
    }
  }
})
export default class MockButtonCount extends Vue {
  @Ref('cntInput') inputValue!: HTMLInputElement;

  private increment() {
    const oldValue = parseInt(this.inputValue.value) + 1;
    this.inputValue.value = oldValue.toString();
    this.$emit('input', parseInt(this.inputValue.value));
  }

  private decrement() {
    const oldValue = parseInt(this.inputValue.value) - 1;
    this.inputValue.value = oldValue.toString();
    this.$emit('input', parseInt(this.inputValue.value));
  }
}
</script>

<style lang="scss" scoped>
.button-count {
  min-width: 32px;
  min-height: 32px;
  border-radius: 16px;
  border: 2px solid $color-main;
  color: $color-main;
  background: #fff;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  input {
    border: none;
    text-align: center;
    color: $color-main;
    &:focus {
      outline: none;
    }
  }
  &.vertical {
    width: 32px;
    flex-direction: column;
    input {
      width: 28px;
    }
  }
  &.horizontal {
    height: 32px;
    flex-direction: row;
    input {
      height: 28px;
    }
  }
}
.counter {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
