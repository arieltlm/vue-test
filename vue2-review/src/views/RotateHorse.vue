<script setup lang="ts">
import RotateNav from '../components/rotateHorse.vue'
import RotateNav1 from '../components/rotateHorse1.vue'
// import RotateNav1 from '../components/RotateNav1.vue'
</script>

<template>
	<div class="container">
		<RotateNav />
		<RotateNav1 />
	</div>
	<!-- <RotateNav1 /> -->
</template>
<style lang="less">
.container {
	width: 100%;
	height: 100%;
	display: flex;
	.cont {
		flex: 1;
		width: 50%;
	}
}
</style>
