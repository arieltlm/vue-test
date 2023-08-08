<template>
	<div class="homeWrap">
		<div class="main">
			<div class="albumBox" @mouseenter="clearAuto">
				<div id="album">
					<div v-for="(item, i) in btns" :key="i" class="albumItem">
						<div class="albumContent">
							<img :src="item.icon" /><br />
							<div class="albumBtn">
								{{ item.label }}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="circle-box"></div>
		</div>
	</div>
</template>

<script>
import icon1 from '@/assets/images/nav/1.png'
import icon2 from '@/assets/images/nav/2.png'
import icon3 from '@/assets/images/nav/3.png'
import icon4 from '@/assets/images/nav/4.png'
import icon5 from '@/assets/images/nav/5.png'
import icon6 from '@/assets/images/nav/6.png'
const scaleMap = {
	0: 1,
	1: 0.9,
	2: 0.8,
	3: 0.7,
	4: 0.8,
	5: 0.9,
}
export default {
	data() {
		return {
			btns: [
				{label: '物联总控', icon: icon1, url: '/screen/LoT'},
				{label: '订单总控', icon: icon2, url: '/screen/order'},
				{label: '仓储总控', icon: icon3, url: '/screen/storage'},
				{label: '数字化工厂', icon: icon4, url: '/screen/factory'},
				{label: '钢铁总控', icon: icon5, url: '/screen/steel'},
				{label: '橡胶总控', icon: icon6, url: ''},
			],
			autoInterval: null,

			transMap: {},
			down: false,
			lastX: 0,
			rotY: 0,
		}
	},
	beforeDestory() {
		this.clearAuto()
	},
	mounted() {
		this.initCard()
		// this.setAuto()
	},
	methods: {
		goPage(item) {
			console.log(item)
			if (item.url) {
				this.$router.push(item.url)
			}
		},
		goPages(item) {
			if (item.url) {
				window.location.href = item.url
			}
		},
		initCard() {
			// 设置卡片位置
			const _this = this
			var aImg = document.querySelectorAll('.albumItem')
			const transMap = {}
			const len = aImg.length
			const deg = 360 / len + 1
			for (var i = 0; i < aImg.length; i++) {
				transMap[i] = 'rotateY(' + i * deg + 'deg) translateX(-700px)'
				aImg[i].style.transform = transMap[i]

				// transMap[i] = 'rotateY(' + i * deg + 'deg) translateZ(814.4px)'
				// aImg[i].style.transform = transMap[i] + `scale(${scaleMap[i]})`
				if (i == 0) {
					aImg[i].style.opacity = 1
				} else {
					aImg[i].style.opacity = 0.6
				}
				// 	// aImg[i].style.transition = 'transform 1s ' + (aImg.length - i) * 0.1 + 's';
			}
			this.transMap = transMap
			var album = document.getElementById('album')
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
							// aImg[i].style.transform =
							// 	transMap[i] + `scale(${scaleMap[newIndex]})`
							aImg[i].style.transform = transMap[i] + `scale(1.1)`
							aImg[i].style.opacity = 1
							aImg[i].style.transition = 'transform .5s '
						} else {
							// aImg[i].style.transform =
							// 	transMap[i] + `scale(${scaleMap[newIndex]})`
							aImg[i].style.transform = transMap[i]
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
			console.log('clearAuto')
			if (this.autoInterval) {
				clearInterval(this.autoInterval)
				this.autoInterval = null
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.homeWrap {
	width: 100%;
	height: 100%;
	background-image: url('@/assets/images/nav/bg.jpg');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	background: #000;

	.main {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		.albumBox {
			width: 100%;
			height: 100%;
			transform-style: preserve-3d;
		}
		#album {
			width: 307px;
			height: 513px;
			margin: 0 auto;
			position: relative;
			transform-style: preserve-3d;
			transform: rotateX(0deg);
			// background: red;
			// opacity: 0.5;
			.albumItem {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				// width: 207px;
				// height: 413px;
				background-image: url('@/assets/images/nav/card.png');
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-position: center center;
				// display: flex;
				// justify-content: center;
				cursor: pointer;
				.albumContent {
					padding-top: 120px;
					text-align: center;
					color: #fff;
					// .albumBtn {
					// 	margin-top: 60px;
					// 	text-align: center;
					// 	font-size: 36px;
					// 	font-weight: bold;
					// 	background-image: url('@/assets/images/nav/btn2.png');
					// 	width: 266px;
					// 	height: 64px;
					// 	line-height: 64px;
					// 	background-size: 100% 100%;
					// 	background-repeat: no-repeat;
					// 	background-position: center center;
					// }
				}
				img {
					width: 196px;
					height: auto;
				}
			}
		}
	}
	.circle-box {
		width: 70%;
		height: 100%;
		margin: 0 auto;
		// border: 10px solid #6385a1;
		border: 10px solid green;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 50%;
		left: 15%;
		border-radius: 50%;
		transform: rotateX(81deg) translateZ(-300px) translateY(-400px);
	}
}
</style>
