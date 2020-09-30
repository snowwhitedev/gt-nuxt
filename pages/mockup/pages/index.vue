<template>
  <div class="p-4 mockup-components">
    <h3 class="text-center">This is mock up pages</h3>
    <div class="component-index-container">
      <label class="font-weight-bold">Page index</label>
      <div class="comments">
        <div class="comment">
          <div class="progress-badge todo"></div>
          <p class="caption">TODO</p>
        </div>
        <div class="comment">
          <div class="progress-badge doing"></div>
          <p class="caption">Doing</p>
        </div>
        <div class="comment">
          <div class="progress-badge done"></div>
          <p class="caption">Done</p>
        </div>
      </div>
      <ul>
        <li v-for="comp in components" :key="comp.name">
          <div :class="`progress-badge ${comp.status}`"></div>
          <nuxt-link class="caption" :to="`/mockup/pages/${comp.link}`">
            {{ comp.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  data() {
    return {
      components: [
        {
          name: 'Product Page - Mobile',
          link: 'product_page_mobile',
          status: 'doing'
        },
        {
          name: 'Product Single Page - Mobile',
          link: 'product_single_page_mobile',
          status: 'doing'
        }
      ]
    };
  }
})
export default class MockComponents extends Vue {}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
}
p {
  margin: 0;
}

.component-index-container {
  width: 350px;
  margin: 0 auto;
  padding-top: 30px;
}
.component-index-container ul {
  width: 100%;
  background: #fff;
  padding: 30px 50px;
  border: 2px solid $color-main;
  border-radius: 10px;
  min-height: 350px;
}
.component-index-container ul li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.component-index-container ul li:last-child {
  margin-bottom: 0;
}
.comments {
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment {
  display: flex;
  align-items: center;
}
</style>
