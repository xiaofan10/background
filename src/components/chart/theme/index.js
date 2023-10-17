import dark from './dark.js'
import infographic from './infographic.js'
import base from './base.js'

export const THEMES = {
	base,
	dark,
	infographic,
}

export function registerTheme(echarts) {
	for (let key in THEMES) {
		echarts.registerTheme(key, THEMES[key].theme)
	}
}
