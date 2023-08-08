<template>
	<div class="main">
		<div class="albumBox">
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
	</div>
</template>

<script>
import icon1 from '@/assets/images/nav/1.png'
import icon2 from '@/assets/images/nav/2.png'
import icon3 from '@/assets/images/nav/3.png'
import icon4 from '@/assets/images/nav/4.png'
import icon5 from '@/assets/images/nav/5.png'
import icon6 from '@/assets/images/nav/6.png'
export default {
	data() {
		return {
			btns: [
				{label: '导航1', icon: icon1, url: '/screen/LoT'},
				{label: '导航2', icon: icon2, url: '/screen/order'},
				{label: '导航3', icon: icon3, url: '/screen/storage'},
				{label: '导航4', icon: icon4, url: '/screen/factory'},
				{label: '导航5', icon: icon5, url: '/screen/steel'},
				{label: '导航6', icon: icon6, url: ''},
			],
			autoInterval: null,
			transMap: {},
			down: false,
			lastX: 0,
			rotY: 0,
			scaleMap: {
				0: 1,
				1: 0.9,
				2: 0.8,
				3: 0.7,
				4: 0.8,
				5: 0.9,
			},
		}
	},
	computed: {
		cardLen() {
			return this.btns.length
		},
		degStep() {
			return 360 / this.cardLen
		},
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
			if (item.url) {
				this.$router.push(item.url)
			}
		},
		initCard() {
			// 设置卡片位置
			const _this = this
			var aImg = document.querySelectorAll('.albumItem')
			const transMap = {}

			for (var i = 0; i < this.cardLen; i++) {
				transMap[i] = 'rotateY(' + i * this.degStep + 'deg) translateZ(700px)'
				aImg[i].style.transform = transMap[i] + `scale(${this.scaleMap[i]})`
				if (i == 0) {
					aImg[i].style.opacity = 1
				} else {
					aImg[i].style.opacity = 0.6
				}
			}
			this.transMap = transMap
			var album = document.getElementById('album')
			var lastX = 0 // 前一次的坐标X
			var nowX = 0 // 当前的坐标X
			var desX = 0
			var rotY = 0
			var timer // 时间间隔
			document.onmousedown = function (ev) {
				lastX = ev.clientX
				this.onmousemove = function (ev) {
					rotY = _this.rotY
					nowX = ev.clientX
					desX = nowX - lastX
					rotY += desX * 0.2

					album.style.transition = null
					lastX = nowX
					_this.rotY = rotY
					let currentIndex = 0
					if (rotY >= _this.degStep / 2) {
						// 往左半个就是2，往右半个就取len-1
						currentIndex =
							_this.cardLen - (Math.round(rotY / _this.degStep) % _this.cardLen)
					} else {
						currentIndex = Math.abs(
							Math.round(rotY / _this.degStep) % _this.cardLen
						)
					}
					_this.setEveryCardTransform(currentIndex, rotY)
				}
				document.onmouseup = function () {
					this.onmousemove = this.onmouseup = null
				}
				// 阻止默认行为
				return false
			}
		},
		setEveryCardTransform(currentIndex, rotY) {
			var aImg = document.querySelectorAll('.albumItem')
			var album = document.getElementById('album')
			album.style.transform = 'rotateY(' + rotY + 'deg)'
			for (var i = 0; i < this.cardLen; i++) {
				const newIndex =
					i - currentIndex >= 0
						? i - currentIndex
						: i - currentIndex + this.cardLen
				if (i == currentIndex) {
					aImg[i].style.transform =
						this.transMap[i] + `scale(${this.scaleMap[newIndex]})`
					aImg[i].style.opacity = 1
					aImg[i].style.transition = 'transform .5s '
				} else {
					aImg[i].style.transform =
						this.transMap[i] + `scale(${this.scaleMap[newIndex]})`
					aImg[i].style.opacity = 0.6
					aImg[i].style.transition = 'transform .5s '
				}
			}
		},
		setAuto() {
			console.log('setAuto')
			var album = document.getElementById('album')

			if (this.autoInterval) {
				clearInterval(this.autoInterval)
				this.autoInterval = null
			}
			this.autoInterval = setInterval(() => {
				this.rotY -= 10
				album.style.transition = 'transform 0.5s linear'
				const currentIndex =
					-Math.round(this.rotY / this.degStep) % this.cardLen
				this.setEveryCardTransform(currentIndex, this.rotY)
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
.main {
	width: 100%;
	height: 100%;
	// background-image: url('@/assets/images/nav/bg.jpg');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	.albumBox {
		width: 100%;
		height: 100%;
	}
	#album {
		width: 407px;
		height: 613px;
		margin: 0 auto;
		position: relative;
		transform-style: preserve-3d;
		transform: rotateX(0deg);
		color: #fff;
		.albumItem {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-image: url('@/assets/images/nav/card.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-position: center center;
			display: flex;
			justify-content: center;
			cursor: pointer;
			.albumContent {
				padding-top: 120px;
				text-align: center;
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
</style>
