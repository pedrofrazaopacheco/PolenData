import './style.css'
import './house.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const model = require('./assets/models/CasaFinal.glb')
//Renderer Size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Scene, canva and Camera
const scene = new THREE.Scene()
const canva = document.querySelector("#canvas")
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    scene.add(camera)        
    camera.position.set(30, 17, -20)
    
    // camera.position.set(-100,-33,-100)
    // gui.add(camera.position, "x", -100, 100, 0.1).name("camera x")


const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( './draco/' );
loader.setDRACOLoader( dracoLoader );

//GLB LOADER
loader.load(
	// resource URL
    // './assets/polendatahousegavetas.glb',
    model,
	function ( glb ) {
        const glbmesh = glb.scene;
		scene.add( glb.scene );
        glbmesh.position.set(0,-6,0)
        glbmesh.rotation.x = -Math.PI * 2

        //Animation of camera and object
        // let tl = gsap.timeline();
        // tl.add('start')
        // tl.to(camera.position, {x: 30, duration: 2,}, 'start')
        // tl.to(camera.position, {y: 17, duration: 2,}, 'start')
        // tl.to(camera.position, {z: -20, duration: 2,}, 'start')
        // tl.to(glbmesh.rotation, {y: Math.PI * 2, duration: 2}, "start")

        //With Delay
        // tl.to(camera.position, {x: 30, duration: 2, delay: 0}, 'start')

        // gui.add(glbmesh.rotation, "x", -Math.PI * 2, Math.PI * 2).name("rotation x")
        // gui.add(glbmesh.rotation, "y",  -Math.PI * 2, Math.PI * 2).name("rotation y")
        // gui.add(glbmesh.rotation, "z",  -Math.PI * 2, Math.PI * 2).name("rotation z")

        
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( 'The model is ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);

function lightFunction(type, lightname, x, y, z, datneeded, intensity) {
    const name = lightname
    if (datneeded == undefined) {datneeded = true}
    if (type == "dir") {
        lightname = new THREE.DirectionalLight(  0xffffff , 3 );
        // scene.add(new THREE.DirectionalLightHelper( lightname, 5 ) );
    } else if (type == "point") {
        lightname = new THREE.PointLight( 0xFCBF54, 0.7, 50 );
        // scene.add(new THREE.PointLightHelper( lightname, 5 ) );
    }
    
    lightname.position.set(x,y,z)
    scene.add( lightname );

    if(intensity) {
        lightname.intensity = intensity
    }
    if (datneeded) {
        if (type == "dir") {
        lightname = new THREE.DirectionalLight(  0xffffff , 3 );
        } else if (type == "point") {
        scene.add(new THREE.PointLightHelper( lightname, 5 ) );
        }

        gui.add(lightname.position, "x", -30, 30, 0.01).name(`${name} x`)
        gui.add(lightname.position, "y", -30, 30, 0.01).name(`${name} y`)
        gui.add(lightname.position, "z", -30, 30, 0.01).name(`${name} z`)
        gui.add(lightname, 'intensity', 0, 4, 0.01).name(`${name} intensity`)
    }

}

// Lights
const light = new THREE.AmbientLight( 0x404040, 1 ); // soft white light
scene.add( light );

lightFunction("dir", "Baixo", 0, -5, 0, false, 1.75)

lightFunction("point", "tronco", -9, 2, -10, false)
lightFunction("point", "cimaArvore", -8, 30, 6.3, false , 1.5)
lightFunction("point", "CimaArvoreLeste", -16, 12, 13.5, false, 1.8)
lightFunction("point", "Logo", -0.2, 1.1, -4, false, 0.6)
lightFunction("point", "cogumelodireita", 10, 0, -13, false, 0.76)
lightFunction("point", "pl8", 6, 13, 20, false, 1.5)
lightFunction("point", "partefrente", 8.28, 6.52, 0, false, 0.6)

//BUTTERFLY LIGHTS BLENDER
//Set at 50 W. Distance 2M


const renderer = new THREE.WebGLRenderer({
    canvas : canva,
    antialias: true,
    alpha: true 
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, canva)
    controls.enableDamping = true
    controls.enablePan = false
    controls.autoRotate = true

function animate() {
    renderer.render(scene, camera)
    controls.update()
    requestAnimationFrame(animate)
    // console.log(camera.position)
}

animate()

const Axes = new THREE.AxesHelper(10)
// scene.add(Axes)

window.addEventListener("resize", function() {

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
console.log('CREATED BY PEDRO PACHECO')