<template>
	<div class="homeWrap">
		<PageTitle img="homeTitle" :back="false" />
		<div class="main">
			<div class="rightBtn">
				<img class="icon" src="@/assets/home/icon.png" />
				<div class="label">集成门户入口</div>
			</div>
			<div class="albumBox" @mouseenter="clearAuto">
				<div id="album">
					<div
						v-for="(item, i) in btns"
						:key="i"
						class="albumItem"
						@click="goPage(item)"
					>
						<div class="albumContent">
							<img :src="require(`@/assets/home/${item.icon}.png`)" /><br />
							<div class="albumBtn">
								{{ item.label }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<div
				v-for="(item, i) in actions"
				:key="i"
				class="footerBtn"
				@click="goPages(item)"
			>
				{{ item.label }}
			</div>
		</div>
	</div>
</template>

<script>
const scaleMap = {
	0: 1,
	1: 0.9,
	2: 0.8,
	3: 0.7,
	4: 0.8,
	5: 0.9,
}
export default {
	components: {
		PageTitle: () => import('@/components/title/pageTitle'),
	},
	data() {
		return {
			actions: [
				{label: '智链平台', url: 'http://zl-dev.inspurzl.com'},
				{label: '数字云仓平台', url: 'http://ygc.dev.inspurzl.com'},
				{label: '数字工厂平台', url: 'http://ygc.dev.inspurzl.com'},
				// { label: '物联网平台', url: '' }
			],
			btns: [
				{label: '物联总控', icon: '1', url: '/screen/LoT'},
				{label: '订单总控', icon: '2', url: '/screen/order'},
				{label: '仓储总控', icon: '3', url: '/screen/storage'},
				{label: '数字化工厂', icon: '4', url: '/screen/factory'},
				{label: '钢铁总控', icon: '5', url: '/screen/steel'},
				{label: '橡胶总控', icon: '6', url: ''},
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
			const deg = 360 / len
			for (var i = 0; i < aImg.length; i++) {
				transMap[i] = 'rotateY(' + i * deg + 'deg) translateZ(614.4px)'
				aImg[i].style.transform = transMap[i] + `scale(${scaleMap[i]})`
				if (i == 0) {
					aImg[i].style.opacity = 1
				} else {
					aImg[i].style.opacity = 0.6
				}
				// aImg[i].style.transition = 'transform 1s ' + (aImg.length - i) * 0.1 + 's';
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
	background-image: url('~@/assets/home/bg.jpg');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	.main {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		.albumBox {
			width: 1450px;
		}
		#album {
			width: 407px;
			height: 613px;
			margin: 0 auto;
			position: relative;
			transform-style: preserve-3d;
			transform: rotateX(0deg);
			.albumItem {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-image: url('~@/assets/home/card.png');
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-position: center center;
				display: flex;
				justify-content: center;
				cursor: pointer;
				.albumContent {
					padding-top: 120px;
					text-align: center;
					.albumBtn {
						margin-top: 60px;
						text-align: center;
						font-size: 36px;
						font-weight: bold;
						background-image: url('~@/assets/home/btn2.png');
						width: 266px;
						height: 64px;
						line-height: 64px;
						background-size: 100% 100%;
						background-repeat: no-repeat;
						background-position: center center;
					}
				}
				img {
					width: 196px;
					height: auto;
				}
			}
		}

		@keyframes rotation {
			from {
				transform: rotateY(0deg);
			}
			to {
				transform: rotateY(360deg);
			}
		}

		.rightBtn {
			position: absolute;
			z-index: 99;
			right: 20px;
			top: 65px;
			width: 164px;
			height: 43px;
			background-image: url('~@/assets/home/btn1.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-position: center center;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			.icon {
				width: 22px;
				height: 17px;
				margin-right: 8px;
			}
			.label {
				height: 22px;
				line-height: 22px;
				margin-top: 2px;
			}
			font-size: 16px;
			color: #39f8ea;
		}
	}
	.footer {
		position: absolute;
		bottom: 38px;
		display: flex;
		padding: 0 620px;
		justify-content: space-between;
		.footerBtn {
			background-image: url('~@/assets/home/btn3.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-position: center center;
			width: 214px;
			height: 60px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 20px;
			font-weight: 600;
			color: #39f8ea;
			cursor: pointer;
		}
	}
}
</style>
