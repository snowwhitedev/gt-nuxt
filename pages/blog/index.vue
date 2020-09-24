<template>
  <div>
    this is blog page
    <ul>
      <li v-for="ii in 3" :key="ii">
        <nuxt-link :to="`/blog/${ii}`">Blog item {{ ii }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>