import { merge, getGrid, getTooltip, getAxis, getLegend } from '../utils.js'
import { valueFormatter } from '../formatter.js'
import { setFontSize as fs, isArrayAllEqual as isAllEqual } from '../utils.js'

const base = (chartData = {}, option = {}) => {
	// eslint-disable-next-line no-unused-vars
	const { data = [], axisData = [], ...extraData } = chartData
	// 自定义API
	const {
		barWidth = 16,
		hideDataLabel = [], // 不显示label
		showMarkLine = [], // 数据相同，展示为一条直的虚线
		dataLabelFormatter, // 柱子上的label
		xAxisLabelFormatter = '{value}', // x轴的label
		yAxisLabelFormatter = '{value}', // y轴的label
		tooltipFormatter, // tooltip的label
		tooltipValueFormatter,
		dataLabelPosition = 'outside',
		dataLabelShow = true,
		dataLabelOpt = {}, // 数据 label 自定义样式
		color = [],
		labelColor = [],
		labelFontSize = 14,
		tooltipTrigger,
		barBackgroundColor = '',
		barBorderRadius = [],
		yAxisShow = true,
		legendShow = true,
		legendType = 'plain',
		legendColor = '#000',
		xAxisLabelRotate = 0,
		yAxisLabelRotate = 0,
		xAxisLabelFontSize = 16,
		yAxisLabelFontSize = 16,
		xAxisName = '',
		yAxisName = '',
		xAxisCustom = {},
		yAxisCustom = {},
		labelInterval = 0,
		legendPosition = 'cb',
		yAxisSplitLine = true,
		titleCustom = {},
		axisType = 'value',
		grid = {},
		xAxisColor = '#666',
		yAxisColor = '#666',
		dataZoomShow = false,
		dataZoomType = 'slider',
		dataZoomBottom = 20,
		...eOption // 这个应该升级为custom对象
	} = option
	// 图表配置项
	let _opt = {
		title: titleCustom,
		grid: getGrid(grid),
		legend: getLegend({ show: legendShow, type: legendType, position: legendPosition, color: legendColor }),
		tooltip: getTooltip({ trigger: 'axis' }),
		xAxis: getAxis({
			name: xAxisName,
			tick: false,
			labelInterval: labelInterval,
			labelMargin: 8,
			axisLabelFormatter: xAxisLabelFormatter,
			rotate: xAxisLabelRotate,
			axisLabelFontSize: xAxisLabelFontSize,
			axisCustom: xAxisCustom,
			color: xAxisColor,
		}),
		yAxis: getAxis({
			name: yAxisName,
			show: yAxisShow,
			type: axisType,
			scale: false,
			splitLine: yAxisSplitLine,
			tick: false,
			axis: false,
			axisLabelFormatter: yAxisLabelFormatter,
			rotate: yAxisLabelRotate,
			axisLabelFontSize: yAxisLabelFontSize,
			axisCustom: yAxisCustom,
			color: yAxisColor,
		}),
		color,
		dataZoom: {
			show: dataZoomShow,
			type: dataZoomType,
			realtime: true,
			start: 0,
			end: 100,
			height: 12,
			bottom: dataZoomBottom,
			borderColor: 'transparent',
			filterMode: 'filter',
			brushSelect: false,
			handleColor: '#aab6c6',
			handleSize: 20,
			showDetail: false,
		},
	}

	if (tooltipTrigger) {
		_opt.tooltip.trigger = (params) => {
			return tooltipTrigger(params, chartData)
		}
	}

	if (tooltipFormatter) {
		_opt.tooltip.formatter = (params) => {
			return tooltipFormatter(params, chartData)
		}
	}

	if (tooltipValueFormatter) {
		_opt.tooltip.valueFormatter = (params) => {
			return tooltipValueFormatter(params, chartData)
		}
	}

	let labelFormatter = (params) => {
		return valueFormatter(params.value, {
			type: 'auto',
			unit: 1,
			thousandSeparator: true,
			suffix: '',
		})
	}

	if (dataLabelFormatter) {
		labelFormatter = dataLabelFormatter
	}

	// 载入数据
	if (axisData) {
		_opt.xAxis.data = axisData
		// _opt.legend.data = axisData.map(item => ({ name: item.name }))
	}

	if (data) {
		_opt.series = data.map((item, i) => {
			const { type, ...others } = item

			const seriesItem = {
				type: type || 'bar',
				name: item.name,
				data: item.data,
				barWidth: barWidth,
				showBackground: !!barBackgroundColor,
				backgroundStyle: {
					color: barBackgroundColor,
				},
				label: {
					fontSize: fs(labelFontSize),
					show: dataLabelShow && !hideDataLabel.includes(item.name),
					position: dataLabelPosition,
					formatter: labelFormatter,
					color: labelColor[i] || color[i] || '#000',
					...dataLabelOpt,
				},
				itemStyle: {
					borderRadius: barBorderRadius.length ? barBorderRadius : [0],
				},
				...others,
			}
			if (showMarkLine.includes(item.name)) {
				const isEqual = isAllEqual(item.data)
				let lastIndex
				if (isEqual) {
					seriesItem.data.filter((item, index) => {
						if (item) {
							lastIndex = index
						}
					})

					seriesItem.label.show = false
					seriesItem.type = 'line'
					seriesItem.symbol = 'none'
					seriesItem.lineStyle = {
						type: 'dashed',
					}

					// 重复数据 只有一个点显示，其余的点不显示
					seriesItem.data = seriesItem.data.map((itm, idx) => {
						return {
							value: itm,
							label: {
								show: idx === lastIndex,
							},
							symbol: idx === lastIndex ? seriesItem.symbol : 'none',
						}
					})
				}
			}
			return seriesItem
		})
	}

	return {
		option: _opt,
		eOption,
	}
}

export const barOption = (chartData = {}, option = {}) => {
	let { option: _opt, eOption } = base(chartData, option)

	// 外部资源合并
	_opt = merge(_opt, eOption)
	return _opt
}

// 堆积图
export const stackBarOption = (chartData = {}, option = {}) => {
	const { stackValues = [], stackStrategy = 'samesign', ...baseOption } = option
	let { option: _opt, eOption } = base(chartData, baseOption)
	_opt.series.forEach((item, index) => {
		item.stack = stackValues[index] || 'stack'
		item.stackStrategy = stackStrategy
	})
	_opt = merge(_opt, eOption)
	return _opt
}

export const heapStackBarOption = (chartData = {}, option = {}) => {
	// eslint-disable-next-line no-unused-vars
	const { stackValues = [], stackStrategy = 'samesign', ...baseOption } = option
	let { option: _opt, eOption } = base(chartData, baseOption)
	let fd = chartData.data[0]?.commonData
	for (let eve in fd) {
		chartData?.axisData.map((item, index) => {
			if (item == fd[eve]) {
				fd.stackIdent.map((i, ind) => {
					let ad = []
					ad.push(...new Array(fd.stackIdent.length).fill(0))
					ad.splice(index, 1, fd.stackData[ind])
					_opt.series.push({
						type: 'bar',
						name: i,
						stack: 'total',
						data: ad,
						barWidth: option.barWidth,
						barGap: '-100%',
						label: {
							fontSize: 10,
							show: false,
							position: 'outside', //inside
							color: '#49a8fc',
						},
					})
				})
			}
		})
	}
	_opt = merge(_opt, eOption)
	return _opt
}

// 瀑布图
export const stackTotalBarOption = (chartData = {}, option = {}) => {
	const { order = 'ascending', stackStrategy = 'samesign', ...baseOption } = option
	let { option: _opt, eOption } = base(chartData, baseOption)

	_opt.legend.show = false
	_opt.tooltip = {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params) {
			let str = ''
			params.map((item) => {
				if (item.value !== '-') {
					str = item.name + '：' + item.value
				}
			})
			return str
		},
	}
	if (_opt.series && _opt.series.length > 0 && _opt.series[0].data && _opt.series[0].data.length > 0) {
		let initOpt = _opt.series[0]
		let dataValue = _opt.series[0].data
		let lg = dataValue.length
		let totalData = []
		let sum = 0
		if (order == 'ascending') {
			dataValue.map((item, index) => {
				if (index == lg - 1) {
					sum = 0
				}
				totalData[index] = sum
				sum = sum + parseFloat(item)
			})
		} else {
			dataValue.map((item, index) => {
				if (index >= 1) {
					sum = sum - parseFloat(item)
					totalData[index] = sum
				} else {
					totalData[index] = 0
					sum = item
				}
			})
		}
		_opt.series[0].data.map((item, index) => {
			let arr = Array(lg).fill('-')
			arr[index] = item
			_opt.series[0] = {
				...initOpt,
				stack: 'stack',
				stackStrategy: stackStrategy,
				label: {
					show: false,
				},
				name: '',
				silent: true,
				itemStyle: {
					borderColor: 'transparent',
					color: 'transparent',
				},
				emphasis: {
					itemStyle: {
						borderColor: 'transparent',
						color: 'transparent',
					},
				},
				data: totalData,
			}
			_opt.series[index + 1] = {
				...initOpt,
				stack: 'stack',
				stackStrategy: stackStrategy,
				data: arr,
			}
		})
	}
	_opt = merge(_opt, eOption)
	return _opt
}
// 水平Bar
export const horizontalBarOption = (chartData = {}, option = {}) => {
	const { dataLabelPosition = 'right', yInverse = false, ...baseOption } = option
	let { option: _opt, eOption } = base(chartData, baseOption)
	const { xAxis, yAxis } = _opt
	_opt.xAxis = yAxis
	_opt.yAxis = xAxis
	_opt.yAxis.inverse = yInverse
	_opt.series.forEach((item) => {
		item.label.position = dataLabelPosition
	})
	_opt = merge(_opt, eOption)
	return _opt
}

// 水平堆积图
export const horizontalStackBarOption = (chartData = {}, option = {}) => {
	const {
		dataLabelPosition = 'outside',
		stackStrategy = 'samesign',
		stackValues = [],
		yInverse = false,
		...baseOption
	} = option
	let { option: _opt, eOption } = base(chartData, baseOption)

	const { xAxis, yAxis } = _opt
	_opt.xAxis = yAxis
	_opt.yAxis = xAxis
	_opt.yAxis.inverse = yInverse
	_opt.series.forEach((item, index) => {
		item.stack = stackValues[index] || 'stack'
		item.stackStrategy = stackStrategy
		item.label.position = dataLabelPosition
		// item.label.show = false;
		// item.label.rotate = -90;
		// item.label.offset = [-10, 0];
	})
	_opt = merge(_opt, eOption)
	return _opt
}

// 左右双向对比柱状图
export const pictorialBarOption = (chartData = {}, option = {}) => {
	const { data = [], axisData = [] } = chartData
	// 自定义API
	const {
		barWidth = 10,
		hideDataLabel = [], // 不显示label
		// showMarkLine = [], // 数据相同，展示为一条直的虚线
		dataLabelFormatter, // 柱子上的label
		// xAxisLabelFormatter = '{value}', // x轴的label
		// yAxisLabelFormatter = '{value}', // y轴的label
		tooltipFormatter, // tooltip的label
		// tooltipValueFormatter,
		dataLabelPosition = 'outside',
		dataLabelShow = true,
		dataLabelOpt = {}, // 数据 label 自定义样式
		color = [],
		labelColor = [],
		labelFontSize = 10,
		tooltipTrigger = 'axis',
		barBackgroundColor = '',
		barBorderRadius = [],
		// yAxisShow = true,
		legendShow = true,
		legendType = 'plain',
		rightDataLabel = [],
		lineDataLabel = [],
		...eOption
	} = option
	// 图表配置项
	let _opt = {
		grid: [
			{
				left: 15,
				top: 20,
				bottom: 50,
				width: '38%',
			},
			{
				right: 25,
				top: 20,
				bottom: 50,
				width: '38%',
			},
		],
		legend: getLegend({ show: legendShow, type: legendType }),
		tooltip: getTooltip({ trigger: tooltipTrigger }),
		color,
		xAxis: [
			{
				type: 'value',
				inverse: true,
				splitLine: { show: false },
				axisLabel: { show: false },
				axisLine: { show: false },
				axisTick: { show: false },
			},
			{
				type: 'value',
				inverse: false,
				gridIndex: 1,
				splitLine: { show: false },
				axisLabel: { show: false },
				axisLine: { show: false },
				axisTick: { show: false },
			},
		],
		yAxis: [
			{
				position: 'right',
				data: axisData,
				type: 'category',
				axisLabel: { show: true },
				axisLine: { show: false },
				splitLine: { show: false },
				axisTick: { show: false },
				inverse: true,
			},
			{
				type: 'category',
				data: axisData,
				axisLabel: { color: 'transparent' },
				axisLine: { show: false },
				splitLine: { show: false },
				axisTick: { show: false },
				inverse: true,
				gridIndex: 1,
			},
		],
	}
	let labelFormatter = (params) => {
		return valueFormatter(params.value, {
			type: 'auto',
			unit: 1,
			thousandSeparator: true,
			suffix: '',
		})
	}
	if (tooltipFormatter) {
		_opt.tooltip.formatter = (params) => {
			return tooltipFormatter(params, chartData)
		}
	}
	if (dataLabelFormatter) {
		labelFormatter = dataLabelFormatter
	}
	if (data) {
		_opt.series = data.map((item, i) => {
			const { ...others } = item
			const seriesItem = {
				type: lineDataLabel.includes(item.name) ? 'line' : 'bar',
				name: item.name,
				data: item.data,
				barWidth: barWidth,
				showBackground: !!barBackgroundColor,
				backgroundStyle: {
					color: barBackgroundColor,
				},
				symbol: 'none',
				// symbolSize: 0,
				label: {
					fontSize: fs(labelFontSize),
					show: dataLabelShow && !hideDataLabel.includes(item.name),
					position: dataLabelPosition,
					formatter: labelFormatter,
					color: labelColor[i] || color[i] || '#000',
					...dataLabelOpt,
				},
				itemStyle: {
					borderRadius: barBorderRadius.length ? barBorderRadius : [0],
				},
				...others,
			}
			if (rightDataLabel.length > 0) {
				if (rightDataLabel.includes(item.name)) {
					seriesItem.xAxisIndex = 1
					seriesItem.yAxisIndex = 1
				}
			}

			return seriesItem
		})
	}
	_opt = merge(_opt, eOption)
	return _opt
}
// 重叠图（堆叠图 + 常规柱状图重叠）
export const doubleStackBar = (chartData = {}, option = {}) => {
	const { dataLabelShow = false, ...baseOption } = option
	chartData.data = chartData.data.map((item, i) => {
		if (i < chartData.data.length - 1) {
			item.xAxisIndex = 0
			item.yAxisIndex = 0
			item.stack = 'Total'
			item.z = 2
		} else {
			item.xAxisIndex = 1
			item.yAxisIndex = 0
			item.z = 1
			item.barWidth = baseOption.barWidth + 5
			item.color = '#ccc'
			item.label = {
				show: false,
			}
		}
		return item
	})
	let { option: _opt, eOption } = base(chartData, { dataLabelShow, ...baseOption })
	const xAxis = _opt.xAxis
	const yAxis = _opt.yAxis
	_opt.xAxis = [
		xAxis,
		{
			...xAxis,
			axisLabel: { show: false },
			axisLine: { show: false },
			axisPointer: { label: { show: false } },
		},
	]
	_opt.yAxis = [yAxis, yAxis]
	_opt = merge(_opt, eOption)
	return _opt
}
