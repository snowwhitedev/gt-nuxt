<template>
  <v-lazy-image
    class="lazyload img-fluid load-spinner"
    src="/images/logo-footer.svg"
    alt="Good Tree"
  />
</template>

<script>
export default {
  name: 'SpinnerInline'
};
</script>

<style scoped>
.load-spinner {
  -webkit-animation: spin 3s infinite;
  animation: spin 3s infinite;
  position: inline;
  z-index: 1;
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotateY(0deg);
  }
  to {
    -webkit-transform: rotateY(-360deg);
  }
}

@keyframes spin {
  from {
    -moz-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }

  to {
    -moz-transform: rotateY(-360deg);
    -ms-transform: rotateY(-360deg);
    transform: rotateY(-360deg);
  }
}
</style>
