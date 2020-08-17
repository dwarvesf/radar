# `three.js` Basic Concepts

## Introduction
`three.js` is a wrapper/abstraction of WebGL, make it easier to use. That said, it has no official definition. The author ([mr.doob](https://github.com/mrdoob)) refers to it as something he created to simply "make what he wants".

To quickly get an idea of `three.js` has to offer, you can visit their example directory [here](https://threejs.org/examples/#webgl_animation_cloth).

### What about WebGL?
WebGL is an API. It lets you access a computer’s specialised graphics hardware using JavaScript, and render the output to a webpage in a regular old `canvas` element.

You can read more about WebGL on their [offical docs](https://www.khronos.org/webgl/wiki/Main_Page).

## Constitution of a `three.js` scene

Basically, `three.js` scene is like a movie scene. You need the space, the objects, the light, the sound, the camera, etc. They all combine together, creating a scene.

I will not try to include everything here because it would be tenuous - We don't want a lot of new concepts without any proper insight. Instead, I'll just give you an idea of the most basic things ThreeJS has to offer:

- [Vertext and Segment](#vertex-segment)
- [Mesh, Geometry and Material](#mesh-geometry-material)
- [Camera](#camera)
- [Lighting](#lighting)

Now let's go from the small things up:

### <a id="vertext-segment">Vertex and Segment</a>

To create a shape, we need at least 3 vertices. That's why the smallest "building shape" in `three.js` is the **triangle**. It's also called a **segment**. Triangles can make up every object. The more triangles you use, the more detailed it become:

<p align="center"><img src="https://www.cs.cmu.edu/afs/cs/academic/class/15294-s15/lectures/stl/bunny-resolutions.jpg" /><br />[<a href="https://www.cs.cmu.edu/afs/cs/academic/class/15294-s15/lectures/stl/bunny-resolutions.jpg">image source</a>]</p>

Take a look at the following image:

<p align="center"><img src="./img/vertex-and-segment.jpg" /></p>

It has 4 vertices, creating 2 different segments with no overlapping diagonal line. This shape can now be used as, for example, one **face** of a box.

### <a id="mesh-geometry-material">Mesh, Geometry and Material</a>

A **mesh** in `three.js` is an object, created by combining **geometry** and **material**. Think of a wooden box. Its geometry would be **box**, while its material would be **wooden**.

In other words:

- Geometry: A collection of vertices and faces
- Material: The material you want the mesh to be made in

<p align="center"><img src="./img/mesh.png" /></p>

### <a id="camera">Camera</a>

We have 2 main types of cameras: `PerspectiveCamera` and `OrthographicCamera`.

"...A perspective camera is how we see the real world. If we take a look at the things around us, they have depth and we can judge their distance. Imagine looking at a very long road. It will appear to get narrower as it goes further into the distance. This is due to perspective.

An orthographic camera however removes this sense of perspective. Objects are drawn without perspective distortion..."

<p align="center"><img src="./img/perspective-vs-orthographic-2.png" /></p>

You can refer to [this](https://answers.unity.com/questions/1218955/comparing-orthographic-and-perspective-cameras.html) for a more detailed explanation.

We'll be using `PerspectiveCamera` for the app.

### <a id="lighting">Lighting</a>

`three.js` provides lighting objects such as `SpotLight`, `PointLight`, `AmbientLight`, etc. for every use-case. I think some examples would be better in this case:

- [Point Light](https://threejs.org/examples/?q=Light#webgl_lights_pointlights)
- [Spot Light](https://threejs.org/examples/?q=Light#webgl_lights_spotlights)
- [Rect Area Light](https://threejs.org/examples/?q=Light#webgl_lights_rectarealight)
- ...

---

With the above-mentioning elements combined, user can create 3D scenes in their own impression. Below are some amazing projects created with `three.js`:

<p align="center">
  <a href="https://codesandbox.io/embed/r3f-game-i2160"><img width="288" src="https://i.imgur.com/VydCh6W.gif" /></a>
  <a href="https://codesandbox.io/embed/r3f-gamma-correction-kmb9i"><img width="288" src="https://i.imgur.com/e6NhRz6.gif" /></a>
  <a href="https://codesandbox.io/embed/r3f-montage-jz9l97qn89"><img width="288" src="https://i.imgur.com/nxRStP8.gif" /></a>
  <a href="https://codesandbox.io/embed/r3f-sparks-sbf2i"><img width="288" src="https://i.imgur.com/Fk44Tu6.gif" /></a>
  <a href="https://codesandbox.io/embed/r3f-instanced-colors-8fo01"><img width="288" src="https://i.imgur.com/daJIDVE.gif" /></a>
  <a href="https://codesandbox.io/embed/r3f-moksha-f1ixt"><img width="288" src="https://i.imgur.com/ltznOJ1.gif" /></a>
  <a href="https://codesandbox.io/embed/r3f-bones-3i7iu"><img width="288" src="https://i.imgur.com/OZdSyQy.gif" /></a>
  <a href="https://codesandbox.io/embed/r3f-floating-diamonds-prb9t"><img width="288" src="https://i.imgur.com/WWDbcWG.gif" /></a>
  <a href="https://codesandbox.io/embed/r3f-volumetric-light-w633u"><img width="288" src="https://i.imgur.com/7E3XKSG.gif" /></a>
  <a href="https://codesandbox.io/embed/r3f-particles-ii-pjcc1"><img width="288" src="https://i.imgur.com/QG14IAC.gif" /></a>
  <a href="https://codesandbox.io/embed/r3f-gltf-fonts-c671i"><img width="288" src="https://i.imgur.com/SHPhIls.gif" /></a>
  <a href="https://codesandbox.io/embed/r3f-cannon-physics-nr84m"><img width="288" src="https://i.imgur.com/M9rupWP.gif" /></a>
  <a href="https://codesandbox.io/embed/wonderful-chandrasekhar-8l9rrj36j0"><img width="288" src="https://i.imgur.com/HSTGdcO.gif" /></a>
  <a href="https://codesandbox.io/embed/r3f-train-l900i"><img width="288" src="https://i.imgur.com/B3AzZVH.gif" /></a>
  <a href="https://codesandbox.io/embed/r3f-particles-i-q4d2v"><img width="288" src="https://i.imgur.com/XscsWgu.gif" /></a>
</p>

_Disclaimer: I copied the above example projects from the office [`react-three-fiber` repo](https://github.com/react-spring/react-three-fiber)._

## Other things I want to mention...
... but won't delve deep into.

### [`react-three-fiber`](<(https://github.com/react-spring/react-three-fiber)>)

A powerful React renderer for `three.js`

- Component-based: declarative, reusable
- Built-in helpers and hooks for easier manipulation
- ...

A good starting guide can be found [here](https://alligator.io/react/react-with-threejs/).

### [dat.GUI](https://github.com/dataarts/dat.gui)

A lightweight graphical user interface for changing variables in JavaScript.

### Use of shaders
I was going to include shader, but that's honestly out of my league right now. It's a world of its own. I will try to follow up with another tech radar project, if possible.

## Other References

- https://threejs.org/docs/
- https://humaan.com/blog/web-3d-graphics-using-three-js/
