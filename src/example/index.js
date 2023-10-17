import * as echarts from 'echarts'

import chartOption from '../../lib/index.esm'
// import chartOption from '../components/chart/index'
import { THEMES } from '../components/chart/theme/index'
const { barOption } = chartOption
const data = {
	data: [{ data: [120, 200, 150, 80, 70, 110, 130] }],
	axisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
}

const el = document.createElement('div')
el.id = 'chart'
el.style.cssText = 'width: 400px; height: 400px;'
document.body.appendChild(el)

const chart = echarts.init(el)
const color = THEMES['base'].color
const opt = barOption(data, { color })
chart.setOption(opt)
