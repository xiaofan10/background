import SimplexNoise from 'simplex-noise'
import util from './util'
import vec4 from './vec4'
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

Mouse.prototype.map = { 0: 'L', 1: 'M', 2: 'R' }

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
	this.l = vec4.get(x, y)
	this.p = vec4.get(x, y)
	this.v = vec4.get()
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

	vec4.set(this.l, x, y)
	vec4.set(this.p, x, y)
	vec4.set(this.v)
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

	vec4.set(
		vec4.buffer,
		r * Math.sin(t) + this.field.simplex.noise3D(x, y, +z),
		r * Math.cos(t) + this.field.simplex.noise3D(x, y, -z)
	)
	vec4.add(this.v, vec4.buffer, this.v)

	if (this.field.mouse.L) {
		vec4.set(vec4.buffer, this.field.mouse.X, this.field.mouse.Y)
		vec4.sub(vec4.buffer, this.p, vec4.buffer)
		vec4.mul(vec4.buffer, 0.001, vec4.buffer)
		vec4.add(this.v, vec4.buffer, this.v)
	}

	vec4.mul(this.v, 0.95, this.v)
	vec4.set(this.l, this.p, this.l)
	vec4.add(this.p, this.v, this.p)

	return true
}

function Field(container) {
	this.loop = this.loop.bind(this)

	this.canvas = util.tag('canvas', null, container)
	// this.info = util.tag("code", null, container);
	this.context = this.canvas.getContext('2d')
	this.mouse = new Mouse(this.canvas)
	this.simplex = new SimplexNoise()
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
	this.context.fillStyle = util.color.rgba(1, 1, 1)
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
	this.context.strokeStyle = util.color.rgba(0.1, 0.1, 0.75, 0.25)
	this.context.stroke()

	this.context.globalCompositeOperation = 'source-over'
	this.context.fillStyle = util.color.rgba(0, 0, 0, 0.05)
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

export default Field

// window.addEventListener(
//   "load",
//   function () {
//     new Field(document.body);
//   },
//   false
// );
