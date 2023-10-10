/******/ ;(() => {
	// webpackBootstrap
	/******/ 'use strict'
	/******/ var __webpack_modules__ = {
		/***/ 103: /***/ (module, __webpack_exports__, __webpack_require__) => {
			/* harmony export */ __webpack_require__.d(__webpack_exports__, {
				/* harmony export */ Z: () => __WEBPACK_DEFAULT_EXPORT__,
				/* harmony export */
			})
			/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(81)
			/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default =
				/*#__PURE__*/ __webpack_require__.n(
					_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__
				)
			/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ =
				__webpack_require__(645)
			/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default =
				/*#__PURE__*/ __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)
			// Imports

			var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(
				_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()
			)
			// Module
			___CSS_LOADER_EXPORT___.push([
				module.id,
				`.bg1 {
  background: #000;
  color: #fff;
  width: 100%;
  height: 100%;
}
.bg1 canvas {
  position: absolute;
  width: 100%;
  height: 100%;
}
`,
				'',
			])
			// Exports
			/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___

			/***/
		},

		/***/ 645: /***/ (module) => {
			/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
			module.exports = function (cssWithMappingToString) {
				var list = []

				// return the list of modules as css string
				list.toString = function toString() {
					return this.map(function (item) {
						var content = ''
						var needLayer = typeof item[5] !== 'undefined'
						if (item[4]) {
							content += '@supports ('.concat(item[4], ') {')
						}
						if (item[2]) {
							content += '@media '.concat(item[2], ' {')
						}
						if (needLayer) {
							content += '@layer'.concat(item[5].length > 0 ? ' '.concat(item[5]) : '', ' {')
						}
						content += cssWithMappingToString(item)
						if (needLayer) {
							content += '}'
						}
						if (item[2]) {
							content += '}'
						}
						if (item[4]) {
							content += '}'
						}
						return content
					}).join('')
				}

				// import a list of modules into the list
				list.i = function i(modules, media, dedupe, supports, layer) {
					if (typeof modules === 'string') {
						modules = [[null, modules, undefined]]
					}
					var alreadyImportedModules = {}
					if (dedupe) {
						for (var k = 0; k < this.length; k++) {
							var id = this[k][0]
							if (id != null) {
								alreadyImportedModules[id] = true
							}
						}
					}
					for (var _k = 0; _k < modules.length; _k++) {
						var item = [].concat(modules[_k])
						if (dedupe && alreadyImportedModules[item[0]]) {
							continue
						}
						if (typeof layer !== 'undefined') {
							if (typeof item[5] === 'undefined') {
								item[5] = layer
							} else {
								item[1] = '@layer'.concat(item[5].length > 0 ? ' '.concat(item[5]) : '', ' {').concat(item[1], '}')
								item[5] = layer
							}
						}
						if (media) {
							if (!item[2]) {
								item[2] = media
							} else {
								item[1] = '@media '.concat(item[2], ' {').concat(item[1], '}')
								item[2] = media
							}
						}
						if (supports) {
							if (!item[4]) {
								item[4] = ''.concat(supports)
							} else {
								item[1] = '@supports ('.concat(item[4], ') {').concat(item[1], '}')
								item[4] = supports
							}
						}
						list.push(item)
					}
				}
				return list
			}

			/***/
		},

		/***/ 81: /***/ (module) => {
			module.exports = function (i) {
				return i[1]
			}

			/***/
		},

		/***/ 379: /***/ (module) => {
			var stylesInDOM = []
			function getIndexByIdentifier(identifier) {
				var result = -1
				for (var i = 0; i < stylesInDOM.length; i++) {
					if (stylesInDOM[i].identifier === identifier) {
						result = i
						break
					}
				}
				return result
			}
			function modulesToDom(list, options) {
				var idCountMap = {}
				var identifiers = []
				for (var i = 0; i < list.length; i++) {
					var item = list[i]
					var id = options.base ? item[0] + options.base : item[0]
					var count = idCountMap[id] || 0
					var identifier = ''.concat(id, ' ').concat(count)
					idCountMap[id] = count + 1
					var indexByIdentifier = getIndexByIdentifier(identifier)
					var obj = {
						css: item[1],
						media: item[2],
						sourceMap: item[3],
						supports: item[4],
						layer: item[5],
					}
					if (indexByIdentifier !== -1) {
						stylesInDOM[indexByIdentifier].references++
						stylesInDOM[indexByIdentifier].updater(obj)
					} else {
						var updater = addElementStyle(obj, options)
						options.byIndex = i
						stylesInDOM.splice(i, 0, {
							identifier: identifier,
							updater: updater,
							references: 1,
						})
					}
					identifiers.push(identifier)
				}
				return identifiers
			}
			function addElementStyle(obj, options) {
				var api = options.domAPI(options)
				api.update(obj)
				var updater = function updater(newObj) {
					if (newObj) {
						if (
							newObj.css === obj.css &&
							newObj.media === obj.media &&
							newObj.sourceMap === obj.sourceMap &&
							newObj.supports === obj.supports &&
							newObj.layer === obj.layer
						) {
							return
						}
						api.update((obj = newObj))
					} else {
						api.remove()
					}
				}
				return updater
			}
			module.exports = function (list, options) {
				options = options || {}
				list = list || []
				var lastIdentifiers = modulesToDom(list, options)
				return function update(newList) {
					newList = newList || []
					for (var i = 0; i < lastIdentifiers.length; i++) {
						var identifier = lastIdentifiers[i]
						var index = getIndexByIdentifier(identifier)
						stylesInDOM[index].references--
					}
					var newLastIdentifiers = modulesToDom(newList, options)
					for (var _i = 0; _i < lastIdentifiers.length; _i++) {
						var _identifier = lastIdentifiers[_i]
						var _index = getIndexByIdentifier(_identifier)
						if (stylesInDOM[_index].references === 0) {
							stylesInDOM[_index].updater()
							stylesInDOM.splice(_index, 1)
						}
					}
					lastIdentifiers = newLastIdentifiers
				}
			}

			/***/
		},

		/***/ 569: /***/ (module) => {
			var memo = {}

			/* istanbul ignore next  */
			function getTarget(target) {
				if (typeof memo[target] === 'undefined') {
					var styleTarget = document.querySelector(target)

					// Special case to return head of iframe instead of iframe itself
					if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
						try {
							// This will throw an exception if access to iframe is blocked
							// due to cross-origin restrictions
							styleTarget = styleTarget.contentDocument.head
						} catch (e) {
							// istanbul ignore next
							styleTarget = null
						}
					}
					memo[target] = styleTarget
				}
				return memo[target]
			}

			/* istanbul ignore next  */
			function insertBySelector(insert, style) {
				var target = getTarget(insert)
				if (!target) {
					throw new Error(
						"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
					)
				}
				target.appendChild(style)
			}
			module.exports = insertBySelector

			/***/
		},

		/***/ 216: /***/ (module) => {
			/* istanbul ignore next  */
			function insertStyleElement(options) {
				var element = document.createElement('style')
				options.setAttributes(element, options.attributes)
				options.insert(element, options.options)
				return element
			}
			module.exports = insertStyleElement

			/***/
		},

		/***/ 565: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			/* istanbul ignore next  */
			function setAttributesWithoutAttributes(styleElement) {
				var nonce = true ? __webpack_require__.nc : 0
				if (nonce) {
					styleElement.setAttribute('nonce', nonce)
				}
			}
			module.exports = setAttributesWithoutAttributes

			/***/
		},

		/***/ 795: /***/ (module) => {
			/* istanbul ignore next  */
			function apply(styleElement, options, obj) {
				var css = ''
				if (obj.supports) {
					css += '@supports ('.concat(obj.supports, ') {')
				}
				if (obj.media) {
					css += '@media '.concat(obj.media, ' {')
				}
				var needLayer = typeof obj.layer !== 'undefined'
				if (needLayer) {
					css += '@layer'.concat(obj.layer.length > 0 ? ' '.concat(obj.layer) : '', ' {')
				}
				css += obj.css
				if (needLayer) {
					css += '}'
				}
				if (obj.media) {
					css += '}'
				}
				if (obj.supports) {
					css += '}'
				}
				var sourceMap = obj.sourceMap
				if (sourceMap && typeof btoa !== 'undefined') {
					css += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
						btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))),
						' */'
					)
				}

				// For old IE
				/* istanbul ignore if  */
				options.styleTagTransform(css, styleElement, options.options)
			}
			function removeStyleElement(styleElement) {
				// istanbul ignore if
				if (styleElement.parentNode === null) {
					return false
				}
				styleElement.parentNode.removeChild(styleElement)
			}

			/* istanbul ignore next  */
			function domAPI(options) {
				if (typeof document === 'undefined') {
					return {
						update: function update() {},
						remove: function remove() {},
					}
				}
				var styleElement = options.insertStyleElement(options)
				return {
					update: function update(obj) {
						apply(styleElement, options, obj)
					},
					remove: function remove() {
						removeStyleElement(styleElement)
					},
				}
			}
			module.exports = domAPI

			/***/
		},

		/***/ 589: /***/ (module) => {
			/* istanbul ignore next  */
			function styleTagTransform(css, styleElement) {
				if (styleElement.styleSheet) {
					styleElement.styleSheet.cssText = css
				} else {
					while (styleElement.firstChild) {
						styleElement.removeChild(styleElement.firstChild)
					}
					styleElement.appendChild(document.createTextNode(css))
				}
			}
			module.exports = styleTagTransform

			/***/
		},

		/******/
	}
	/************************************************************************/
	/******/ // The module cache
	/******/ var __webpack_module_cache__ = {}
	/******/
	/******/ // The require function
	/******/ function __webpack_require__(moduleId) {
		/******/ // Check if module is in cache
		/******/ var cachedModule = __webpack_module_cache__[moduleId]
		/******/ if (cachedModule !== undefined) {
			/******/ return cachedModule.exports
			/******/
		}
		/******/ // Create a new module (and put it into the cache)
		/******/ var module = (__webpack_module_cache__[moduleId] = {
			/******/ id: moduleId,
			/******/ // no module.loaded needed
			/******/ exports: {},
			/******/
		})
		/******/
		/******/ // Execute the module function
		/******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__)
		/******/
		/******/ // Return the exports of the module
		/******/ return module.exports
		/******/
	}
	/******/
	/************************************************************************/
	/******/ /* webpack/runtime/compat get default export */
	/******/ ;(() => {
		/******/ // getDefaultExport function for compatibility with non-harmony modules
		/******/ __webpack_require__.n = (module) => {
			/******/ var getter = module && module.__esModule ? /******/ () => module['default'] : /******/ () => module
			/******/ __webpack_require__.d(getter, { a: getter })
			/******/ return getter
			/******/
		}
		/******/
	})()
	/******/
	/******/ /* webpack/runtime/define property getters */
	/******/ ;(() => {
		/******/ // define getter functions for harmony exports
		/******/ __webpack_require__.d = (exports, definition) => {
			/******/ for (var key in definition) {
				/******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
					/******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] })
					/******/
				}
				/******/
			}
			/******/
		}
		/******/
	})()
	/******/
	/******/ /* webpack/runtime/hasOwnProperty shorthand */
	/******/ ;(() => {
		/******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
		/******/
	})()
	/******/
	/******/ /* webpack/runtime/nonce */
	/******/ ;(() => {
		/******/ __webpack_require__.nc = undefined
		/******/
	})()
	/******/
	/************************************************************************/
	var __webpack_exports__ = {}
	// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
	;(() => {
		// UNUSED EXPORTS: default

		// CONCATENATED MODULE: ./node_modules/simplex-noise/dist/esm/simplex-noise.js
		/*
 * A fast javascript implementation of simplex noise by Jonas Wagner

Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
Better rank ordering method by Stefan Gustavson in 2012.

 Copyright (c) 2021 Jonas Wagner

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
		const F2 = 0.5 * (Math.sqrt(3.0) - 1.0)
		const G2 = (3.0 - Math.sqrt(3.0)) / 6.0
		const F3 = 1.0 / 3.0
		const G3 = 1.0 / 6.0
		const F4 = (Math.sqrt(5.0) - 1.0) / 4.0
		const G4 = (5.0 - Math.sqrt(5.0)) / 20.0
		const grad3 = new Float32Array([
			1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0,
			-1, -1,
		])
		const grad4 = new Float32Array([
			0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0,
			1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0, 1,
			1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1,
			-1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0,
		])
		/** Deterministic simplex noise generator suitable for 2D, 3D and 4D spaces. */
		class SimplexNoise {
			/**
			 * Creates a new `SimplexNoise` instance.
			 * This involves some setup. You can save a few cpu cycles by reusing the same instance.
			 * @param randomOrSeed A random number generator or a seed (string|number).
			 * Defaults to Math.random (random irreproducible initialization).
			 */
			constructor(randomOrSeed = Math.random) {
				const random = typeof randomOrSeed == 'function' ? randomOrSeed : alea(randomOrSeed)
				this.p = buildPermutationTable(random)
				this.perm = new Uint8Array(512)
				this.permMod12 = new Uint8Array(512)
				for (let i = 0; i < 512; i++) {
					this.perm[i] = this.p[i & 255]
					this.permMod12[i] = this.perm[i] % 12
				}
			}
			/**
			 * Samples the noise field in 2 dimensions
			 * @param x
			 * @param y
			 * @returns a number in the interval [-1, 1]
			 */
			noise2D(x, y) {
				const permMod12 = this.permMod12
				const perm = this.perm
				let n0 = 0 // Noise contributions from the three corners
				let n1 = 0
				let n2 = 0
				// Skew the input space to determine which simplex cell we're in
				const s = (x + y) * F2 // Hairy factor for 2D
				const i = Math.floor(x + s)
				const j = Math.floor(y + s)
				const t = (i + j) * G2
				const X0 = i - t // Unskew the cell origin back to (x,y) space
				const Y0 = j - t
				const x0 = x - X0 // The x,y distances from the cell origin
				const y0 = y - Y0
				// For the 2D case, the simplex shape is an equilateral triangle.
				// Determine which simplex we are in.
				let i1, j1 // Offsets for second (middle) corner of simplex in (i,j) coords
				if (x0 > y0) {
					i1 = 1
					j1 = 0
				} // lower triangle, XY order: (0,0)->(1,0)->(1,1)
				else {
					i1 = 0
					j1 = 1
				} // upper triangle, YX order: (0,0)->(0,1)->(1,1)
				// A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
				// a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
				// c = (3-sqrt(3))/6
				const x1 = x0 - i1 + G2 // Offsets for middle corner in (x,y) unskewed coords
				const y1 = y0 - j1 + G2
				const x2 = x0 - 1.0 + 2.0 * G2 // Offsets for last corner in (x,y) unskewed coords
				const y2 = y0 - 1.0 + 2.0 * G2
				// Work out the hashed gradient indices of the three simplex corners
				const ii = i & 255
				const jj = j & 255
				// Calculate the contribution from the three corners
				let t0 = 0.5 - x0 * x0 - y0 * y0
				if (t0 >= 0) {
					const gi0 = permMod12[ii + perm[jj]] * 3
					t0 *= t0
					n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0) // (x,y) of grad3 used for 2D gradient
				}
				let t1 = 0.5 - x1 * x1 - y1 * y1
				if (t1 >= 0) {
					const gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3
					t1 *= t1
					n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1)
				}
				let t2 = 0.5 - x2 * x2 - y2 * y2
				if (t2 >= 0) {
					const gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3
					t2 *= t2
					n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2)
				}
				// Add contributions from each corner to get the final noise value.
				// The result is scaled to return values in the interval [-1,1].
				return 70.0 * (n0 + n1 + n2)
			}
			/**
			 * Samples the noise field in 3 dimensions
			 * @param x
			 * @param y
			 * @param z
			 * @returns a number in the interval [-1, 1]
			 */
			noise3D(x, y, z) {
				const permMod12 = this.permMod12
				const perm = this.perm
				let n0, n1, n2, n3 // Noise contributions from the four corners
				// Skew the input space to determine which simplex cell we're in
				const s = (x + y + z) * F3 // Very nice and simple skew factor for 3D
				const i = Math.floor(x + s)
				const j = Math.floor(y + s)
				const k = Math.floor(z + s)
				const t = (i + j + k) * G3
				const X0 = i - t // Unskew the cell origin back to (x,y,z) space
				const Y0 = j - t
				const Z0 = k - t
				const x0 = x - X0 // The x,y,z distances from the cell origin
				const y0 = y - Y0
				const z0 = z - Z0
				// For the 3D case, the simplex shape is a slightly irregular tetrahedron.
				// Determine which simplex we are in.
				let i1, j1, k1 // Offsets for second corner of simplex in (i,j,k) coords
				let i2, j2, k2 // Offsets for third corner of simplex in (i,j,k) coords
				if (x0 >= y0) {
					if (y0 >= z0) {
						i1 = 1
						j1 = 0
						k1 = 0
						i2 = 1
						j2 = 1
						k2 = 0
					} // X Y Z order
					else if (x0 >= z0) {
						i1 = 1
						j1 = 0
						k1 = 0
						i2 = 1
						j2 = 0
						k2 = 1
					} // X Z Y order
					else {
						i1 = 0
						j1 = 0
						k1 = 1
						i2 = 1
						j2 = 0
						k2 = 1
					} // Z X Y order
				} else {
					// x0<y0
					if (y0 < z0) {
						i1 = 0
						j1 = 0
						k1 = 1
						i2 = 0
						j2 = 1
						k2 = 1
					} // Z Y X order
					else if (x0 < z0) {
						i1 = 0
						j1 = 1
						k1 = 0
						i2 = 0
						j2 = 1
						k2 = 1
					} // Y Z X order
					else {
						i1 = 0
						j1 = 1
						k1 = 0
						i2 = 1
						j2 = 1
						k2 = 0
					} // Y X Z order
				}
				// A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
				// a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
				// a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
				// c = 1/6.
				const x1 = x0 - i1 + G3 // Offsets for second corner in (x,y,z) coords
				const y1 = y0 - j1 + G3
				const z1 = z0 - k1 + G3
				const x2 = x0 - i2 + 2.0 * G3 // Offsets for third corner in (x,y,z) coords
				const y2 = y0 - j2 + 2.0 * G3
				const z2 = z0 - k2 + 2.0 * G3
				const x3 = x0 - 1.0 + 3.0 * G3 // Offsets for last corner in (x,y,z) coords
				const y3 = y0 - 1.0 + 3.0 * G3
				const z3 = z0 - 1.0 + 3.0 * G3
				// Work out the hashed gradient indices of the four simplex corners
				const ii = i & 255
				const jj = j & 255
				const kk = k & 255
				// Calculate the contribution from the four corners
				let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0
				if (t0 < 0) n0 = 0.0
				else {
					const gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3
					t0 *= t0
					n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0)
				}
				let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1
				if (t1 < 0) n1 = 0.0
				else {
					const gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3
					t1 *= t1
					n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1)
				}
				let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2
				if (t2 < 0) n2 = 0.0
				else {
					const gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3
					t2 *= t2
					n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2)
				}
				let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3
				if (t3 < 0) n3 = 0.0
				else {
					const gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3
					t3 *= t3
					n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3)
				}
				// Add contributions from each corner to get the final noise value.
				// The result is scaled to stay just inside [-1,1]
				return 32.0 * (n0 + n1 + n2 + n3)
			}
			/**
			 * Samples the noise field in 4 dimensions
			 * @param x
			 * @param y
			 * @param z
			 * @returns a number in the interval [-1, 1]
			 */
			noise4D(x, y, z, w) {
				const perm = this.perm
				let n0, n1, n2, n3, n4 // Noise contributions from the five corners
				// Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
				const s = (x + y + z + w) * F4 // Factor for 4D skewing
				const i = Math.floor(x + s)
				const j = Math.floor(y + s)
				const k = Math.floor(z + s)
				const l = Math.floor(w + s)
				const t = (i + j + k + l) * G4 // Factor for 4D unskewing
				const X0 = i - t // Unskew the cell origin back to (x,y,z,w) space
				const Y0 = j - t
				const Z0 = k - t
				const W0 = l - t
				const x0 = x - X0 // The x,y,z,w distances from the cell origin
				const y0 = y - Y0
				const z0 = z - Z0
				const w0 = w - W0
				// For the 4D case, the simplex is a 4D shape I won't even try to describe.
				// To find out which of the 24 possible simplices we're in, we need to
				// determine the magnitude ordering of x0, y0, z0 and w0.
				// Six pair-wise comparisons are performed between each possible pair
				// of the four coordinates, and the results are used to rank the numbers.
				let rankx = 0
				let ranky = 0
				let rankz = 0
				let rankw = 0
				if (x0 > y0) rankx++
				else ranky++
				if (x0 > z0) rankx++
				else rankz++
				if (x0 > w0) rankx++
				else rankw++
				if (y0 > z0) ranky++
				else rankz++
				if (y0 > w0) ranky++
				else rankw++
				if (z0 > w0) rankz++
				else rankw++
				// simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
				// Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
				// impossible. Only the 24 indices which have non-zero entries make any sense.
				// We use a thresholding to set the coordinates in turn from the largest magnitude.
				// Rank 3 denotes the largest coordinate.
				// Rank 2 denotes the second largest coordinate.
				// Rank 1 denotes the second smallest coordinate.
				// The integer offsets for the second simplex corner
				const i1 = rankx >= 3 ? 1 : 0
				const j1 = ranky >= 3 ? 1 : 0
				const k1 = rankz >= 3 ? 1 : 0
				const l1 = rankw >= 3 ? 1 : 0
				// The integer offsets for the third simplex corner
				const i2 = rankx >= 2 ? 1 : 0
				const j2 = ranky >= 2 ? 1 : 0
				const k2 = rankz >= 2 ? 1 : 0
				const l2 = rankw >= 2 ? 1 : 0
				// The integer offsets for the fourth simplex corner
				const i3 = rankx >= 1 ? 1 : 0
				const j3 = ranky >= 1 ? 1 : 0
				const k3 = rankz >= 1 ? 1 : 0
				const l3 = rankw >= 1 ? 1 : 0
				// The fifth corner has all coordinate offsets = 1, so no need to compute that.
				const x1 = x0 - i1 + G4 // Offsets for second corner in (x,y,z,w) coords
				const y1 = y0 - j1 + G4
				const z1 = z0 - k1 + G4
				const w1 = w0 - l1 + G4
				const x2 = x0 - i2 + 2.0 * G4 // Offsets for third corner in (x,y,z,w) coords
				const y2 = y0 - j2 + 2.0 * G4
				const z2 = z0 - k2 + 2.0 * G4
				const w2 = w0 - l2 + 2.0 * G4
				const x3 = x0 - i3 + 3.0 * G4 // Offsets for fourth corner in (x,y,z,w) coords
				const y3 = y0 - j3 + 3.0 * G4
				const z3 = z0 - k3 + 3.0 * G4
				const w3 = w0 - l3 + 3.0 * G4
				const x4 = x0 - 1.0 + 4.0 * G4 // Offsets for last corner in (x,y,z,w) coords
				const y4 = y0 - 1.0 + 4.0 * G4
				const z4 = z0 - 1.0 + 4.0 * G4
				const w4 = w0 - 1.0 + 4.0 * G4
				// Work out the hashed gradient indices of the five simplex corners
				const ii = i & 255
				const jj = j & 255
				const kk = k & 255
				const ll = l & 255
				// Calculate the contribution from the five corners
				let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0
				if (t0 < 0) n0 = 0.0
				else {
					const gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4
					t0 *= t0
					n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0)
				}
				let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1
				if (t1 < 0) n1 = 0.0
				else {
					const gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4
					t1 *= t1
					n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1)
				}
				let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2
				if (t2 < 0) n2 = 0.0
				else {
					const gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4
					t2 *= t2
					n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2)
				}
				let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3
				if (t3 < 0) n3 = 0.0
				else {
					const gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4
					t3 *= t3
					n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3)
				}
				let t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4
				if (t4 < 0) n4 = 0.0
				else {
					const gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4
					t4 *= t4
					n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4)
				}
				// Sum up and scale the result to cover the range [-1,1]
				return 27.0 * (n0 + n1 + n2 + n3 + n4)
			}
		}
		/* harmony default export */ const simplex_noise = SimplexNoise
		/**
		 * Builds a random permutation table.
		 * This is exported only for (internal) testing purposes.
		 * Do not rely on this export.
		 * @private
		 */
		function buildPermutationTable(random) {
			const p = new Uint8Array(256)
			for (let i = 0; i < 256; i++) {
				p[i] = i
			}
			for (let i = 0; i < 255; i++) {
				const r = i + ~~(random() * (256 - i))
				const aux = p[i]
				p[i] = p[r]
				p[r] = aux
			}
			return p
		}
		/*
The ALEA PRNG and masher code used by simplex-noise.js
is based on code by Johannes Baagøe, modified by Jonas Wagner.
See alea.md for the full license.
*/
		function alea(seed) {
			let s0 = 0
			let s1 = 0
			let s2 = 0
			let c = 1
			const mash = masher()
			s0 = mash(' ')
			s1 = mash(' ')
			s2 = mash(' ')
			s0 -= mash(seed)
			if (s0 < 0) {
				s0 += 1
			}
			s1 -= mash(seed)
			if (s1 < 0) {
				s1 += 1
			}
			s2 -= mash(seed)
			if (s2 < 0) {
				s2 += 1
			}
			return function () {
				const t = 2091639 * s0 + c * 2.3283064365386963e-10 // 2^-32
				s0 = s1
				s1 = s2
				return (s2 = t - (c = t | 0))
			}
		}
		function masher() {
			let n = 0xefc8249d
			return function (data) {
				data = data.toString()
				for (let i = 0; i < data.length; i++) {
					n += data.charCodeAt(i)
					let h = 0.02519603282416938 * n
					n = h >>> 0
					h -= n
					h *= n
					n = h >>> 0
					h -= n
					n += h * 0x100000000 // 2^32
				}
				return (n >>> 0) * 2.3283064365386963e-10 // 2^-32
			}
		} // CONCATENATED MODULE: ./src/components/bg1/util.js
		//# sourceMappingURL=simplex-noise.js.map
		const util = {
			each: function (object, callback) {
				if (Object.prototype.toString.call(object) === '[object Array]')
					for (var i = 0, l = object.length; i < l; i++) callback(object[i], i, object)
				else for (var i in object) if (Object.prototype.hasOwnProperty.call(object, i)) callback(object[i], i, object)
			},
			extend: function () {
				for (var i = 1, a = arguments, o = a[0], s, p; (s = a[i++]); )
					for (p in s) if (Object.prototype.hasOwnProperty.call(s, p)) o[p] = s[p]
				return o
			},
			inherits: function (child, parent) {
				child.prototype = new parent()
				child.prototype.constructor = child
				child._super_ = parent.prototype
				return child
			},
			format: function (string, object) {
				var o = typeof object === 'object' ? object : arguments
				return string.replace(/{(.*?)}/g, function (m, n) {
					return typeof o[n] !== 'undefined' ? o[n] : m
				})
			},
			rand: {
				float: function (min, max) {
					return Math.random() * (max - min) + min
				},
				int: function (min, max) {
					return (Math.random() * (max - min + 1) + min) | 0
				},
				item: function (array) {
					return array[(Math.random() * array.length) | 0]
				},
				hash: function (length) {
					for (var r, s = '', l = length || 1; l--; )
						s += (r = (Math.random() * 62) | 0) < 10 ? r : String.fromCharCode(r + (r < 36 ? 87 : 29))
					return s
				},
			},
			math: {
				clamp: function (value, min, max) {
					return value < min ? min : value > max ? max : value
				},
				mod: function (value, min, max) {
					return ((value -= min) % (max - min)) + (value < 0 ? max : min)
				},
				map: function (value, min1, max1, min2, max2) {
					return ((value - min1) * (max2 - min2)) / (max1 - min1) + min2
				},
				lerp: function (value, min, max) {
					return min + value * (max - min)
				},
				angle: function (a, b, full) {
					return 2 * (a = (a < b ? b - a : a - b) % full) > full ? full - a : a
				},
			},
			str: {
				pad: function (string, length, pad) {
					var s = String(string)
					var l = Math.max(0, Math.abs(length) - s.length)
					var p = new Array(++l).join(pad != null ? pad : ' ')
					return length < 0 ? s + p : p + s
				},
			},
			array: {
				cross: function (array, callback) {
					var i,
						j,
						l = array.length
					for (i = 0; i < l; i++) for (j = i + 1; j < l; ) callback(array[i], array[j], i, j++)
					return array
				},
			},
			fn: {
				wrap: function (fn, wrapper) {
					return function () {
						return wrapper.call(this, arguments, fn)
					}
				},
				log: function (fn, logger) {
					return function () {
						logger.call(this, arguments, fn)
						return fn.apply(this, arguments)
					}
				},
			},
			color: {
				rgba: function (rgba) {
					if (typeof rgba !== 'object') rgba = arguments
					return (
						'rgba(' +
						((rgba[0] * 255 + 0.5) | 0) +
						',' +
						((rgba[1] * 255 + 0.5) | 0) +
						',' +
						((rgba[2] * 255 + 0.5) | 0) +
						',' +
						(rgba[3] != null ? rgba[3] : 1).toFixed(3) +
						')'
					)
				},
				hsla: function (hsla) {
					if (typeof hsla !== 'object') hsla = arguments
					return (
						'hsla(' +
						((hsla[0] * 360 + 0.5) | 0) +
						',' +
						((hsla[1] * 100 + 0.5) | 0) +
						'%,' +
						((hsla[2] * 100 + 0.5) | 0) +
						'%,' +
						(hsla[3] != null ? hsla[3] : 1).toFixed(3) +
						')'
					)
				},
			},
			gradient: function (colors, position) {
				var a,
					b,
					c,
					i,
					l,
					t = position
				for (i = 0; (c = colors[i++]); ) {
					if (t - c[0] >= 0 && (!a || t - c[0] < t - a[0])) a = c
					if (t - c[0] <= 0 && (!b || t - c[0] > t - b[0])) b = c
				}
				t = (t - a[0]) / (b[0] - a[0]) || 0
				for (c = [], i = 0, l = a[1].length; i < l; ) c[i] = a[1][i] + (b[1][i] - a[1][i++]) * t
				return c
			},
			loop: function (callback, interval) {
				var n = Date.now(),
					s = n,
					l = n,
					i = 0
				var loop = function () {
					!callback(i++, (n = Date.now()) - s, n - l, (l = n)) && next()
				}
				var next = interval == null ? requestAnimationFrame.bind(null, loop) : setTimeout.bind(null, loop, interval)
				return loop()
			},
			perf: function (times) {
				for (var t, f, j, i = 1, r = []; (f = arguments[i++]); ) {
					t = Date.now()
					for (j = 0; j < times; f(j++));
					r.push((Date.now() - t) / 1000)
				}
				return r
			},
			fps: (function (h, l, s) {
				return function (int) {
					l = h.push(Date.now()) - 1
					s = (l / (h[l] - h[0])) * 1000 || 0
					l > s && h.splice(0, (++l - s) | 0)
					return int ? (s + 0.5) | 0 : s
				}
			})([]),
			bind: (function (fn) {
				return {
					on: fn.bind('add'),
					off: fn.bind('remove'),
				}
			})(function (elements, events, listeners, capture) {
				var a = [].concat(elements),
					b = [].concat(events),
					c = [].concat(listeners)
				for (var k, j, i = 0; a[i]; i++)
					for (j = 0; b[j]; j++) for (k = 0; c[k]; k++) a[i][this + 'EventListener'](b[j], c[k], capture)
			}),
			ajax: (function (fn) {
				return {
					get: fn.bind(0),
					post: fn.bind(1),
				}
			})(function (url, data, callback, timeout) {
				var p,
					q = '',
					xhr = new XMLHttpRequest()
				for (p in data) if (data.hasOwnProperty(p)) q += '&' + [p, data[p]].map(encodeURIComponent).join('=')
				if (q && !this) url += ~url.indexOf('?') ? q : q.replace('&', '?')
				xhr.open(this ? 'POST' : 'GET', url, true)
				xhr.timeout = timeout ? timeout * 1000 : 0
				xhr.onreadystatechange = function () {
					this.readyState === 4 && callback(this.response, this)
				}
				if (!url.match(/^(https?:)?\/\//i)) {
					xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
					xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
				}
				xhr.send(this && q ? q.substr(1) : null)
				return xhr
			}),
			load: {
				docs: function (list, callback, progress) {
					var item,
						i,
						j = 0,
						e = function () {
							if (this.readyState !== 4) return
							list[list.indexOf(this)] = this.response
							j++
							progress && progress(j, list.length)
							j === list.length && callback(list)
						}
					progress && progress(0, list.length)
					for (i = 0; i < list.length; i++) {
						item = new XMLHttpRequest()
						item.onreadystatechange = e
						item.open('GET', list[i], true)
						item.send(null)
						list[i] = item
					}
					return list
				},
				imgs: function (list, callback, progress) {
					var item,
						i,
						j = 0,
						e = function () {
							j++
							progress && progress(j, list.length)
							j === list.length && callback(list)
						}
					progress && progress(0, list.length)
					for (i = 0; i < list.length; i++) {
						item = new Image()
						item.onload = e
						item.src = list[i]
						list[i] = item
					}
					return list
				},
			},
			select: function (selector, where) {
				if ((selector = /(^[.#]?)([\w-]+$)/.exec(selector)))
					switch (selector[1]) {
						case '#':
							return (where || document).getElementById(selector[2])
						case '.':
							return (where || document).getElementsByClassName(selector[2])
						default:
							return (where || document).getElementsByTagName(selector[2])
					}
				else return (where || document).querySelectorAll(selector)
			},
			tag: function (element, options, target, prepend) {
				var e = element,
					o = options,
					i = e || '',
					j
				if (e == null || e.nodeType == null) {
					e = document.createElement(String(i.match(/^[^#.]+/) || 'div'))
					if ((j = i.match(/#([^#.]+)/))) e.id = j[1]
					if ((j = i.match(/\.[^#.]+/g))) e.className = j.join(' ').replace(/\./g, '')
				}
				if (o != null)
					if (o.nodeType != null) e.appendChild(o)
					else if (typeof o !== 'object') e.textContent = o
					else if (o[(i = 0)]) while (o[i]) e.appendChild(o[i++])
					else for (i in o) if (o.hasOwnProperty(i)) e[i] = o[i]
				if (target)
					if (!prepend) target.appendChild(e)
					else target.insertBefore(e, target.firstChild)
				return e
			},
			breadcrump: function (element, url, sub, last, separator) {
				url = decodeURI(url || location.href)
				url = url.match(/[^?#]+/)[0].split('/')
				sub = /^[\d.]+$/.test(url[2]) ? 0 : sub
				var e,
					i,
					host = url[2].split('.')
				while (host.length) {
					e = document.createElement('a')
					e.href = url[0] + '//' + host.join('.') + '/'
					e.textContent =
						sub && host.length > sub && host[0] !== 'www' ? host.splice(0, 1) + '.' : host.splice(0).join('.')
					element.appendChild(e)
				}
				for (i = 3; url[i]; i++) {
					element.appendChild(document.createTextNode(separator || ' › '))
					e = document.createElement(!url[i + 1] && !last ? 'span' : 'a')
					if ('href' in e) e.href = encodeURI(url.slice(0, i + 1).join('/'))
					if ('href' in e && url[i + 1] != null) e.href += '/'
					e.textContent = url[i]
					element.appendChild(e)
				}
				return element
			},
			form: function (form) {
				var i,
					e,
					o = {},
					c = form.querySelectorAll('*')
				for (i = 0; (e = c[i]); i++)
					if (e.name)
						switch (e.type) {
							case 'radio':
								if (e.checked) o[e.name] = e.value
								break
							case 'checkbox':
								o[e.name] = e.checked ? 1 : 0
								break
							default:
								o[e.name] = e.value
								break
						}
				return o
			},
			favicon: function (url) {
				var e = document.head.querySelector('link[rel*=icon]')
				e && document.head.removeChild(e)
				e = document.createElement('link')
				e.rel = 'shortcut icon'
				e.href = url
				document.head.appendChild(e)
			},
		}
		/* harmony default export */ const bg1_util = util // CONCATENATED MODULE: ./src/components/bg1/vec4.js
		var vec4 = {}
		vec4.array = Float32Array || Array
		vec4.buffer = new vec4.array(4)
		vec4.get = function (a, b, c, d) {
			return vec4.set(new vec4.array(4), a, b, c, d)
		}
		vec4.set = function (out, a, b, c, d) {
			if (!out) out = new vec4.array(4)
			if (typeof a === 'object') {
				out[0] = -Infinity < a[0] && a[0] < Infinity ? a[0] : 0
				out[1] = -Infinity < a[1] && a[1] < Infinity ? a[1] : 0
				out[2] = -Infinity < a[2] && a[2] < Infinity ? a[2] : 0
				out[3] = -Infinity < a[3] && a[3] < Infinity ? a[3] : 1
			} else {
				out[0] = -Infinity < a && a < Infinity ? a : 0
				out[1] = -Infinity < b && b < Infinity ? b : 0
				out[2] = -Infinity < c && c < Infinity ? c : 0
				out[3] = -Infinity < d && d < Infinity ? d : 1
			}
			return out
		}
		vec4.equals = function (a, b) {
			if (a === b) return true
			return typeof b === 'object'
				? a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
				: a[0] === b && a[1] === b && a[2] === b
		}
		vec4.add = function (a, b, out) {
			if (!out) out = new vec4.array(4)
			if (typeof b === 'object') {
				out[0] = a[0] + b[0]
				out[1] = a[1] + b[1]
				out[2] = a[2] + b[2]
			} else {
				out[0] = a[0] + b
				out[1] = a[1] + b
				out[2] = a[2] + b
			}
			return (out[3] = a[3]), out
		}
		vec4.sub = function (a, b, out) {
			if (!out) out = new vec4.array(4)
			if (typeof b === 'object') {
				out[0] = a[0] - b[0]
				out[1] = a[1] - b[1]
				out[2] = a[2] - b[2]
			} else {
				out[0] = a[0] - b
				out[1] = a[1] - b
				out[2] = a[2] - b
			}
			return (out[3] = a[3]), out
		}
		vec4.mul = function (a, b, out) {
			if (!out) out = new vec4.array(4)
			if (typeof b === 'object') {
				out[0] = a[0] * b[0]
				out[1] = a[1] * b[1]
				out[2] = a[2] * b[2]
			} else {
				out[0] = a[0] * b
				out[1] = a[1] * b
				out[2] = a[2] * b
			}
			return (out[3] = a[3]), out
		}
		vec4.div = function (a, b, out) {
			if (!out) out = new vec4.array(4)
			if (typeof b === 'object') {
				out[0] = a[0] / b[0]
				out[1] = a[1] / b[1]
				out[2] = a[2] / b[2]
			} else {
				out[0] = a[0] / b
				out[1] = a[1] / b
				out[2] = a[2] / b
			}
			return (out[3] = a[3]), out
		}
		vec4.mod = function (a, b, out) {
			if (!out) out = new vec4.array(4)
			if (typeof b === 'object') {
				out[0] = a[0] % b[0]
				out[1] = a[1] % b[1]
				out[2] = a[2] % b[2]
			} else {
				out[0] = a[0] % b
				out[1] = a[1] % b
				out[2] = a[2] % b
			}
			return (out[3] = a[3]), out
		}
		vec4.min = function (a, min, out) {
			if (typeof min === 'undefined') return Math.min(a[0], a[1], a[2])
			if (!out) out = new vec4.array(4)
			if (typeof min === 'object') {
				out[0] = a[0] < min[0] ? min[0] : a[0]
				out[1] = a[1] < min[1] ? min[1] : a[1]
				out[2] = a[2] < min[2] ? min[2] : a[2]
			} else {
				out[0] = a[0] < min ? min : a[0]
				out[1] = a[1] < min ? min : a[1]
				out[2] = a[2] < min ? min : a[2]
			}
			return (out[3] = a[3]), out
		}
		vec4.max = function (a, max, out) {
			if (typeof max === 'undefined') return Math.max(a[0], a[1], a[2])
			if (!out) out = new vec4.array(4)
			if (typeof max === 'object') {
				out[0] = a[0] > max[0] ? max[0] : a[0]
				out[1] = a[1] > max[1] ? max[1] : a[1]
				out[2] = a[2] > max[2] ? max[2] : a[2]
			} else {
				out[0] = a[0] > max ? max : a[0]
				out[1] = a[1] > max ? max : a[1]
				out[2] = a[2] > max ? max : a[2]
			}
			return (out[3] = a[3]), out
		}
		vec4.clamp = function (a, min, max, out) {
			return vec4.max(vec4.min(a, min, vec4.buffer), max, out)
		}
		vec4.sum = function (a) {
			return a[0] + a[1] + a[2]
		}
		vec4.dot = function (a, b) {
			return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
		}
		vec4.cross = function (a, b, out) {
			if (!out) out = new vec4.array(4)
			out[0] = a[1] * b[2] - a[2] * b[1]
			out[1] = a[2] * b[0] - a[0] * b[2]
			out[2] = a[0] * b[1] - a[1] * b[0]
			return (out[3] = 1), out
		}
		vec4.unit = function (a, out) {
			var l = Math.sqrt(vec4.dot(a, a))
			return vec4.mul(a, l ? 1 / l : 0, out)
		}
		vec4.length = function (a, length, out) {
			var l = Math.sqrt(vec4.dot(a, a))
			if (typeof length === 'undefined') return l
			return vec4.mul(a, l ? length / l : 0, out)
		}
		vec4.length2 = function (a, length, out) {
			var l = vec4.dot(a, a)
			if (typeof length === 'undefined') return l
			return vec4.mul(a, l ? length / l : 0, out)
		}
		vec4.distance = function (a, b) {
			return vec4.length(vec4.sub(b, a, vec4.buffer))
		}
		vec4.distance2 = function (a, b) {
			return vec4.dot(vec4.sub(b, a, vec4.buffer), vec4.buffer)
		}
		vec4.lerp = function (a, b, t, out) {
			vec4.sub(b, a, vec4.buffer)
			vec4.mul(vec4.buffer, t, vec4.buffer)
			return vec4.add(a, vec4.buffer, out)
		}
		vec4.project = function (a, b, out) {
			return vec4.mul(b, vec4.dot(a, b) / vec4.dot(b, b), out)
		}
		vec4.mirror = function (a, normal, out) {
			vec4.mul(normal, 2 * vec4.dot(a, normal), vec4.buffer)
			return vec4.sub(vec4.buffer, a, out)
		}
		vec4.reflect = function (a, normal, out) {
			vec4.mul(normal, 2 * vec4.dot(a, normal), vec4.buffer)
			return vec4.sub(a, vec4.buffer, out)
		}
		vec4.random = function (radius, out) {
			if (!out) out = new vec4.array(4)
			if (typeof radius === 'undefined') radius = 1
			var t = Math.acos(Math.random() * 2 - 1)
			var p = Math.random() * Math.PI * 2
			out[0] = radius * Math.sin(t) * Math.cos(p)
			out[1] = radius * Math.sin(t) * Math.sin(p)
			out[2] = radius * Math.cos(t)
			return (out[3] = 1), out
		}
		vec4.each = function (a, callback, out) {
			if (!out) out = new vec4.array(4)
			out[0] = callback(a[0], 0)
			out[1] = callback(a[1], 1)
			out[2] = callback(a[2], 2)
			return (out[3] = a[3]), out
		}
		vec4.transform = function (v, m, out) {
			if (!out) out = new vec4.array(4)
			var a = v[0],
				b = v[1],
				c = v[2],
				d = v[3]
			out[0] = a * m[0] + b * m[1] + c * m[2] + d * m[3]
			out[1] = a * m[4] + b * m[5] + c * m[6] + d * m[7]
			out[2] = a * m[8] + b * m[9] + c * m[10] + d * m[11]
			out[3] = a * m[12] + b * m[13] + c * m[14] + d * m[15]
			return out
		}
		/* harmony default export */ const bg1_vec4 = vec4 // CONCATENATED MODULE: ./src/components/bg1/field.js
		function Mouse(element, callback) {
			this.callback = callback
			this.element = element
			this.handler = this.handler.bind(this)
			this.L = this.M = this.R = this.X = this.Y = 0
			element.addEventListener('contextmenu', this.handler)
			element.addEventListener('mousedown', this.handler)
			window.addEventListener('mouseup', this.handler)
			window.addEventListener('mousemove', this.handler)
		}
		Mouse.prototype.map = {
			0: 'L',
			1: 'M',
			2: 'R',
		}
		Mouse.prototype.handler = function (e) {
			var b = this.element.getBoundingClientRect()
			this.X = e.clientX - b.left
			this.Y = e.clientY - b.top
			switch (e.type) {
				case 'contextmenu':
					e.preventDefault()
					break
				case 'mousedown':
					this[this.map[e.button]] = 1
					break
				case 'mouseup':
					this[this.map[e.button]] = 0
					break
			}
			this.callback && this.callback(e)
		}
		function Particle(field, x, y) {
			this.field = field
			this.l = bg1_vec4.get(x, y)
			this.p = bg1_vec4.get(x, y)
			this.v = bg1_vec4.get()
		}
		Particle.prototype.reset = function (x, y) {
			if (x == null || y == null)
				if (Math.random() < 0.5) {
					x = this.field.width * Math.random()
					y = this.field.height * ((Math.random() + 0.5) | 0)
				} else {
					x = this.field.width * ((Math.random() + 0.5) | 0)
					y = this.field.height * Math.random()
				}
			bg1_vec4.set(this.l, x, y)
			bg1_vec4.set(this.p, x, y)
			bg1_vec4.set(this.v)
		}
		Particle.prototype.outOfBounds = function () {
			return this.p[0] < 0 || this.p[0] > this.field.width || this.p[1] < 0 || this.p[1] > this.field.height
		}
		Particle.prototype.update = function () {
			if (this.outOfBounds()) return
			var x = 0.005 * this.p[0]
			var y = 0.005 * this.p[1]
			var z = 0.0001 * this.field.now
			var r = Math.random() * 0.25
			var t = Math.random() * Math.PI * 2
			bg1_vec4.set(
				bg1_vec4.buffer,
				r * Math.sin(t) + this.field.simplex.noise3D(x, y, +z),
				r * Math.cos(t) + this.field.simplex.noise3D(x, y, -z)
			)
			bg1_vec4.add(this.v, bg1_vec4.buffer, this.v)
			if (this.field.mouse.L) {
				bg1_vec4.set(bg1_vec4.buffer, this.field.mouse.X, this.field.mouse.Y)
				bg1_vec4.sub(bg1_vec4.buffer, this.p, bg1_vec4.buffer)
				bg1_vec4.mul(bg1_vec4.buffer, 0.001, bg1_vec4.buffer)
				bg1_vec4.add(this.v, bg1_vec4.buffer, this.v)
			}
			bg1_vec4.mul(this.v, 0.95, this.v)
			bg1_vec4.set(this.l, this.p, this.l)
			bg1_vec4.add(this.p, this.v, this.p)
			return true
		}
		function canvas(type, container) {
			const { width, height } = container.getBoundingClientRect()
			const element = document.createElement(type)
			element.setAttribute('width', width + 'px')
			element.setAttribute('height', height + 'px')
			container.appendChild(element)
			return element
		}
		function Field(container) {
			this.loop = this.loop.bind(this)
			this.canvas = bg1_util.tag('canvas', null, container)
			// this.info = util.tag("code", null, container);
			this.context = this.canvas.getContext('2d')
			this.mouse = new Mouse(this.canvas)
			this.simplex = new simplex_noise()
			this.particles = []
			this.loop()
		}
		Field.prototype.spawn = function () {
			for (var i = 1e4 - this.particles.length; i--; ) this.particles.push(new Particle(this))
		}
		Field.prototype.resize = function () {
			var w = this.canvas.clientWidth
			var h = this.canvas.clientHeight
			if (this.canvas.width !== w || this.canvas.height !== h) {
				this.width = this.canvas.width = w
				this.height = this.canvas.height = h
				this.clear()
			}
		}
		Field.prototype.clear = function () {
			this.context.fillStyle = bg1_util.color.rgba(1, 1, 1)
			this.context.fillRect(0, 0, this.width, this.height)
		}
		Field.prototype.render = function () {
			this.context.beginPath()
			for (var p, i = 0; (p = this.particles[i++]); )
				if (p.update()) {
					this.context.moveTo(p.l[0], p.l[1])
					this.context.lineTo(p.p[0], p.p[1])
				} else p.reset() // this.particles.splice(--i, 1);

			this.context.globalCompositeOperation = 'lighter'
			this.context.strokeStyle = bg1_util.color.rgba(0.1, 0.1, 0.75, 0.25)
			this.context.stroke()
			this.context.globalCompositeOperation = 'source-over'
			this.context.fillStyle = bg1_util.color.rgba(0, 0, 0, 0.05)
			this.context.fillRect(0, 0, this.width, this.height)
		}
		Field.prototype.update = function () {
			// this.info.textContent = util.fps(true);
			this.now = Date.now()
			this.resize()
			this.spawn()
			this.render()
		}
		Field.prototype.loop = function () {
			requestAnimationFrame(this.loop)
			this.update()
		}
		/* harmony default export */ const field = Field

		// window.addEventListener(
		//   "load",
		//   function () {
		//     new Field(document.body);
		//   },
		//   false
		// );
		// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
		var injectStylesIntoStyleTag = __webpack_require__(379)
		var injectStylesIntoStyleTag_default = /*#__PURE__*/ __webpack_require__.n(injectStylesIntoStyleTag)
		// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
		var styleDomAPI = __webpack_require__(795)
		var styleDomAPI_default = /*#__PURE__*/ __webpack_require__.n(styleDomAPI)
		// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
		var insertBySelector = __webpack_require__(569)
		var insertBySelector_default = /*#__PURE__*/ __webpack_require__.n(insertBySelector)
		// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
		var setAttributesWithoutAttributes = __webpack_require__(565)
		var setAttributesWithoutAttributes_default = /*#__PURE__*/ __webpack_require__.n(setAttributesWithoutAttributes)
		// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
		var insertStyleElement = __webpack_require__(216)
		var insertStyleElement_default = /*#__PURE__*/ __webpack_require__.n(insertStyleElement)
		// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
		var styleTagTransform = __webpack_require__(589)
		var styleTagTransform_default = /*#__PURE__*/ __webpack_require__.n(styleTagTransform)
		// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/bg1/index.less
		var bg1 = __webpack_require__(103) // CONCATENATED MODULE: ./src/components/bg1/index.less
		var options = {}

		options.styleTagTransform = styleTagTransform_default()
		options.setAttributes = setAttributesWithoutAttributes_default()

		options.insert = insertBySelector_default().bind(null, 'head')

		options.domAPI = styleDomAPI_default()
		options.insertStyleElement = insertStyleElement_default()

		var update = injectStylesIntoStyleTag_default()(bg1 /* default */.Z, options)

		/* harmony default export */ const components_bg1 =
			bg1 /* default */.Z && bg1 /* default */.Z.locals ? bg1 /* default */.Z.locals : undefined // CONCATENATED MODULE: ./src/components/bg1/index.js

		const Install = (app, name) => {
			app[name] = field
			return app
		}
		/* harmony default export */ const src_components_bg1 = Install // CONCATENATED MODULE: ./src/index.js
		const app = {}
		src_components_bg1(app, 'BG1')
		/* harmony default export */ const src = /* unused pure expression or super */ null && app
	})()

	/******/
})()
