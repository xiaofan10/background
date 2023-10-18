<template>
	<h1>Minimal Vue Webpack</h1>
	<div ref="sheet" class="sheet" />
</template>

<script>
import * as echarts from 'echarts'

import chartOption from 'zl-chart'
// import chartOption from '../components/chart/index'
import { THEMES } from '../components/chart/theme/index'
import { defineComponent, ref } from 'vue'
const { barOption } = chartOption
const data = {
	data: [{ data: [120, 200, 150, 80, 70, 110, 130] }],
	axisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
}
export default defineComponent({
	name: 'App',
	setup() {
		const sheet = ref(null)
		const chart = echarts.init(sheet.value)
		const color = THEMES['base'].color
		const opt = barOption(data, { color })
		chart.setOption(opt)
	},
})
</script>

<style lang="less">
h1 {
	color: #f0f;
}
.sheet {
	width: 400px;
	height: 400px;
}
</style>
