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
	border: 10px solid #e20a0a;
	background: pink;
	transform: rotateX(-80deg);
}

.box:hover {
	animation-play-state: paused;
}

@keyframes rotation {
	0% {
	}
	100% {
		transform: rotateX(-80deg) rotateY(360deg);
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
	color: #e6de0f;
	font-size: 30px;
	// background: url('@/assets/images/nav/card.png') no-repeat;
	border: 1px solid red;
}

.box div:first-child {
	transform: translateZ(300px) scale(1);
	background: #e469b0;
	opacity: 1;
}

.box div:nth-child(2) {
	transform: rotateY(60deg) translateZ(300px) scale(0.8);
	background: #c0feff;
	opacity: 0.6;
}
/* 这里比较特殊,先给旋转让角度改变然后再进行位移 */

.box div:nth-child(3) {
	transform: rotateY(120deg) translateZ(300px) scale(0.65);
	background: #22b97f;
	opacity: 0.6;
}

.box div:nth-child(4) {
	transform: rotateY(180deg) translateZ(300px) scale(0.5);
	background: #f09177;
	opacity: 0.6;
}

.box div:nth-child(5) {
	transform: rotateY(240deg) translateZ(300px) scale(0.65);
	background: #3fc71a;
	opacity: 0.6;
}

.box div:last-child {
	transform: rotateY(300deg) translateZ(300px) scale(0.8);
	background: #8a7fde;
	opacity: 0.6;
}
// .box div:first-child {
// 	transform: translateZ(400px) scale(1);
// }

// .box div:nth-child(2) {
// 	transform: rotateY(60deg) translateZ(400px) scale(0.9);
// }
// /* 这里比较特殊,先给旋转让角度改变然后再进行位移 */

// .box div:nth-child(3) {
// 	transform: rotateY(120deg) translateZ(400px) scale(0.8);
// }

// .box div:nth-child(4) {
// 	transform: rotateY(180deg) translateZ(400px) scale(0.7);
// }

// .box div:nth-child(5) {
// 	transform: rotateY(240deg) translateZ(400px) scale(0.8);
// }

// .box div:last-child {
// 	transform: rotateY(300deg) translateZ(400px) scale(0.9);
// }
</style>
