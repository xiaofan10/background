<template>
	<div class="chart_wrap" :style="'border-radius:' + radius + ';overflow:hidden;background:' + backgroundColor + ';'">
		<div class="header_box">
			<div v-if="useTitle">
				<span class="title" v-if="!otherTitle" :name="title">{{ title }}</span>
				<span class="title_1" v-if="otherTitle" :name="title">{{ title }}</span>
				<span v-if="unit" class="unit">单位:{{ unit }}</span>
			</div>
			<img v-if="useDetail && goingId" src="@/assets/images/load.png" class="load_img" alt @click="open()" />
		</div>
		<div class="content_box" ref="contentBox">
			<div class="chart_box" ref="chartBox"></div>
		</div>
	</div>
</template>

<script>
import { fontSize as fs } from '@/util/fontsize'
import { THEMES } from './theme/index'
import {
	barOption,
	stackBarOption,
	stackTotalBarOption,
	horizontalBarOption,
	horizontalStackBarOption,
	pictorialBarOption,
	doubleStackBar,
	heapStackBarOption,
} from './bar'
import { pieOption, rosePieOption, loopPieOption } from './pie'
import { polarOption } from './polar'
import { lineOption, horizontalLineOption, stackLineOption, horizontalStackLineOption } from './line'
import { scatterOption } from './scatter'
import { mixOption, horizontalMixOption } from './mix'
// import { mapOption, scatterMapOption } from "./map"
import { liquidFillOption } from './liquidFill'

export default {
	props: {
		useTitle: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: '',
			required: false,
		},
		useDetail: {
			type: Boolean,
			default: false,
		},
		goingId: {
			type: String,
		},
		openPanel: {
			type: Function,
		},
		unit: {
			type: String,
			default: '',
		},
		otherTitle: {
			type: Boolean,
			default: false,
		},
		echartGenre: {
			type: String,
			default: 'svg',
		},
		radius: {
			type: String,
			default: '0%',
		},
		backgroundColor: {
			type: String,
			default: '#fff',
		},
		type: {
			type: String,
			default: 'bar',
		},
		echartData: [],
		option: {
			type: Object,
			default: () => ({}),
		},
		theme: {
			// 图表颜色
			type: String,
			default: 'base',
		},
	},
	data() {
		return {
			isInit: false,
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.initChart()
		})
	},
	beforeDestroyed() {
		// 离开页面必须进行移除，否则会造成内存泄漏，导致卡顿
		let _self = this
		if (_self.chart) {
			window.removeEventListener('resize', _self.renderChart())
		}
	},
	watch: {
		echartData: {
			handler(val, oldVal) {
				if (this.isInit) {
					this.renderChart()
				}
			},
			deep: true,
		},
	},
	computed: {},
	methods: {
		initChart() {
			let _self = this
			if (!this.chart) {
				this.chart = this.$echarts.init(this.$refs.chartBox, null, { renderer: this.echartGenre })
			}
			this.isInit = true
			// 为窗口加上宽度变化事件，当宽高发生改变时，调用echarts的resize()方法，调整图表尺寸
			window.addEventListener('resize', function () {
				if (_self.chart) {
					_self.renderChart()
				}
			})
		},
		getOption() {
			const { type, echartData, option, theme } = this
			let _opt = {}
			const color = THEMES[theme].color
			// 柱状图
			if (type === 'bar') {
				_opt = barOption(echartData, { color, ...option })
			} else if (type == 'horiBar') {
				_opt = horizontalBarOption(echartData, { color, ...option })
			} else if (type == 'doubleStackBar') {
				_opt = doubleStackBar(echartData, { color, ...option })
			} else if (type === 'stackBar') {
				_opt = stackBarOption(echartData, { color, ...option })
			} else if (type === 'heapStack') {
				_opt = heapStackBarOption(echartData, { color, ...option })
			} else if (type === 'stackTotalBar') {
				_opt = stackTotalBarOption(echartData, { color, ...option })
			} else if (type === 'horiStackBar') {
				_opt = horizontalStackBarOption(echartData, { color, ...option })
			} else if (type === 'pictorialBar') {
				_opt = pictorialBarOption(echartData, { color, ...option })
			}
			// 折线图
			else if (type === 'line') {
				_opt = lineOption(echartData, { color, ...option })
			} else if (type === 'horiLine') {
				_opt = horizontalLineOption(echartData, { color, ...option })
			} else if (type === 'stackLine') {
				_opt = stackLineOption(echartData, { color, ...option })
			} else if (type === 'horiStackLine') {
				_opt = horizontalStackLineOption(echartData, { color, ...option })
			}
			// 饼图
			else if (type === 'pie') {
				_opt = pieOption(echartData, { color, ...option })
			} else if (type === 'rosePie') {
				_opt = rosePieOption(echartData, { color, ...option })
			} else if (type === 'loopie') {
				_opt = loopPieOption(echartData, { color, ...option })
			} else if (type === 'polar') {
				_opt = polarOption(echartData, { color, ...option })
			} else if (type === 'scatter') {
				_opt = scatterOption(echartData, { color, ...option })
			}
			// 柱状、折线混合图
			else if (type == 'mix') {
				_opt = mixOption(echartData, { color, ...option })
			} else if (type == 'horiMix') {
				_opt = horizontalMixOption(echartData, { color, ...option })
			}
			// 水滴图
			else if (type == 'liquidFill') {
				_opt = liquidFillOption(echartData, { color, ...option })
			}
			// else if (type == "map") {
			//   const { mapType } = echartData
			//   _opt = mapOption({ echartData: echartData.data }, { mapType, color, ...option })
			// } else if (type == "scatterMap") {
			//   const { mapType } = echartData
			//   _opt = scatterMapOption({ echartData: echartData.data }, { mapType, color, ...option })
			// }
			return this.adapter(_opt)
		},
		// 适配barWidth 等字体大小，所有字体大小都应该在这里做适配
		adapter(opt) {
			opt?.series?.forEach((item) => {
				if (item.barWidth) {
					item.barWidth = fs(item.barWidth)
				}
			})
			return opt
		},
		bindEvent() {
			if (this.chart) {
				const { type, chart } = this
				if (type === 'bar' || type === 'line' || type === 'scatter' || type === 'mix') {
					// 点击事件
					chart.getZr().off('click')
					chart.getZr().on('click', (params) => {
						let op = chart.getOption()
						const pointInPixel = [params.offsetX, params.offsetY]
						if (chart.containPixel('grid', pointInPixel)) {
							let value
							if (type === 'bar' || type === 'line' || type === 'mix') {
								let xIndex = chart.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[0]
								value = op.xAxis[0].data[Number(xIndex)]
							} else if (type === 'horiBar' || type === 'horiLine' || type === 'horiMix') {
								let yIndex = chart.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[1]
								value = op.yAxis[0].data[Number(yIndex)]
							}
							this.$emit('click', value)
						}
					})
					// 双击事件
					chart.getZr().off('dblclick')
					chart.getZr().on('dblclick', (params) => {
						let op = chart.getOption()
						const pointInPixel = [params.offsetX, params.offsetY]
						if (chart.containPixel('grid', pointInPixel)) {
							let value
							if (type === 'bar' || type === 'line' || type === 'mix') {
								let xIndex = chart.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[0]
								value = op.xAxis[0].data[Number(xIndex)]
							} else if (type === 'horiBar' || type === 'horiLine' || type === 'horiMix') {
								let yIndex = chart.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[1]
								value = op.yAxis[0].data[Number(yIndex)]
							}
							this.$emit('dblclick', value)
						}
					})
				} else if (type === 'pie') {
					chart.off('click')
					chart.on('click', (params) => {
						this.$emit('click', params)
					})
					chart.off('dblclick')
					chart.on('dblclick', (params) => {
						this.$emit('dblclick', params)
					})
				}
			}
		},
		renderChart() {
			const opt = this.getOption()
			if (opt) {
				this.chart.resize() // 放在前方渲染动画
				this.chart.setOption(opt)
			}
			this.bindEvent()
		},
		open() {
			if (this.openPanel) {
				this.openPanel(this.goingId)
			}
		},
	},
}
</script>

<style scoped lang="less">
.chart_wrap {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: column;
	box-sizing: border-box;
	.header_box {
		display: flex;
		align-items: flex-end;
		.title {
			position: relative;
			padding-left: 20px;
			font-size: 24px;
			color: #4a4a4a;
			font-weight: 700;
			font-family: Noto Sans S Chinese;
			&::after {
				content: '';
				width: 6px;
				height: 27px;
				background: #11aefc;
				position: absolute;
				left: 8px;
				top: 5px;
			}
		}
		.title_1 {
			position: relative;
			padding-left: 45px;
			font-size: 32px;
			color: #4a4a4a;
			font-family: Noto Sans S Chinese;
			&::after {
				content: '';
				width: 6px;
				height: 27px;
				background: #11aefc;
				position: absolute;
				left: 8px;
				top: 5px;
			}
		}
		.unit {
			font-size: 16px;
			color: #aaa;
		}
		.load_img {
			vertical-align: middle;
			width: 26px;
			height: 26px;
			cursor: pointer;
			margin-left: 0.5rem;
		}
	}
	.content_box {
		width: 100%;
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		position: relative;
		.chart_box {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
		}
	}
}
</style>
