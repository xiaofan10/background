import { setFontSize as fs } from './utils.js'
/**
 * 优先级 extra内容优先级高于自定义配置
 * 默认值
 * 该函数没有兼容数组检测
 */
export function merge(def, target) {
	const opt = def
	const targetAttrs = Object.keys(target)
	targetAttrs.forEach((item) => {
		const tarType = getType(target[item])
		const defType = getType(opt[item])
		if (tarType === '[object Object]' && defType === '[object Object]') {
			opt[item] = merge(opt[item], target[item])
		} else {
			opt[item] = target[item]
		}
	})
	return opt
}
export function getType(target) {
	return Object.prototype.toString.call(target)
}
/**
 * 深拷贝函数
 * @param {} obj
 */
export function deepClone(obj) {
	//可传入对象 或 数组
	//  判断是否为 null 或 undefined 直接返回该值即可,
	if (obj === null || !obj) return obj
	// 判断 是要深拷贝 对象 还是 数组
	if (Object.prototype.toString.call(obj) === '[object Object]') {
		//对象字符串化的值会为 "[object Object]"
		let target = {} //生成新的一个对象
		const keys = Object.keys(obj) //取出对象所有的key属性 返回数组 keys = [ ]
		//遍历复制值, 可用 for 循环代替性能较好
		keys.forEach((key) => {
			if (obj[key] && typeof obj[key] === 'object')
				//如果遇到的值又是 引用类型的 [ ] {} ,得继续深拷贝
				target[key] = deepClone(obj[key])
			//递归
			else target[key] = obj[key]
		})
		return target //返回新的对象
	} else if (Array.isArray(obj)) {
		// 数组同理
		let arr = []
		obj.forEach((item, index) => {
			if (item && typeof item === 'object') arr[index] = deepClone(item)
			else arr[index] = item
		})
		return arr
	}
}

/**
 * grid基础函数
 * @param {*} param0
 * @returns
 */
export const getGrid = (config = {}) => {
	const { containLabel = true, top = 30, right = 10, bottom = 40, left = 10, ...extra } = config
	return {
		containLabel: containLabel, // 是否把坐标轴计算在内
		top: fs(top),
		right: fs(right),
		bottom: fs(bottom),
		left: fs(left),
		...extra,
	}
}

export const getTooltip = (config = {}) => {
	const { trigger = 'axis', ...extra } = config
	return {
		show: true,
		trigger,
		confine: true,
		axisPointer: {
			type: 'shadow',
		},
		textStyle: {
			fontSize: fs(14), // 字体大小
		},
		...extra,
	}
}

export const getAxis = ({
	name = '',
	show = true,
	type = 'category',
	scale = false,
	tick = true,
	tickInterval = 'auto',
	label = true,
	labelInterval = 'auto',
	labelMargin = 5,
	splitLine = false,
	axis = true,
	axisLabelFormatter,
	axisLabelFontSize = 16,
	rotate = 0,
	axisCustom = {},
	color = '#666',
	extra,
}) => {
	return {
		name,
		...axisCustom,
		show,
		type,
		scale,
		axisLine: {
			show: axis,
		},
		axisTick: {
			show: tick,
			interval: tickInterval,
		},
		axisLabel: {
			show: label,
			interval: labelInterval,
			margin: labelMargin,
			color: color,
			fontSize: fs(axisLabelFontSize),
			rotate: rotate,
			formatter: axisLabelFormatter || '{value}',
		},
		splitLine: {
			show: splitLine,
			lineStyle: {
				type: 'dashed',
			},
		},
		axisPointer: {
			type: 'shadow', // 选中柱状图加阴影
			label: {
				show: label,
				margin: labelMargin - 5,
				fontSize: 12,
				formatter: '{value}',
			},
		},
		...extra,
	}
}
// type 第一个字段为水平轴方向，第二个为垂直方向
export const getLegendPosition = (type) => {
	const _opt = {
		top: 'auto',
		bottom: 'auto',
		left: 'auto',
		right: 'auto',
	}
	if (type == 'cc') {
		_opt.left = 'center'
		_opt.top = 'middle'
	} else if (type == 'ct') {
		_opt.left = 'center'
		// _opt.top = "top"
		_opt.top = '2%'
	} else if (type == 'cb') {
		_opt.left = 'center'
		_opt.bottom = fs(2)
	} else if (type == 'lt') {
		_opt.left = 'left'
		_opt.top = 'top'
	} else if (type === 'lc') {
		_opt.left = 'left'
		_opt.top = 'middle'
	} else if (type == 'lb') {
		_opt.left = 'left'
		_opt.top = 'bottom'
	} else if (type == 'rt') {
		_opt.right = 'right'
		_opt.top = 'top'
	} else if (type == 'rc') {
		_opt.right = 'right'
		_opt.top = 'middle'
	} else if (type === 'rb') {
		_opt.right = 'right'
		_opt.top = 'bottom'
	} else {
		_opt.left = 'center'
		_opt.top = 'bottom'
	}
	return _opt
}

export const getLegend = (config = {}) => {
	const { type = 'plain', position = 'cb', show = true, formatter, color = '#666', ...extra } = config
	const hori = ['cb', 'ct']
	return {
		show,
		type: type || 'plain',
		orient: hori.includes(position) ? 'horizontal' : 'vertical',
		...getLegendPosition(position), // 默认下面
		padding: fs(5), // 图例内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。
		itemGap: fs(10), // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
		// icon: "roundRect", // 图例项的 icon。'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
		borderRadius: 0,
		borderWidth: 0,
		itemWidth: fs(20),
		itemHeight: fs(15),
		formatter,
		textStyle: {
			fontSize: fs(16),
			color: color,
		},
		...extra,
	}
}

export const getRdiusAxis = (config = {}) => {
	const { fontSize = 12, labelShow = true, ...extra } = config
	return {
		axisLabel: {
			fontSize,
			show: labelShow,
			showMinLabel: true,
			showMaxLabel: true,
			hideOverlap: true,
		},
		...extra,
	}
}

export const getAngleAxis = (config = {}) => {
	const { fontSize = 12, ...extra } = config
	return {
		// type: "category",
		axisLabel: {
			fontSize,
		},
		...extra,
	}
}

export const consoleJSON = (res, ...extra) => console.log(JSON.parse(JSON.stringify(res)), ...extra)
//数字增加千分符
export const milliFormat = (num) => {
	if (num) {
		const reg = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g
		return num.toString().replace(reg, '$1,')
	}
	return num
}

/**
 * 响应式 echarts重新计算个单元字号
 * @param {*} size
 * @param {*} refrence 可选参数
 * @returns number
 */
export const setFontSize = (size, refrence) => {
	if (isNaN(Number(size))) return 0

	const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
	if (!clientWidth) {
		return size
	}
	const standard = refrence || 1920
	// 此处的3840 为设计稿的宽度，记得修改！
	const fontSize = clientWidth / standard
	return size * fontSize
}

// 判断数组里值是否都相等
export const isArrayAllEqual = (array) => {
	if (array.length) {
		const setArr = new Set(array)
		return setArr.size == 1
	}
	return false
}
export default {
	isArrayAllEqual,
	setFontSize,
}
