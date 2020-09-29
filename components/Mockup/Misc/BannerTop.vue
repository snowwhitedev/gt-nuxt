<template>
  <div class="banner-top">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/4/46/Litchi_chinensis_fruits.JPG"
      alt="Banner"
    />
    <h1 class="banner-text">Get 1 Free 8th When you Buy 3 Or More</h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.banner-top {
  position: relative;
  background: #fafafa;
}
.banner-top img {
  width: 100%;
}
.banner-text {
  margin-bottom: 0em;
  font-size: 2em;
  color: white;
  margin: 0px;
  padding: 0px;
  position: absolute;
  top: 20%;
  transform: translateY(-20%);
  width: 100%;
  text-align: center;
  font-weight: 700;
}
</style>
