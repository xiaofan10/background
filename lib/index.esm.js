const t = 0.5 * (Math.sqrt(3) - 1),
	e = (3 - Math.sqrt(3)) / 6,
	n = 1 / 6,
	i = (Math.sqrt(5) - 1) / 4,
	o = (5 - Math.sqrt(5)) / 20,
	r = new Float32Array([
		1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1,
		-1,
	]),
	s = new Float32Array([
		0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1,
		1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0, 1, 1, 1,
		0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0,
		1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0,
	])
var a = class {
	constructor(t = Math.random) {
		const e =
			'function' == typeof t
				? t
				: (function (t) {
						let e = 0,
							n = 0,
							i = 0,
							o = 1
						const r = (function () {
							let t = 4022871197
							return function (e) {
								e = e.toString()
								for (let n = 0; n < e.length; n++) {
									t += e.charCodeAt(n)
									let i = 0.02519603282416938 * t
									;(t = i >>> 0), (i -= t), (i *= t), (t = i >>> 0), (i -= t), (t += 4294967296 * i)
								}
								return 2.3283064365386963e-10 * (t >>> 0)
							}
						})()
						;(e = r(' ')), (n = r(' ')), (i = r(' ')), (e -= r(t)), e < 0 && (e += 1)
						;(n -= r(t)), n < 0 && (n += 1)
						;(i -= r(t)), i < 0 && (i += 1)
						return function () {
							const t = 2091639 * e + 2.3283064365386963e-10 * o
							return (e = n), (n = i), (i = t - (o = 0 | t))
						}
				  })(t)
		;(this.p = (function (t) {
			const e = new Uint8Array(256)
			for (let t = 0; t < 256; t++) e[t] = t
			for (let n = 0; n < 255; n++) {
				const i = n + ~~(t() * (256 - n)),
					o = e[n]
				;(e[n] = e[i]), (e[i] = o)
			}
			return e
		})(e)),
			(this.perm = new Uint8Array(512)),
			(this.permMod12 = new Uint8Array(512))
		for (let t = 0; t < 512; t++) (this.perm[t] = this.p[255 & t]), (this.permMod12[t] = this.perm[t] % 12)
	}
	noise2D(n, i) {
		const o = this.permMod12,
			s = this.perm
		let a = 0,
			h = 0,
			u = 0
		const c = (n + i) * t,
			l = Math.floor(n + c),
			f = Math.floor(i + c),
			d = (l + f) * e,
			p = n - (l - d),
			m = i - (f - d)
		let b, y
		p > m ? ((b = 1), (y = 0)) : ((b = 0), (y = 1))
		const v = p - b + e,
			w = m - y + e,
			M = p - 1 + 2 * e,
			g = m - 1 + 2 * e,
			x = 255 & l,
			j = 255 & f
		let q = 0.5 - p * p - m * m
		if (q >= 0) {
			const t = 3 * o[x + s[j]]
			;(q *= q), (a = q * q * (r[t] * p + r[t + 1] * m))
		}
		let C = 0.5 - v * v - w * w
		if (C >= 0) {
			const t = 3 * o[x + b + s[j + y]]
			;(C *= C), (h = C * C * (r[t] * v + r[t + 1] * w))
		}
		let S = 0.5 - M * M - g * g
		if (S >= 0) {
			const t = 3 * o[x + 1 + s[j + 1]]
			;(S *= S), (u = S * S * (r[t] * M + r[t + 1] * g))
		}
		return 70 * (a + h + u)
	}
	noise3D(t, e, i) {
		const o = this.permMod12,
			s = this.perm
		let a, h, u, c
		const l = 0.3333333333333333 * (t + e + i),
			f = Math.floor(t + l),
			d = Math.floor(e + l),
			p = Math.floor(i + l),
			m = (f + d + p) * n,
			b = t - (f - m),
			y = e - (d - m),
			v = i - (p - m)
		let w, M, g, x, j, q
		b >= y
			? y >= v
				? ((w = 1), (M = 0), (g = 0), (x = 1), (j = 1), (q = 0))
				: b >= v
				? ((w = 1), (M = 0), (g = 0), (x = 1), (j = 0), (q = 1))
				: ((w = 0), (M = 0), (g = 1), (x = 1), (j = 0), (q = 1))
			: y < v
			? ((w = 0), (M = 0), (g = 1), (x = 0), (j = 1), (q = 1))
			: b < v
			? ((w = 0), (M = 1), (g = 0), (x = 0), (j = 1), (q = 1))
			: ((w = 0), (M = 1), (g = 0), (x = 1), (j = 1), (q = 0))
		const C = b - w + n,
			S = y - M + n,
			R = v - g + n,
			L = b - x + 2 * n,
			A = y - j + 2 * n,
			O = v - q + 2 * n,
			k = b - 1 + 0.5,
			D = y - 1 + 0.5,
			E = v - 1 + 0.5,
			T = 255 & f,
			X = 255 & d,
			F = 255 & p
		let P = 0.6 - b * b - y * y - v * v
		if (P < 0) a = 0
		else {
			const t = 3 * o[T + s[X + s[F]]]
			;(P *= P), (a = P * P * (r[t] * b + r[t + 1] * y + r[t + 2] * v))
		}
		let B = 0.6 - C * C - S * S - R * R
		if (B < 0) h = 0
		else {
			const t = 3 * o[T + w + s[X + M + s[F + g]]]
			;(B *= B), (h = B * B * (r[t] * C + r[t + 1] * S + r[t + 2] * R))
		}
		let H = 0.6 - L * L - A * A - O * O
		if (H < 0) u = 0
		else {
			const t = 3 * o[T + x + s[X + j + s[F + q]]]
			;(H *= H), (u = H * H * (r[t] * L + r[t + 1] * A + r[t + 2] * O))
		}
		let U = 0.6 - k * k - D * D - E * E
		if (U < 0) c = 0
		else {
			const t = 3 * o[T + 1 + s[X + 1 + s[F + 1]]]
			;(U *= U), (c = U * U * (r[t] * k + r[t + 1] * D + r[t + 2] * E))
		}
		return 32 * (a + h + u + c)
	}
	noise4D(t, e, n, r) {
		const a = this.perm
		let h, u, c, l, f
		const d = (t + e + n + r) * i,
			p = Math.floor(t + d),
			m = Math.floor(e + d),
			b = Math.floor(n + d),
			y = Math.floor(r + d),
			v = (p + m + b + y) * o,
			w = t - (p - v),
			M = e - (m - v),
			g = n - (b - v),
			x = r - (y - v)
		let j = 0,
			q = 0,
			C = 0,
			S = 0
		w > M ? j++ : q++, w > g ? j++ : C++, w > x ? j++ : S++, M > g ? q++ : C++, M > x ? q++ : S++, g > x ? C++ : S++
		const R = j >= 3 ? 1 : 0,
			L = q >= 3 ? 1 : 0,
			A = C >= 3 ? 1 : 0,
			O = S >= 3 ? 1 : 0,
			k = j >= 2 ? 1 : 0,
			D = q >= 2 ? 1 : 0,
			E = C >= 2 ? 1 : 0,
			T = S >= 2 ? 1 : 0,
			X = j >= 1 ? 1 : 0,
			F = q >= 1 ? 1 : 0,
			P = C >= 1 ? 1 : 0,
			B = S >= 1 ? 1 : 0,
			H = w - R + o,
			U = M - L + o,
			Y = g - A + o,
			I = x - O + o,
			z = w - k + 2 * o,
			G = M - D + 2 * o,
			W = g - E + 2 * o,
			N = x - T + 2 * o,
			J = w - X + 3 * o,
			K = M - F + 3 * o,
			Q = g - P + 3 * o,
			V = x - B + 3 * o,
			Z = w - 1 + 4 * o,
			$ = M - 1 + 4 * o,
			_ = g - 1 + 4 * o,
			tt = x - 1 + 4 * o,
			et = 255 & p,
			nt = 255 & m,
			it = 255 & b,
			ot = 255 & y
		let rt = 0.6 - w * w - M * M - g * g - x * x
		if (rt < 0) h = 0
		else {
			const t = (a[et + a[nt + a[it + a[ot]]]] % 32) * 4
			;(rt *= rt), (h = rt * rt * (s[t] * w + s[t + 1] * M + s[t + 2] * g + s[t + 3] * x))
		}
		let st = 0.6 - H * H - U * U - Y * Y - I * I
		if (st < 0) u = 0
		else {
			const t = (a[et + R + a[nt + L + a[it + A + a[ot + O]]]] % 32) * 4
			;(st *= st), (u = st * st * (s[t] * H + s[t + 1] * U + s[t + 2] * Y + s[t + 3] * I))
		}
		let at = 0.6 - z * z - G * G - W * W - N * N
		if (at < 0) c = 0
		else {
			const t = (a[et + k + a[nt + D + a[it + E + a[ot + T]]]] % 32) * 4
			;(at *= at), (c = at * at * (s[t] * z + s[t + 1] * G + s[t + 2] * W + s[t + 3] * N))
		}
		let ht = 0.6 - J * J - K * K - Q * Q - V * V
		if (ht < 0) l = 0
		else {
			const t = (a[et + X + a[nt + F + a[it + P + a[ot + B]]]] % 32) * 4
			;(ht *= ht), (l = ht * ht * (s[t] * J + s[t + 1] * K + s[t + 2] * Q + s[t + 3] * V))
		}
		let ut = 0.6 - Z * Z - $ * $ - _ * _ - tt * tt
		if (ut < 0) f = 0
		else {
			const t = (a[et + 1 + a[nt + 1 + a[it + 1 + a[ot + 1]]]] % 32) * 4
			;(ut *= ut), (f = ut * ut * (s[t] * Z + s[t + 1] * $ + s[t + 2] * _ + s[t + 3] * tt))
		}
		return 27 * (h + u + c + l + f)
	}
}
function h(t) {
	return (
		(h =
			'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
				? function (t) {
						return typeof t
				  }
				: function (t) {
						return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
							? 'symbol'
							: typeof t
				  }),
		h(t)
	)
}
var u,
	c,
	l,
	f,
	d = {
		rgba: function (t) {
			return (
				'object' !== h(t) && (t = arguments),
				'rgba(' +
					((255 * t[0] + 0.5) | 0) +
					',' +
					((255 * t[1] + 0.5) | 0) +
					',' +
					((255 * t[2] + 0.5) | 0) +
					',' +
					(null != t[3] ? t[3] : 1).toFixed(3) +
					')'
			)
		},
		hsla: function (t) {
			return (
				'object' !== h(t) && (t = arguments),
				'hsla(' +
					((360 * t[0] + 0.5) | 0) +
					',' +
					((100 * t[1] + 0.5) | 0) +
					'%,' +
					((100 * t[2] + 0.5) | 0) +
					'%,' +
					(null != t[3] ? t[3] : 1).toFixed(3) +
					')'
			)
		},
	},
	p =
		((c = []),
		(u = function (t, e, n, i) {
			for (var o, r, s = [].concat(t), a = [].concat(e), h = [].concat(n), u = 0; s[u]; u++)
				for (r = 0; a[r]; r++) for (o = 0; h[o]; o++) s[u][this + 'EventListener'](a[r], h[o], i)
		}).bind('add'),
		u.bind('remove'),
		(function (t) {
			t.bind(0), t.bind(1)
		})(function (t, e, n, i) {
			var o,
				r = '',
				s = new XMLHttpRequest()
			for (o in e) e.hasOwnProperty(o) && (r += '&' + [o, e[o]].map(encodeURIComponent).join('='))
			return (
				r && !this && (t += ~t.indexOf('?') ? r : r.replace('&', '?')),
				s.open(this ? 'POST' : 'GET', t, !0),
				(s.timeout = i ? 1e3 * i : 0),
				(s.onreadystatechange = function () {
					4 === this.readyState && n(this.response, this)
				}),
				t.match(/^(https?:)?\/\//i) ||
					(s.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'),
					s.setRequestHeader('X-Requested-With', 'XMLHttpRequest')),
				s.send(this && r ? r.substr(1) : null),
				s
			)
		}),
		function (t, e, n, i) {
			var o,
				r = t,
				s = e,
				a = r || ''
			if (
				((null != r && null != r.nodeType) ||
					((r = document.createElement(String(a.match(/^[^#.]+/) || 'div'))),
					(o = a.match(/#([^#.]+)/)) && (r.id = o[1]),
					(o = a.match(/\.[^#.]+/g)) && (r.className = o.join(' ').replace(/\./g, ''))),
				null != s)
			)
				if (null != s.nodeType) r.appendChild(s)
				else if ('object' !== h(s)) r.textContent = s
				else if (s[(a = 0)]) for (; s[a]; ) r.appendChild(s[a++])
				else for (a in s) s.hasOwnProperty(a) && (r[a] = s[a])
			return n && (i ? n.insertBefore(r, n.firstChild) : n.appendChild(r)), r
		}),
	m = {}
function b(t, e) {
	;(this.callback = e),
		(this.element = t),
		(this.handler = this.handler.bind(this)),
		(this.L = this.M = this.R = this.X = this.Y = 0),
		t.addEventListener('contextmenu', this.handler),
		t.addEventListener('mousedown', this.handler),
		window.addEventListener('mouseup', this.handler),
		window.addEventListener('mousemove', this.handler)
}
function y(t, e, n) {
	;(this.field = t), (this.l = m.get(e, n)), (this.p = m.get(e, n)), (this.v = m.get())
}
function v(t) {
	;(this.loop = this.loop.bind(this)),
		(this.canvas = p('canvas', null, t)),
		(this.context = this.canvas.getContext('2d')),
		(this.mouse = new b(this.canvas)),
		(this.simplex = new a()),
		(this.particles = []),
		this.loop()
}
;(m.array = Float32Array || Array),
	(m.buffer = new m.array(4)),
	(m.get = function (t, e, n, i) {
		return m.set(new m.array(4), t, e, n, i)
	}),
	(m.set = function (t, e, n, i, o) {
		return (
			t || (t = new m.array(4)),
			'object' === h(e)
				? ((t[0] = -1 / 0 < e[0] && e[0] < 1 / 0 ? e[0] : 0),
				  (t[1] = -1 / 0 < e[1] && e[1] < 1 / 0 ? e[1] : 0),
				  (t[2] = -1 / 0 < e[2] && e[2] < 1 / 0 ? e[2] : 0),
				  (t[3] = -1 / 0 < e[3] && e[3] < 1 / 0 ? e[3] : 1))
				: ((t[0] = -1 / 0 < e && e < 1 / 0 ? e : 0),
				  (t[1] = -1 / 0 < n && n < 1 / 0 ? n : 0),
				  (t[2] = -1 / 0 < i && i < 1 / 0 ? i : 0),
				  (t[3] = -1 / 0 < o && o < 1 / 0 ? o : 1)),
			t
		)
	}),
	(m.equals = function (t, e) {
		return (
			t === e ||
			('object' === h(e) ? t[0] === e[0] && t[1] === e[1] && t[2] === e[2] : t[0] === e && t[1] === e && t[2] === e)
		)
	}),
	(m.add = function (t, e, n) {
		return (
			n || (n = new m.array(4)),
			'object' === h(e)
				? ((n[0] = t[0] + e[0]), (n[1] = t[1] + e[1]), (n[2] = t[2] + e[2]))
				: ((n[0] = t[0] + e), (n[1] = t[1] + e), (n[2] = t[2] + e)),
			(n[3] = t[3]),
			n
		)
	}),
	(m.sub = function (t, e, n) {
		return (
			n || (n = new m.array(4)),
			'object' === h(e)
				? ((n[0] = t[0] - e[0]), (n[1] = t[1] - e[1]), (n[2] = t[2] - e[2]))
				: ((n[0] = t[0] - e), (n[1] = t[1] - e), (n[2] = t[2] - e)),
			(n[3] = t[3]),
			n
		)
	}),
	(m.mul = function (t, e, n) {
		return (
			n || (n = new m.array(4)),
			'object' === h(e)
				? ((n[0] = t[0] * e[0]), (n[1] = t[1] * e[1]), (n[2] = t[2] * e[2]))
				: ((n[0] = t[0] * e), (n[1] = t[1] * e), (n[2] = t[2] * e)),
			(n[3] = t[3]),
			n
		)
	}),
	(m.div = function (t, e, n) {
		return (
			n || (n = new m.array(4)),
			'object' === h(e)
				? ((n[0] = t[0] / e[0]), (n[1] = t[1] / e[1]), (n[2] = t[2] / e[2]))
				: ((n[0] = t[0] / e), (n[1] = t[1] / e), (n[2] = t[2] / e)),
			(n[3] = t[3]),
			n
		)
	}),
	(m.mod = function (t, e, n) {
		return (
			n || (n = new m.array(4)),
			'object' === h(e)
				? ((n[0] = t[0] % e[0]), (n[1] = t[1] % e[1]), (n[2] = t[2] % e[2]))
				: ((n[0] = t[0] % e), (n[1] = t[1] % e), (n[2] = t[2] % e)),
			(n[3] = t[3]),
			n
		)
	}),
	(m.min = function (t, e, n) {
		return void 0 === e
			? Math.min(t[0], t[1], t[2])
			: (n || (n = new m.array(4)),
			  'object' === h(e)
					? ((n[0] = t[0] < e[0] ? e[0] : t[0]), (n[1] = t[1] < e[1] ? e[1] : t[1]), (n[2] = t[2] < e[2] ? e[2] : t[2]))
					: ((n[0] = t[0] < e ? e : t[0]), (n[1] = t[1] < e ? e : t[1]), (n[2] = t[2] < e ? e : t[2])),
			  (n[3] = t[3]),
			  n)
	}),
	(m.max = function (t, e, n) {
		return void 0 === e
			? Math.max(t[0], t[1], t[2])
			: (n || (n = new m.array(4)),
			  'object' === h(e)
					? ((n[0] = t[0] > e[0] ? e[0] : t[0]), (n[1] = t[1] > e[1] ? e[1] : t[1]), (n[2] = t[2] > e[2] ? e[2] : t[2]))
					: ((n[0] = t[0] > e ? e : t[0]), (n[1] = t[1] > e ? e : t[1]), (n[2] = t[2] > e ? e : t[2])),
			  (n[3] = t[3]),
			  n)
	}),
	(m.clamp = function (t, e, n, i) {
		return m.max(m.min(t, e, m.buffer), n, i)
	}),
	(m.sum = function (t) {
		return t[0] + t[1] + t[2]
	}),
	(m.dot = function (t, e) {
		return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
	}),
	(m.cross = function (t, e, n) {
		return (
			n || (n = new m.array(4)),
			(n[0] = t[1] * e[2] - t[2] * e[1]),
			(n[1] = t[2] * e[0] - t[0] * e[2]),
			(n[2] = t[0] * e[1] - t[1] * e[0]),
			(n[3] = 1),
			n
		)
	}),
	(m.unit = function (t, e) {
		var n = Math.sqrt(m.dot(t, t))
		return m.mul(t, n ? 1 / n : 0, e)
	}),
	(m.length = function (t, e, n) {
		var i = Math.sqrt(m.dot(t, t))
		return void 0 === e ? i : m.mul(t, i ? e / i : 0, n)
	}),
	(m.length2 = function (t, e, n) {
		var i = m.dot(t, t)
		return void 0 === e ? i : m.mul(t, i ? e / i : 0, n)
	}),
	(m.distance = function (t, e) {
		return m.length(m.sub(e, t, m.buffer))
	}),
	(m.distance2 = function (t, e) {
		return m.dot(m.sub(e, t, m.buffer), m.buffer)
	}),
	(m.lerp = function (t, e, n, i) {
		return m.sub(e, t, m.buffer), m.mul(m.buffer, n, m.buffer), m.add(t, m.buffer, i)
	}),
	(m.project = function (t, e, n) {
		return m.mul(e, m.dot(t, e) / m.dot(e, e), n)
	}),
	(m.mirror = function (t, e, n) {
		return m.mul(e, 2 * m.dot(t, e), m.buffer), m.sub(m.buffer, t, n)
	}),
	(m.reflect = function (t, e, n) {
		return m.mul(e, 2 * m.dot(t, e), m.buffer), m.sub(t, m.buffer, n)
	}),
	(m.random = function (t, e) {
		e || (e = new m.array(4)), void 0 === t && (t = 1)
		var n = Math.acos(2 * Math.random() - 1),
			i = Math.random() * Math.PI * 2
		return (
			(e[0] = t * Math.sin(n) * Math.cos(i)),
			(e[1] = t * Math.sin(n) * Math.sin(i)),
			(e[2] = t * Math.cos(n)),
			(e[3] = 1),
			e
		)
	}),
	(m.each = function (t, e, n) {
		return n || (n = new m.array(4)), (n[0] = e(t[0], 0)), (n[1] = e(t[1], 1)), (n[2] = e(t[2], 2)), (n[3] = t[3]), n
	}),
	(m.transform = function (t, e, n) {
		n || (n = new m.array(4))
		var i = t[0],
			o = t[1],
			r = t[2],
			s = t[3]
		return (
			(n[0] = i * e[0] + o * e[1] + r * e[2] + s * e[3]),
			(n[1] = i * e[4] + o * e[5] + r * e[6] + s * e[7]),
			(n[2] = i * e[8] + o * e[9] + r * e[10] + s * e[11]),
			(n[3] = i * e[12] + o * e[13] + r * e[14] + s * e[15]),
			n
		)
	}),
	(b.prototype.map = { 0: 'L', 1: 'M', 2: 'R' }),
	(b.prototype.handler = function (t) {
		var e = this.element.getBoundingClientRect()
		switch (((this.X = t.clientX - e.left), (this.Y = t.clientY - e.top), t.type)) {
			case 'contextmenu':
				t.preventDefault()
				break
			case 'mousedown':
				this[this.map[t.button]] = 1
				break
			case 'mouseup':
				this[this.map[t.button]] = 0
		}
		this.callback && this.callback(t)
	}),
	(y.prototype.reset = function (t, e) {
		;(null != t && null != e) ||
			(Math.random() < 0.5
				? ((t = this.field.width * Math.random()), (e = this.field.height * ((Math.random() + 0.5) | 0)))
				: ((t = this.field.width * ((Math.random() + 0.5) | 0)), (e = this.field.height * Math.random()))),
			m.set(this.l, t, e),
			m.set(this.p, t, e),
			m.set(this.v)
	}),
	(y.prototype.outOfBounds = function () {
		return this.p[0] < 0 || this.p[0] > this.field.width || this.p[1] < 0 || this.p[1] > this.field.height
	}),
	(y.prototype.update = function () {
		if (!this.outOfBounds()) {
			var t = 0.005 * this.p[0],
				e = 0.005 * this.p[1],
				n = 1e-4 * this.field.now,
				i = 0.25 * Math.random(),
				o = Math.random() * Math.PI * 2
			return (
				m.set(
					m.buffer,
					i * Math.sin(o) + this.field.simplex.noise3D(t, e, +n),
					i * Math.cos(o) + this.field.simplex.noise3D(t, e, -n)
				),
				m.add(this.v, m.buffer, this.v),
				this.field.mouse.L &&
					(m.set(m.buffer, this.field.mouse.X, this.field.mouse.Y),
					m.sub(m.buffer, this.p, m.buffer),
					m.mul(m.buffer, 0.001, m.buffer),
					m.add(this.v, m.buffer, this.v)),
				m.mul(this.v, 0.95, this.v),
				m.set(this.l, this.p, this.l),
				m.add(this.p, this.v, this.p),
				!0
			)
		}
	}),
	(v.prototype.spawn = function () {
		for (var t = 1e4 - this.particles.length; t--; ) this.particles.push(new y(this))
	}),
	(v.prototype.resize = function () {
		var t = this.canvas.clientWidth,
			e = this.canvas.clientHeight
		;(this.canvas.width === t && this.canvas.height === e) ||
			((this.width = this.canvas.width = t), (this.height = this.canvas.height = e), this.clear())
	}),
	(v.prototype.clear = function () {
		;(this.context.fillStyle = d.rgba(1, 1, 1)), this.context.fillRect(0, 0, this.width, this.height)
	}),
	(v.prototype.render = function () {
		this.context.beginPath()
		for (var t, e = 0; (t = this.particles[e++]); )
			t.update() ? (this.context.moveTo(t.l[0], t.l[1]), this.context.lineTo(t.p[0], t.p[1])) : t.reset()
		;(this.context.globalCompositeOperation = 'lighter'),
			(this.context.strokeStyle = d.rgba(0.1, 0.1, 0.75, 0.25)),
			this.context.stroke(),
			(this.context.globalCompositeOperation = 'source-over'),
			(this.context.fillStyle = d.rgba(0, 0, 0, 0.05)),
			this.context.fillRect(0, 0, this.width, this.height)
	}),
	(v.prototype.update = function () {
		;(this.now = Date.now()), this.resize(), this.spawn(), this.render()
	}),
	(v.prototype.loop = function () {
		requestAnimationFrame(this.loop), this.update()
	})
var w = {}
!(function (t, e) {
	t[e] = v
})(w, 'BG1')
export { w as default }
//# sourceMappingURL=index.esm.js.map
