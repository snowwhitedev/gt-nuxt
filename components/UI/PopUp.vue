<template>
  <transition name="pop-up">
    <div class="pop-up-mask">
      <div class="pop-up-wrapper">
        <div class="pop-up-container">
          <div class="pop-up-header" style="position: relative">
            <slot name="header"></slot>
            <div
              class="magnify-on-hover"
              style="position: absolute; right: 0px; top: 0px; cursor: pointer"
              @click="$emit('close')"
            >
              <font-awesome-icon
                class="clickable"
                :icon="['fa', 'times']"
              ></font-awesome-icon>
            </div>
          </div>

          <div class="pop-up-body">
            <slot name="body"></slot>
          </div>

          <div class="pop-up-footer text-right">
            <button class="base-button" @click="$emit('close')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faTimes);

@Component({
  name: 'PopUp'
})
export default class ProductRelatedItem extends Vue {}
</script>

<style scoped>
.pop-up-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.pop-up-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.pop-up-container {
  width: 35%;
  min-width: 320px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.pop-up-header h3 {
  margin-top: 0;
}

.pop-up-body {
  margin: 20px 0;
}

/*
 * The following styles are auto-applied to elements with
 * transition="pop-up" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the pop-up transition by editing
 * these styles.
 */

.pop-up-enter {
  opacity: 0;
}

.pop-up-leave-active {
  opacity: 0;
}

.pop-up-enter .pop-up-container,
.pop-up-leave-active .pop-up-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
