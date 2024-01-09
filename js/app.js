import Sketch from "./sketch.js"
import gsap from "gsap"

let sketch = new Sketch({
  dom: document.getElementById("container"),
})

let attractMode = false
let attractTo = 0
let speed = 0
let position = 0
let objs = Array(5).fill({ dist: 0 })
let rounded = 0

const wrap = document.getElementById("wrap")
const block = document.getElementById("block")
const elems = [...document.querySelectorAll(".n")]

window.addEventListener("wheel", (e) => {
  speed += e.deltaY * 0.0003
})

function raf() {
  position += speed
  speed *= 0.8

  // how much the lines move
  objs.map((o, i) => {
    // top limit & bottom limit added
    o.dist = Math.min(Math.abs(position - i), 1)
    // quadratic curve
    o.dist = 1 - o.dist ** 2
    elems[i].style.transform = `scale(${1 + 0.4 * o.dist})`

    // scaling + moving the images
    let scale = 1 + 0.1 * o.dist
    sketch.meshes[i].position.y = i * 1.2 - position * 1.2
    sketch.meshes[i].scale.set(scale, scale, scale)

    //distance
    sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist
  })

  rounded = Math.round(position)
  let diff = rounded - position

  // basic lerp
  //position += diff * 0.05

  if (attractMode) {
    position += -(position - attractTo) * 0.05
  } else {
    // more advanced lerp scroll postion
    position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.035

    //  block.style.transform = `translate3d(0, ${position * 100}px, 0)`
    let amount = -position * 100 + 50
    amount > 0 ? (amount = 0) : amount
    wrap.style.transform = `translate3d(0, ${amount}px, 0)`
  }

  requestAnimationFrame(raf)
}

raf()

let navs = [...document.querySelectorAll(".nav li")]
let nav = document.querySelector(".nav")

let rotates = sketch.groups.map((g) => {
  return g.rotation
})

nav.addEventListener("mouseenter", (e) => {
  attractMode = true
  gsap.to(rotates, {
    duration: 0.45,
    x: -0.5,
    y: 0,
    z: 0,
  })
})
nav.addEventListener("mouseleave", (e) => {
  attractMode = false
  gsap.to(rotates, {
    duration: 0.45,
    x: -0.4,
    y: -0.2,
    z: -0.3,
  })
})

navs.forEach((n, i) => {
  n.addEventListener("mouseover", (e) => {
    attractTo = Number(e.target.getAttribute("data-nav"))
  })
})
