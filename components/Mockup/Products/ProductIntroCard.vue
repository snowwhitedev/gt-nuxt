<template>
  <div class="product-intro-card text-center">
    <img :src="image" alt="Product Image" />
    <p class="name mt-2">{{ name }}</p>
    <p class="cost mt-1">{{ cost }}</p>
    <button class="mt-2 cta-btn">Learn More</button>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    cost: {
      type: String,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.product-intro-card {
  padding: 20px;
  img {
    width: 240px;
  }
  .name {
    color: $color-main;
    font-size: 28px;
    font-weight: bold;
  }
  .cost {
    font-weight: bold;
    color: #000000;
    font-size: 20px;
  }
  .cta-btn {
    background: $color-main;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    color: #ffffff;
    font-weight: 600;
    font-size: 18px;
    border: none;
    :focus {
      outline: none;
    }
  }
}
</style>
