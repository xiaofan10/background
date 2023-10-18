'use strict'
function t(t, e) {
	var o = Object.keys(t)
	if (Object.getOwnPropertySymbols) {
		var i = Object.getOwnPropertySymbols(t)
		e &&
			(i = i.filter(function (e) {
				return Object.getOwnPropertyDescriptor(t, e).enumerable
			})),
			o.push.apply(o, i)
	}
	return o
}
function e(e) {
	for (var i = 1; i < arguments.length; i++) {
		var a = null != arguments[i] ? arguments[i] : {}
		i % 2
			? t(Object(a), !0).forEach(function (t) {
					o(e, t, a[t])
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
			: t(Object(a)).forEach(function (t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
			  })
	}
	return e
}
function o(t, e, o) {
	return (
		(e = (function (t) {
			var e = (function (t, e) {
				if ('object' != typeof t || null === t) return t
				var o = t[Symbol.toPrimitive]
				if (void 0 !== o) {
					var i = o.call(t, e || 'default')
					if ('object' != typeof i) return i
					throw new TypeError('@@toPrimitive must return a primitive value.')
				}
				return ('string' === e ? String : Number)(t)
			})(t, 'string')
			return 'symbol' == typeof e ? e : String(e)
		})(e)) in t
			? Object.defineProperty(t, e, { value: o, enumerable: !0, configurable: !0, writable: !0 })
			: (t[e] = o),
		t
	)
}
function i() {
	return (
		(i = Object.assign
			? Object.assign.bind()
			: function (t) {
					for (var e = 1; e < arguments.length; e++) {
						var o = arguments[e]
						for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (t[i] = o[i])
					}
					return t
			  }),
		i.apply(this, arguments)
	)
}
function a(t, e) {
	if (null == t) return {}
	var o,
		i,
		a = (function (t, e) {
			if (null == t) return {}
			var o,
				i,
				a = {},
				r = Object.keys(t)
			for (i = 0; i < r.length; i++) (o = r[i]), e.indexOf(o) >= 0 || (a[o] = t[o])
			return a
		})(t, e)
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(t)
		for (i = 0; i < r.length; i++)
			(o = r[i]), e.indexOf(o) >= 0 || (Object.prototype.propertyIsEnumerable.call(t, o) && (a[o] = t[o]))
	}
	return a
}
function r(t) {
	return (
		(function (t) {
			if (Array.isArray(t)) return n(t)
		})(t) ||
		(function (t) {
			if (('undefined' != typeof Symbol && null != t[Symbol.iterator]) || null != t['@@iterator']) return Array.from(t)
		})(t) ||
		(function (t, e) {
			if (!t) return
			if ('string' == typeof t) return n(t, e)
			var o = Object.prototype.toString.call(t).slice(8, -1)
			'Object' === o && t.constructor && (o = t.constructor.name)
			if ('Map' === o || 'Set' === o) return Array.from(t)
			if ('Arguments' === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)) return n(t, e)
		})(t) ||
		(function () {
			throw new TypeError(
				'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
			)
		})()
	)
}
function n(t, e) {
	;(null == e || e > t.length) && (e = t.length)
	for (var o = 0, i = new Array(e); o < e; o++) i[o] = t[o]
	return i
}
var l = ['containLabel', 'top', 'right', 'bottom', 'left'],
	s = ['trigger'],
	d = ['type', 'position', 'show', 'formatter', 'color']
function c(t, e) {
	var o = t
	return (
		Object.keys(e).forEach(function (t) {
			var i = u(e[t]),
				a = u(o[t])
			o[t] = '[object Object]' === i && '[object Object]' === a ? c(o[t], e[t]) : e[t]
		}),
		o
	)
}
function u(t) {
	return Object.prototype.toString.call(t)
}
var v = function () {
		var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
			o = t.containLabel,
			i = void 0 === o || o,
			r = t.top,
			n = void 0 === r ? 30 : r,
			s = t.right,
			d = void 0 === s ? 10 : s,
			c = t.bottom,
			u = void 0 === c ? 40 : c,
			v = t.left,
			p = void 0 === v ? 10 : v,
			b = a(t, l)
		return e({ containLabel: i, top: f(n), right: f(d), bottom: f(u), left: f(p) }, b)
	},
	p = function () {
		var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
			o = t.trigger,
			i = void 0 === o ? 'axis' : o,
			r = a(t, s)
		return e({ show: !0, trigger: i, confine: !0, axisPointer: { type: 'shadow' }, textStyle: { fontSize: f(14) } }, r)
	},
	b = function (t) {
		var o = t.name,
			i = void 0 === o ? '' : o,
			a = t.show,
			r = void 0 === a || a,
			n = t.type,
			l = void 0 === n ? 'category' : n,
			s = t.scale,
			d = void 0 !== s && s,
			c = t.tick,
			u = void 0 === c || c,
			v = t.tickInterval,
			p = void 0 === v ? 'auto' : v,
			b = t.label,
			h = void 0 === b || b,
			g = t.labelInterval,
			y = void 0 === g ? 'auto' : g,
			m = t.labelMargin,
			x = void 0 === m ? 5 : m,
			w = t.splitLine,
			S = void 0 !== w && w,
			L = t.axis,
			A = void 0 === L || L,
			k = t.axisLabelFormatter,
			O = t.axisLabelFontSize,
			F = void 0 === O ? 16 : O,
			j = t.rotate,
			C = void 0 === j ? 0 : j,
			P = t.axisCustom,
			z = void 0 === P ? {} : P,
			I = t.color,
			T = void 0 === I ? '#666' : I,
			B = t.extra
		return e(
			e({ name: i }, z),
			{},
			{
				show: r,
				type: l,
				scale: d,
				axisLine: { show: A },
				axisTick: { show: u, interval: p },
				axisLabel: { show: h, interval: y, margin: x, color: T, fontSize: f(F), rotate: C, formatter: k || '{value}' },
				splitLine: { show: S, lineStyle: { type: 'dashed' } },
				axisPointer: { type: 'shadow', label: { show: h, margin: x - 5, fontSize: 12, formatter: '{value}' } },
			},
			B
		)
	},
	h = function () {
		var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
			o = t.type,
			i = void 0 === o ? 'plain' : o,
			r = t.position,
			n = void 0 === r ? 'cb' : r,
			l = t.show,
			s = void 0 === l || l,
			c = t.formatter,
			u = t.color,
			v = void 0 === u ? '#666' : u,
			p = a(t, d)
		return e(
			e(
				{ show: s, type: i || 'plain', orient: ['cb', 'ct'].includes(n) ? 'horizontal' : 'vertical' },
				(function (t) {
					var e = { top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' }
					return (
						'cc' == t
							? ((e.left = 'center'), (e.top = 'middle'))
							: 'ct' == t
							? ((e.left = 'center'), (e.top = '2%'))
							: 'cb' == t
							? ((e.left = 'center'), (e.bottom = f(2)))
							: 'lt' == t
							? ((e.left = 'left'), (e.top = 'top'))
							: 'lc' === t
							? ((e.left = 'left'), (e.top = 'middle'))
							: 'lb' == t
							? ((e.left = 'left'), (e.top = 'bottom'))
							: 'rt' == t
							? ((e.right = 'right'), (e.top = 'top'))
							: 'rc' == t
							? ((e.right = 'right'), (e.top = 'middle'))
							: 'rb' === t
							? ((e.right = 'right'), (e.top = 'bottom'))
							: ((e.left = 'center'), (e.top = 'bottom')),
						e
					)
				})(n)
			),
			{},
			{
				padding: f(5),
				itemGap: f(10),
				borderRadius: 0,
				borderWidth: 0,
				itemWidth: f(20),
				itemHeight: f(15),
				formatter: c,
				textStyle: { fontSize: f(16), color: v },
			},
			p
		)
	},
	f = function (t, e) {
		if (isNaN(Number(t))) return 0
		var o = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
		return o ? t * (o / (e || 1920)) : t
	}
function g(t, e) {
	return null === t || '' === t || void 0 === t
		? ''
		: 'NaN' == Number(t).toString()
		? e.isNaN || t
		: 'auto' === e.type
		? x(y(t, e), e)
		: 'value' === e.type
		? x(m(y(t, e), e), e)
		: 'percent' === e.type
		? x(m((t *= 100), e), e)
		: t
}
function y(t, e) {
	return t / e.unit
}
function m(t, e) {
	return t.toFixed(e.decimalCount)
}
function x(t, e) {
	var o,
		i = t + ''
	if (e.thousandSeparator) {
		var a = i.split('.')
		;(a[0] = a[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')), (i = a.join('.'))
	}
	e.ignoreUnit ||
		('percent' === e.type
			? (i += '%')
			: 1e3 === e.unit
			? (i += '千')
			: 1e4 === e.unit
			? (i += '万')
			: 1e6 === e.unit
			? (i += '百万')
			: 1e8 === e.unit && (i += '亿'))
	var r = null == e || null === (o = e.suffix) || void 0 === o ? void 0 : o.replace(/(^\s*)|(\s*$)/g, '')
	return r && (i += r), i
}
var w = ['data', 'axisData'],
	S = [
		'barWidth',
		'hideDataLabel',
		'showMarkLine',
		'dataLabelFormatter',
		'xAxisLabelFormatter',
		'yAxisLabelFormatter',
		'tooltipFormatter',
		'tooltipValueFormatter',
		'dataLabelPosition',
		'dataLabelShow',
		'dataLabelOpt',
		'color',
		'labelColor',
		'labelFontSize',
		'tooltipTrigger',
		'barBackgroundColor',
		'barBorderRadius',
		'yAxisShow',
		'legendShow',
		'legendType',
		'legendColor',
		'xAxisLabelRotate',
		'yAxisLabelRotate',
		'xAxisLabelFontSize',
		'yAxisLabelFontSize',
		'xAxisName',
		'yAxisName',
		'xAxisCustom',
		'yAxisCustom',
		'labelInterval',
		'legendPosition',
		'yAxisSplitLine',
		'titleCustom',
		'axisType',
		'grid',
		'xAxisColor',
		'yAxisColor',
		'dataZoomShow',
		'dataZoomType',
		'dataZoomBottom',
	],
	L = ['type'],
	A = ['stackValues', 'stackStrategy'],
	k = ['stackValues', 'stackStrategy'],
	O = ['order', 'stackStrategy'],
	F = ['dataLabelPosition', 'yInverse'],
	j = ['dataLabelPosition', 'stackStrategy', 'stackValues', 'yInverse'],
	C = [
		'barWidth',
		'hideDataLabel',
		'dataLabelFormatter',
		'tooltipFormatter',
		'dataLabelPosition',
		'dataLabelShow',
		'dataLabelOpt',
		'color',
		'labelColor',
		'labelFontSize',
		'tooltipTrigger',
		'barBackgroundColor',
		'barBorderRadius',
		'legendShow',
		'legendType',
		'rightDataLabel',
		'lineDataLabel',
	],
	P = ['dataLabelShow'],
	z = function () {
		var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
			o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
			i = t.data,
			r = void 0 === i ? [] : i,
			n = t.axisData,
			l = void 0 === n ? [] : n
		a(t, w)
		var s = o.barWidth,
			d = void 0 === s ? 16 : s,
			c = o.hideDataLabel,
			u = void 0 === c ? [] : c,
			y = o.showMarkLine,
			m = void 0 === y ? [] : y,
			x = o.dataLabelFormatter,
			A = o.xAxisLabelFormatter,
			k = void 0 === A ? '{value}' : A,
			O = o.yAxisLabelFormatter,
			F = void 0 === O ? '{value}' : O,
			j = o.tooltipFormatter,
			C = o.tooltipValueFormatter,
			P = o.dataLabelPosition,
			z = void 0 === P ? 'outside' : P,
			I = o.dataLabelShow,
			T = void 0 === I || I,
			B = o.dataLabelOpt,
			D = void 0 === B ? {} : B,
			W = o.color,
			N = void 0 === W ? [] : W,
			E = o.labelColor,
			R = void 0 === E ? [] : E,
			V = o.labelFontSize,
			Z = void 0 === V ? 14 : V,
			M = o.tooltipTrigger,
			$ = o.barBackgroundColor,
			G = void 0 === $ ? '' : $,
			U = o.barBorderRadius,
			H = void 0 === U ? [] : U,
			q = o.yAxisShow,
			J = void 0 === q || q,
			K = o.legendShow,
			Q = void 0 === K || K,
			X = o.legendType,
			Y = void 0 === X ? 'plain' : X,
			_ = o.legendColor,
			tt = void 0 === _ ? '#000' : _,
			et = o.xAxisLabelRotate,
			ot = void 0 === et ? 0 : et,
			it = o.yAxisLabelRotate,
			at = void 0 === it ? 0 : it,
			rt = o.xAxisLabelFontSize,
			nt = void 0 === rt ? 16 : rt,
			lt = o.yAxisLabelFontSize,
			st = void 0 === lt ? 16 : lt,
			dt = o.xAxisName,
			ct = void 0 === dt ? '' : dt,
			ut = o.yAxisName,
			vt = void 0 === ut ? '' : ut,
			pt = o.xAxisCustom,
			bt = void 0 === pt ? {} : pt,
			ht = o.yAxisCustom,
			ft = void 0 === ht ? {} : ht,
			gt = o.labelInterval,
			yt = void 0 === gt ? 0 : gt,
			mt = o.legendPosition,
			xt = void 0 === mt ? 'cb' : mt,
			wt = o.yAxisSplitLine,
			St = void 0 === wt || wt,
			Lt = o.titleCustom,
			At = void 0 === Lt ? {} : Lt,
			kt = o.axisType,
			Ot = void 0 === kt ? 'value' : kt,
			Ft = o.grid,
			jt = void 0 === Ft ? {} : Ft,
			Ct = o.xAxisColor,
			Pt = void 0 === Ct ? '#666' : Ct,
			zt = o.yAxisColor,
			It = void 0 === zt ? '#666' : zt,
			Tt = o.dataZoomShow,
			Bt = void 0 !== Tt && Tt,
			Dt = o.dataZoomType,
			Wt = void 0 === Dt ? 'slider' : Dt,
			Nt = o.dataZoomBottom,
			Et = void 0 === Nt ? 20 : Nt,
			Rt = a(o, S),
			Vt = {
				title: At,
				grid: v(jt),
				legend: h({ show: Q, type: Y, position: xt, color: tt }),
				tooltip: p({ trigger: 'axis' }),
				xAxis: b({
					name: ct,
					tick: !1,
					labelInterval: yt,
					labelMargin: 8,
					axisLabelFormatter: k,
					rotate: ot,
					axisLabelFontSize: nt,
					axisCustom: bt,
					color: Pt,
				}),
				yAxis: b({
					name: vt,
					show: J,
					type: Ot,
					scale: !1,
					splitLine: St,
					tick: !1,
					axis: !1,
					axisLabelFormatter: F,
					rotate: at,
					axisLabelFontSize: st,
					axisCustom: ft,
					color: It,
				}),
				color: N,
				dataZoom: {
					show: Bt,
					type: Wt,
					realtime: !0,
					start: 0,
					end: 100,
					height: 12,
					bottom: Et,
					borderColor: 'transparent',
					filterMode: 'filter',
					brushSelect: !1,
					handleColor: '#aab6c6',
					handleSize: 20,
					showDetail: !1,
				},
			}
		M &&
			(Vt.tooltip.trigger = function (e) {
				return M(e, t)
			}),
			j &&
				(Vt.tooltip.formatter = function (e) {
					return j(e, t)
				}),
			C &&
				(Vt.tooltip.valueFormatter = function (e) {
					return C(e, t)
				})
		var Zt = function (t) {
			return g(t.value, { type: 'auto', unit: 1, thousandSeparator: !0, suffix: '' })
		}
		return (
			x && (Zt = x),
			l && (Vt.xAxis.data = l),
			r &&
				(Vt.series = r.map(function (t, o) {
					var i,
						r,
						n = t.type,
						l = a(t, L),
						s = e(
							{
								type: n || 'bar',
								name: t.name,
								data: t.data,
								barWidth: d,
								showBackground: !!G,
								backgroundStyle: { color: G },
								label: e(
									{
										fontSize: f(Z),
										show: T && !u.includes(t.name),
										position: z,
										formatter: Zt,
										color: R[o] || N[o] || '#000',
									},
									D
								),
								itemStyle: { borderRadius: H.length ? H : [0] },
							},
							l
						)
					m.includes(t.name) &&
						!!(r = t.data).length &&
						1 == new Set(r).size &&
						(s.data.filter(function (t, e) {
							t && (i = e)
						}),
						(s.label.show = !1),
						(s.type = 'line'),
						(s.symbol = 'none'),
						(s.lineStyle = { type: 'dashed' }),
						(s.data = s.data.map(function (t, e) {
							return { value: t, label: { show: e === i }, symbol: e === i ? s.symbol : 'none' }
						})))
					return s
				})),
			{ option: Vt, eOption: Rt }
		)
	},
	I = {
		barOption: function () {
			var t = z(
					arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
				),
				e = t.option
			return (e = c(e, t.eOption))
		},
		stackBarOption: function () {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
				o = e.stackValues,
				i = void 0 === o ? [] : o,
				r = e.stackStrategy,
				n = void 0 === r ? 'samesign' : r,
				l = a(e, A),
				s = z(t, l),
				d = s.option,
				u = s.eOption
			return (
				d.series.forEach(function (t, e) {
					;(t.stack = i[e] || 'stack'), (t.stackStrategy = n)
				}),
				(d = c(d, u))
			)
		},
		heapStackBarOption: function () {
			var t,
				e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
			o.stackValues, o.stackStrategy
			var i = a(o, k),
				n = z(e, i),
				l = n.option,
				s = n.eOption,
				d = null === (t = e.data[0]) || void 0 === t ? void 0 : t.commonData,
				u = function (t) {
					null == e ||
						e.axisData.map(function (e, i) {
							e == d[t] &&
								d.stackIdent.map(function (t, e) {
									var a = []
									a.push.apply(a, r(new Array(d.stackIdent.length).fill(0))),
										a.splice(i, 1, d.stackData[e]),
										l.series.push({
											type: 'bar',
											name: t,
											stack: 'total',
											data: a,
											barWidth: o.barWidth,
											barGap: '-100%',
											label: { fontSize: 10, show: !1, position: 'outside', color: '#49a8fc' },
										})
								})
						})
				}
			for (var v in d) u(v)
			return (l = c(l, s))
		},
		stackTotalBarOption: function () {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
				i = o.order,
				r = void 0 === i ? 'ascending' : i,
				n = o.stackStrategy,
				l = void 0 === n ? 'samesign' : n,
				s = a(o, O),
				d = z(t, s),
				u = d.option,
				v = d.eOption
			if (
				((u.legend.show = !1),
				(u.tooltip = {
					trigger: 'axis',
					axisPointer: { type: 'shadow' },
					formatter: function (t) {
						var e = ''
						return (
							t.map(function (t) {
								'-' !== t.value && (e = t.name + '：' + t.value)
							}),
							e
						)
					},
				}),
				u.series && u.series.length > 0 && u.series[0].data && u.series[0].data.length > 0)
			) {
				var p = u.series[0],
					b = u.series[0].data,
					h = b.length,
					f = [],
					g = 0
				'ascending' == r
					? b.map(function (t, e) {
							e == h - 1 && (g = 0), (f[e] = g), (g += parseFloat(t))
					  })
					: b.map(function (t, e) {
							e >= 1 ? ((g -= parseFloat(t)), (f[e] = g)) : ((f[e] = 0), (g = t))
					  }),
					u.series[0].data.map(function (t, o) {
						var i = Array(h).fill('-')
						;(i[o] = t),
							(u.series[0] = e(
								e({}, p),
								{},
								{
									stack: 'stack',
									stackStrategy: l,
									label: { show: !1 },
									name: '',
									silent: !0,
									itemStyle: { borderColor: 'transparent', color: 'transparent' },
									emphasis: { itemStyle: { borderColor: 'transparent', color: 'transparent' } },
									data: f,
								}
							)),
							(u.series[o + 1] = e(e({}, p), {}, { stack: 'stack', stackStrategy: l, data: i }))
					})
			}
			return (u = c(u, v))
		},
		horizontalBarOption: function () {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
				o = e.dataLabelPosition,
				i = void 0 === o ? 'right' : o,
				r = e.yInverse,
				n = void 0 !== r && r,
				l = a(e, F),
				s = z(t, l),
				d = s.option,
				u = s.eOption,
				v = d,
				p = v.xAxis,
				b = v.yAxis
			return (
				(d.xAxis = b),
				(d.yAxis = p),
				(d.yAxis.inverse = n),
				d.series.forEach(function (t) {
					t.label.position = i
				}),
				(d = c(d, u))
			)
		},
		horizontalStackBarOption: function () {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
				o = e.dataLabelPosition,
				i = void 0 === o ? 'outside' : o,
				r = e.stackStrategy,
				n = void 0 === r ? 'samesign' : r,
				l = e.stackValues,
				s = void 0 === l ? [] : l,
				d = e.yInverse,
				u = void 0 !== d && d,
				v = a(e, j),
				p = z(t, v),
				b = p.option,
				h = p.eOption,
				f = b,
				g = f.xAxis,
				y = f.yAxis
			return (
				(b.xAxis = y),
				(b.yAxis = g),
				(b.yAxis.inverse = u),
				b.series.forEach(function (t, e) {
					;(t.stack = s[e] || 'stack'), (t.stackStrategy = n), (t.label.position = i)
				}),
				(b = c(b, h))
			)
		},
		pictorialBarOption: function () {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
				r = t.data,
				n = void 0 === r ? [] : r,
				l = t.axisData,
				s = void 0 === l ? [] : l,
				d = o.barWidth,
				u = void 0 === d ? 10 : d,
				v = o.hideDataLabel,
				b = void 0 === v ? [] : v,
				y = o.dataLabelFormatter,
				m = o.tooltipFormatter,
				x = o.dataLabelPosition,
				w = void 0 === x ? 'outside' : x,
				S = o.dataLabelShow,
				L = void 0 === S || S,
				A = o.dataLabelOpt,
				k = void 0 === A ? {} : A,
				O = o.color,
				F = void 0 === O ? [] : O,
				j = o.labelColor,
				P = void 0 === j ? [] : j,
				z = o.labelFontSize,
				I = void 0 === z ? 10 : z,
				T = o.tooltipTrigger,
				B = void 0 === T ? 'axis' : T,
				D = o.barBackgroundColor,
				W = void 0 === D ? '' : D,
				N = o.barBorderRadius,
				E = void 0 === N ? [] : N,
				R = o.legendShow,
				V = void 0 === R || R,
				Z = o.legendType,
				M = void 0 === Z ? 'plain' : Z,
				$ = o.rightDataLabel,
				G = void 0 === $ ? [] : $,
				U = o.lineDataLabel,
				H = void 0 === U ? [] : U,
				q = a(o, C),
				J = {
					grid: [
						{ left: 15, top: 20, bottom: 50, width: '38%' },
						{ right: 25, top: 20, bottom: 50, width: '38%' },
					],
					legend: h({ show: V, type: M }),
					tooltip: p({ trigger: B }),
					color: F,
					xAxis: [
						{
							type: 'value',
							inverse: !0,
							splitLine: { show: !1 },
							axisLabel: { show: !1 },
							axisLine: { show: !1 },
							axisTick: { show: !1 },
						},
						{
							type: 'value',
							inverse: !1,
							gridIndex: 1,
							splitLine: { show: !1 },
							axisLabel: { show: !1 },
							axisLine: { show: !1 },
							axisTick: { show: !1 },
						},
					],
					yAxis: [
						{
							position: 'right',
							data: s,
							type: 'category',
							axisLabel: { show: !0 },
							axisLine: { show: !1 },
							splitLine: { show: !1 },
							axisTick: { show: !1 },
							inverse: !0,
						},
						{
							type: 'category',
							data: s,
							axisLabel: { color: 'transparent' },
							axisLine: { show: !1 },
							splitLine: { show: !1 },
							axisTick: { show: !1 },
							inverse: !0,
							gridIndex: 1,
						},
					],
				},
				K = function (t) {
					return g(t.value, { type: 'auto', unit: 1, thousandSeparator: !0, suffix: '' })
				}
			return (
				m &&
					(J.tooltip.formatter = function (e) {
						return m(e, t)
					}),
				y && (K = y),
				n &&
					(J.series = n.map(function (t, o) {
						var a = i(
								{},
								((function (t) {
									if (null == t) throw new TypeError('Cannot destructure ' + t)
								})(t),
								t)
							),
							r = e(
								{
									type: H.includes(t.name) ? 'line' : 'bar',
									name: t.name,
									data: t.data,
									barWidth: u,
									showBackground: !!W,
									backgroundStyle: { color: W },
									symbol: 'none',
									label: e(
										{
											fontSize: f(I),
											show: L && !b.includes(t.name),
											position: w,
											formatter: K,
											color: P[o] || F[o] || '#000',
										},
										k
									),
									itemStyle: { borderRadius: E.length ? E : [0] },
								},
								a
							)
						return G.length > 0 && G.includes(t.name) && ((r.xAxisIndex = 1), (r.yAxisIndex = 1)), r
					})),
				(J = c(J, q))
			)
		},
		doubleStackBar: function () {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
				i = o.dataLabelShow,
				r = void 0 !== i && i,
				n = a(o, P)
			t.data = t.data.map(function (e, o) {
				return (
					o < t.data.length - 1
						? ((e.xAxisIndex = 0), (e.yAxisIndex = 0), (e.stack = 'Total'), (e.z = 2))
						: ((e.xAxisIndex = 1),
						  (e.yAxisIndex = 0),
						  (e.z = 1),
						  (e.barWidth = n.barWidth + 5),
						  (e.color = '#ccc'),
						  (e.label = { show: !1 })),
					e
				)
			})
			var l = z(t, e({ dataLabelShow: r }, n)),
				s = l.option,
				d = l.eOption,
				u = s.xAxis,
				v = s.yAxis
			return (
				(s.xAxis = [
					u,
					e(e({}, u), {}, { axisLabel: { show: !1 }, axisLine: { show: !1 }, axisPointer: { label: { show: !1 } } }),
				]),
				(s.yAxis = [v, v]),
				(s = c(s, d))
			)
		},
	}
module.exports = I
//# sourceMappingURL=index.cjs.js.map
