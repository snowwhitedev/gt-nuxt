<template>
  <div>
    <the-header />
    <Nuxt />
  </div>
</template>
<script>
import TheHeader from '@/components/Navigation/TheHeader.vue';
export default {
  components: {
    TheHeader
  }
};
</script>
