<script lang="ts" setup></script>
<template>
	<div class="cont">
		<div class="box">
			<div>11111</div>
			<div>2222</div>
			<div>33333</div>
			<div>44444</div>
			<div>55555</div>
			<div>66666</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.cont {
	perspective: 1500px;
}

.box {
	position: relative;
	width: 300px;
	height: 285px;
	margin: 200px auto;
	transform-style: preserve-3d;
	transition: all 1s;
	animation: rotation 10s linear infinite backwards;
	border: 1px solid #ccc;
	background: pink;
}

.box:hover {
	animation-play-state: paused;
}

@keyframes rotation {
	0% {
	}
	100% {
		transform: rotateY(360deg);
	}
}

.box div {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -142px;
	margin-left: -150px;
	width: 300px;
	height: 284px;
	background: url('@/assets/images/nav/card.png') no-repeat;
}

.box div:first-child {
	transform: translateZ(400px);
}

.box div:nth-child(2) {
	transform: rotateY(60deg) translateZ(-400px) rotateY(180deg);
}
/* 这里比较特殊,先给旋转让角度改变然后再进行位移 */

.box div:nth-child(3) {
	transform: rotateY(60deg) translateZ(400px);
}

.box div:nth-child(4) {
	transform: rotateY(120deg) translateZ(400px);
}

.box div:nth-child(5) {
	transform: rotateY(120deg) translateZ(-400px) rotateY(180deg);
}

.box div:last-child {
	transform: translateZ(-400px) rotateY(180deg);
}
</style>
