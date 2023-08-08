<template>
	<div class="nav-box">
		<div style="position: absolute; top: 0; left: 0">
			{{ navBtns[0].deg }}
			{{ setScaleByDeg(navBtns[0].deg) }}
		</div>

		<div class="circle-box">
			<div
				class="circle-item"
				v-for="item in circleNum"
				:key="item"
				:style="{
					width: `${r * 2}px`,
					height: `${r * 2}px`,
				}"
			>
				<div
					v-for="(item, index) in navBtns"
					:key="item.label"
					class="nav-item"
					:style="{
						width: `${cardWidth}px`,
						height: `${cardHeight}px`,
					}"
					@mouseenter="clearAuto"
					@mouseleave="setAutos"
					@click="gotopage(item)"
				>
					{{ item.label }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			circleNum: 1,
			cardWidth: 150,
			cardHeight: 250,
			navBtns: [
				{label: '物联总控', icon: '1', url: '/screen/LoT', deg: 0},
				{label: '订单总控', icon: '2', url: '/screen/order', deg: 90},
				{label: '仓储总控', icon: '3', url: '/screen/storage', deg: 180},
				{label: '数字化工厂', icon: '4', url: '/screen/factory', deg: 270},
				// {label: '钢铁总控', icon: '5', url: '/screen/steel'},
				// {label: '橡胶总控', icon: '6', url: ''},
			],
			autoInterval: null,
			timer: null,
			r: 300,
			n: 1,
			degStep: 30,
		}
	},
	computed: {
		navBtnsLen() {
			return this.navBtns.length
		},
		scaleArr() {
			return this.setScale()
		},
	},
	beforeDestory() {
		this.clearAuto()
	},
	mounted() {
		// this.initCard()
		// this.setAuto()
		this.initC()
		// this.setAutos()
	},
	beforeDestroy() {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
	},
	methods: {
		setScale() {
			const li = 1 / this.navBtnsLen
			const scaleArr = []
			for (let i = 0; i < Math.floor(this.navBtnsLen / 2) + 1; i++) {
				const val = (this.navBtnsLen - i * 0.7) * li
				scaleArr.push(val)
			}
			let arr = []

			if (!(this.navBtnsLen % 2)) {
				arr = scaleArr.slice(0, scaleArr.length - 1)
			} else {
				arr = [...scaleArr]
			}
			arr.reverse()
			scaleArr.push(...arr)
			console.log('%c Line:98 🥛 arr', 'color:#2eafb0', scaleArr)

			return scaleArr
		},
		setDistance(deg) {
			return Math.sqrt(2 * this.r * this.r * (1 - Math.cos(deg))) / this.r
		},
		setScaleByDeg(deg) {
			return 1 / (this.setDistance(deg) || 1)
		},
		positionTop(deg) {
			// const deg = 180 - (360 / this.navBtnsLen) * index

			const d =
				((this.r - this.r * Math.cos((deg / 180) * Math.PI)) / (this.r * 2)) *
				100
			// return `calc(${l}% - (${
			// 	this.cardHeight * 3 * (this.scaleArr[0] - 0.6 * (1 - this.scaleArr[0]))
			// }px))`
			const scaleX = this.setScaleByDeg(deg)
			return d + '%'
			// return `calc(${l}% - (${this.cardHeight * 3 * scaleX}px))`s
		},
		positionLeft(deg) {
			// const deg = 180 - (360 / this.navBtnsLen) * index
			const d =
				((this.r - this.r * Math.sin((deg / 180) * Math.PI)) / (this.r * 2)) *
				100
			return `calc(${d}% - (${this.cardWidth / 2}px))`
			// return `${d}%`
		},
		setTransform(deg) {
			const scaleX = this.setScaleByDeg(deg)
			console.log('%c Line:116 🍧 scaleX', 'color:#33a5ff', scaleX)
			const scaleY =
				this.setScaleByDeg(deg) - 0.6 * (1 - this.setScaleByDeg(deg))
			// return `rotateX(-80deg) rotateY(0deg) translateZ(${Math.abs(
			// 	700 * Math.cos(80) * 0.6 * (1 - scaleX)
			// )}px) scaleX(${scaleX}) scaleY(${scaleX})`
			// return `scale(${scaleX})`
			return `rotateX(-80deg) rotateY(0deg) `
		},
		initC() {
			var navItem = document.querySelectorAll('.nav-item')
			for (var i = 0; i < navItem.length; i++) {
				navItem[i].style.top = this.positionTop(this.navBtns[i].deg)
				navItem[i].style.left = this.positionLeft(this.navBtns[i].deg)
				// navItem[i].style.transform = this.setTransform(this.navBtns[i].deg)
				// if (i == 0) {
				// 	navItem[i].style.opacity = 1
				// } else {
				// 	navItem[i].style.opacity = 0.6
				// }
				// aImg[i].style.transition = 'transform 1s ' + (aImg.length - i) * 0.1 + 's';
			}
		},
		setAutos() {
			this.intervalFun()
			this.timer = setInterval(() => {
				this.intervalFun()
			}, 3000)
		},
		intervalFun() {
			var navItem = document.querySelectorAll('.nav-item')
			for (var i = 0; i < navItem.length; i++) {
				// const j = i - this.n < 0 ? i - this.n + navItem.length : i - this.n
				const deg =
					this.navBtns[i].deg + this.degStep < 360
						? this.navBtns[i].deg + this.degStep
						: 0
				this.navBtns[i].deg = deg
				navItem[i].style.top = this.positionTop(deg)
				navItem[i].style.left = this.positionLeft(deg)
				navItem[i].style.transform = this.setTransform(deg)
				// if (i == this.n) {
				// 	navItem[i].style.opacity = 1
				// } else {
				// 	navItem[i].style.opacity = 0.6
				// }
			}
			// if (this.n < navItem.length - 1) {
			// 	this.n++
			// } else {
			// 	this.n = 0
			// 	console.log('%c Line:155 🍎 this.n', 'color:#33a5ff', this.n)
			// }
			if (this.degStep < 360) {
				this.degStep = this.degStep + 10
			} else {
				this.degStep = 0
			}
			console.log('%c Line:156 🥟 this.n', 'color:#6ec1c2', this.n)
		},
		gotopage(item) {
			console.log(item)
			alert(item.label)
		},
		initCard() {
			// 设置卡片位置
			const _this = this
			var aImg = document.querySelectorAll('.nav-item')
			const transMap = {}
			const len = aImg.length
			const deg = 360 / len
			for (var i = 0; i < aImg.length; i++) {
				transMap[i] = 'rotateY(' + i * deg + 'deg) translateZ(703.5px)'
				aImg[i].style.transform = transMap[i] + `scale(${scaleMap[i]})`
				if (i == 0) {
					aImg[i].style.opacity = 1
				} else {
					aImg[i].style.opacity = 0.6
				}
				// aImg[i].style.transition = 'transform 1s ' + (aImg.length - i) * 0.1 + 's';
			}
			this.transMap = transMap
			var album = document.querySelector('.nav-block')
			var lastX = 0 // 前一次的坐标X
			// var lastY = 0
			var nowX = 0 // 当前的坐标X
			// var nowY = 0
			var desX = 0
			// var desY = 0
			// var rotX = -30
			var rotY = 0
			// var timer // 时间间隔
			document.onmousedown = function (ev) {
				var e = ev || event
				lastX = e.clientX
				// lastY = e.clientY
				this.onmousemove = function (ev) {
					rotY = _this.rotY
					var e = ev || event
					nowX = e.clientX
					// nowY = e.clientY
					desX = nowX - lastX
					// desY = nowY - lastY
					// rotX -= desY * 0.1
					rotY += desX * 0.2
					album.style.transform =
						'rotateX(' + 0 + 'deg) rotateY(' + rotY + 'deg) translateZ(0)'
					album.style.transition = null
					lastX = nowX
					// lastY = nowY
					_this.rotY = rotY
					let currentIndex = 0
					if (rotY >= deg / 2) {
						currentIndex = len - (Math.round(rotY / deg) % len)
					} else {
						currentIndex = Math.abs(Math.round(rotY / deg) % len)
					}
					for (var i = 0; i < aImg.length; i++) {
						const newIndex =
							i - currentIndex >= 0 ? i - currentIndex : i - currentIndex + len
						if (i == currentIndex) {
							aImg[i].style.transform =
								transMap[i] + `scale(${scaleMap[newIndex]})`
							aImg[i].style.opacity = 1
							aImg[i].style.transition = 'transform .5s '
						} else {
							aImg[i].style.transform =
								transMap[i] + `scale(${scaleMap[newIndex]})`
							aImg[i].style.opacity = 0.6
							aImg[i].style.transition = 'transform .5s '
						}
					}
				}
				document.onmouseup = function () {
					this.onmousemove = this.onmouseup = null
				}
				// 阻止默认行为
				return false
			}
		},
		setAuto() {
			console.log('setAuto')
			var album = document.getElementById('album')
			var aImg = document.querySelectorAll('.albumItem')
			if (this.autoInterval) {
				clearInterval(this.autoInterval)
				this.autoInterval = null
			}
			this.autoInterval = setInterval(() => {
				this.rotY -= 10
				album.style.transform =
					'rotateX(' + 0 + 'deg) rotateY(' + this.rotY + 'deg) translateZ(0)'
				album.style.transition = 'transform 0.5s linear'
				const currentIndex = -Math.round(this.rotY / 60) % 6
				for (var i = 0; i < aImg.length; i++) {
					const newIndex =
						i - currentIndex >= 0 ? i - currentIndex : i - currentIndex + 6
					if (i == currentIndex) {
						aImg[i].style.transform =
							this.transMap[i] + `scale(${scaleMap[newIndex]})`
						aImg[i].style.opacity = 1
						aImg[i].style.transition = 'transform .5s '
					} else {
						aImg[i].style.transform =
							this.transMap[i] + `scale(${scaleMap[newIndex]})`
						aImg[i].style.opacity = 0.6
						aImg[i].style.transition = 'transform .5s '
					}
				}
			}, 500)
		},
		clearAuto() {
			if (this.timer) {
				clearInterval(this.timer)
				this.timer = null
			}
		},
	},
}
</script>

<style lang="less" scoped>
.nav-box {
	position: relative;
	width: 100%;
	height: 100%;
	background: #000;
	overflow: hidden;
	color: #fff;
	// background: url('@/assets/images/nav/bg.jpg') 100% 100%;
	.circle-box {
		position: absolute;
		// bottom: -15%;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		z-index: 1;
		pointer-events: none;
		.circle-item {
			position: absolute;
			width: 1400px;
			height: 1400px;
			border: 5px solid #ccc;
			border-radius: 50%;
			transform-style: preserve-3d;
			pointer-events: none;
			// transform: rotateX(80deg) rotateY(0deg) rotateZ(360deg);
			// transform: rotateX(80deg) rotateY(0deg); //1400 * cos80 * 0.5
			z-index: 5;
			// animation-name: orbit;
			// animation-duration: 100s;
			// animation-iteration-count: infinite;
			// animation-timing-function: linear;
			pointer-events: none;
			background: pink;

			transform: rotateX(80deg) rotateY(0deg) rotateZ(360deg);
			.nav-item {
				height: 100%;
				height: 600px;
				// height: 200px;
				position: absolute;
				top: 0;
				left: 0;
				background: url('@/assets/images/nav/card.png');
				background-size: 100% 100%;
				transform-style: preserve-3d;
				// transition-property: top, left, transform, opacity;
				// transition-duration: 1s, 1s, 1s, 1s;
				// transition-timing-function: linear;
				pointer-events: auto;
				z-index: 10;
				cursor: pointer;
				transform: rotateX(-80deg) rotateY(0deg) rotateZ(360deg)
					translateY(-125px);
				// transform: rotateX(-90deg) rotateY(360deg) rotateZ(0deg)
				// 	translateY(-125px);

				// animation-name: invert;
				// animation-duration: 10s;
				// animation-iteration-count: infinite;
				// animation-timing-function: linear;
			}
		}
	}

	// @keyframes orbit {
	// 	0% {
	// 		transform: rotateX(80deg) rotateY(0deg) rotateZ(360deg);
	// 	}
	// 	50% {
	// 		transform: rotateX(80deg) rotateY(0deg) rotateZ(-180deg);
	// 	}
	// 	100% {
	// 		transform: rotateX(80deg) rotateY(0deg) rotateZ(-360deg);
	// 	}
	// }
	// @keyframes invert {
	// 	0% {
	// 		transform: rotateX(-80deg) rotateY(360deg) rotateZ(0deg)
	// 			translateY(-125px);
	// 	}
	// 	100% {
	// 		transform: rotateX(-80deg) rotateY(0deg) rotateZ(0deg) translateY(-125px);
	// 	}
	// }

	@keyframes orbit {
		0% {
			transform: rotateZ(0deg);
		}
		100% {
			transform: rotateZ(-360deg);
		}
	}
	@keyframes invert {
		0% {
			transform: rotateX(-90deg) rotateY(360deg) rotateZ(0deg);
		}
		100% {
			transform: rotateX(-90deg) rotateY(0deg) rotateZ(0deg);
		}
	}
}
</style>
s
