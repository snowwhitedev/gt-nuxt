<template>
  <VueAgile :options="options"><slot /></VueAgile>
</template>

<script>
import { VueAgile } from 'vue-agile';
export default {
  components: {
    VueAgile
  },
  data() {
    return {
      options: {
        navButtons: false
      }
    };
  }
};
</script>

<style lang="sass">
.agile
	width: 100%

	&__actions
		margin-top: 20px

	&__nav-button
		background: transparent
		border: none
		color: #ccc
		cursor: pointer
		font-size: 24px
		transition-duration: .3s

		&:hover
			color: #888

	&__dot
		margin: 0 10px

		button
			background-color: #ccc
			border: none
			border-radius: 50%
			cursor: pointer
			display: block
			height: 16px
			font-size: 0
			line-height: 0
			margin: 0
			padding: 0
			transition-duration: .3s
			width: 16px

		&--current,
		&:hover
			button
				background-color: #888

.slide
	align-items: center
	color: #000
	display: flex
  width: 100%
	justify-content: center

	h3
		font-size: 32px
		font-weight: 300
</style>
