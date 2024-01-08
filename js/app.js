import * as THREE from "three"
import fragment from "./shader/fragment.glsl"
import vertex from "./shader/vertex.glsl"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

let speed = 0
let position = 0
let block = document.getElementById("block")
let elems = [...document.querySelectorAll(".n")]
let objs = Array(5).fill({ dist: 0 })
let rounded = 0

window.addEventListener("wheel", (e) => {
  speed += e.deltaY * 0.0003
})

function raf() {
  position += speed
  speed *= 0.8

  objs.map((o, i) => {
    o.dist = position - i
    o.dist = Math.abs(o.dist)
    elems[i].style.transform = `scale(${1 + 0.2 * o.dist})`
  })

  rounded = Math.round(position)
  let diff = rounded - position

  // basic lerp
  position += diff * 0.05

  // more advanced lerp
  position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015

  block.style.transform = `translate3d(0, ${position * 100}px, 0)`

  requestAnimationFrame(raf)
}

raf()
