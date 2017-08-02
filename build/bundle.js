/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _THREE = __webpack_require__(2);

var _THREE2 = _interopRequireDefault(_THREE);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ThreeJS scene
'use strict';

// https://stemkoski.github.io/Three.js/

var stats = new Stats();
stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

var width = window.innerWidth;
var height = window.innerHeight;
var scene = new _THREE2.default.Scene();
var camera = new _THREE2.default.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 100000);
scene.add(camera);
// .focus,.fov, .zoom
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 );

var renderer = new _THREE2.default.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 5, 5);
// camera.zoom = 10
// camera.fov = 180

// camera.rotation.x = Math.PI/2


// const controls = new THREE.PointerLockControls( camera );
// scene.add( controls.getObject() );

// document.addEventListener( 'mousemove', function ( e ) {
// 	if ( document.pointerLockElement === renderer.domElement ) {
// 		camera.rotation.y += e.movementX/100
// 		camera.rotation.x += -e.movementY/100
// 	}
// } )

// document.exitPointerLock()
renderer.domElement.addEventListener('click', function () {
	// renderer.domElement.requestPointerLock()
});
document.addEventListener('pointerlockchange', lockChangeAlert, false);
function lockChangeAlert() {
	if (document.pointerLockElement === renderer.domElement) {
		controls.enabled = true;
		console.log('The pointer lock status is now locked');
	} else {
		controls.enabled = false;
		console.log('The pointer lock status is now unlocked');
	}
}

var controls = new _THREE2.default.OrbitControls(camera);
// // controls.enablePan = false;
// controls.keyPanSpeed = 70
// // controls.enableZoom = false;
// controls.zoomSpeed = 1
// controls.autoRotate = true;
// controls.autoRotateSpeed = 0.5;
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableRotate = false;

var textures = {};
var materials = {};

var dirtTexture = _THREE2.default.ImageUtils.loadTexture("assets/textures/dirt.jpg");
dirtTexture.anisotropy = renderer.getMaxAnisotropy();
var dirtMaterial = new _THREE2.default.MeshBasicMaterial({ map: dirtTexture, side: _THREE2.default.DoubleSide });

var woodTexture = _THREE2.default.ImageUtils.loadTexture("assets/textures/wood.jpg");
woodTexture.anisotropy = renderer.getMaxAnisotropy();
var woodMaterial = new _THREE2.default.MeshBasicMaterial({ map: woodTexture, side: _THREE2.default.DoubleSide });

var grassTexture = _THREE2.default.ImageUtils.loadTexture("assets/textures/grass.png");
grassTexture.anisotropy = renderer.getMaxAnisotropy();
var grassMaterial = new _THREE2.default.MeshBasicMaterial({ map: grassTexture, side: _THREE2.default.DoubleSide });

// new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } )

function Cube() {
	var cube = new _THREE2.default.Mesh(new _THREE2.default.BoxGeometry(1, 1, 1), woodMaterial);
	return cube;
}

// const cube = new Cube()
// scene.add( cube )

for (var i = 0; i < 10; i++) {
	// console.log('t')
	for (var j = 0; j < 10; j++) {
		var x = new Cube();
		// console.log('t')
		scene.add(x);
		x.position.set(i * 2, 0.5, j * 2);
	}
}

var guiParams = {
	color: "#ffae23",
	// 	this.color0 = "#ffae23"; // CSS string
	// this.color1 = [ 0, 128, 255 ]; // RGB array
	// this.color2 = [ 0, 128, 255, 0.3 ]; // RGB with alpha
	camera: {
		zoom: 10,
		fov: 90
	}

	// var gui = new dat.GUI({
	//   load: JSON,
	//   preset: 'Flow'
	// });
};var gui = new dat.GUI({ load: presets });
// var gui = new dat.GUI()
var guiColor = gui.addColor(guiParams, 'color');
gui.remember(guiParams);

var camGui = gui.addFolder('camera');
var camGuiPosition = camGui.addFolder('position');
camGuiPosition.add(camera.position, 'x', -10, 10, 1).listen();
camGuiPosition.add(camera.position, 'y', -10, 10, 1).listen();
camGuiPosition.add(camera.position, 'z', -10, 10, 1).listen();
var camGuiRotation = camGui.addFolder('rotation');
var camGuiZoom = camGui.add(camera, 'zoom', 0, 10).listen();
var camGuiFOV = camGui.add(camera, 'fov', 0, 180).listen();

camGuiZoom.onChange(function () {
	camera.updateProjectionMatrix();
});

camGuiFOV.onChange(function () {
	camera.updateProjectionMatrix();
});

// camGuiRotation.open()
// camGuiRotation.close()
// gui.addColor(text, 'color0');

// controller.onChange(function(value) {
//   // Fires on every change, drag, keypress, etc.
// });
//
// controller.onFinishChange(function(value) {
//   // Fires when a controller loses focus.
//   alert("The new value is " + value);
// });


var sphere = new _THREE2.default.Mesh(new _THREE2.default.SphereGeometry(1000, 32, 32), new _THREE2.default.MeshBasicMaterial({
	map: _THREE2.default.ImageUtils.loadTexture('assets/360images/painted.jpg'),
	side: _THREE2.default.FrontSide // was backside
}));
sphere.scale.x = -1; // was not here
scene.add(sphere);

var plane = new _THREE2.default.Mesh(new _THREE2.default.PlaneGeometry(10, 10, 32, 32), grassMaterial);
scene.add(plane);
plane.rotation.x = Math.PI / 2;

// THREE.Vector3( x, y, z );
// THREE.Euler( x, y, z );
// position, rotation, scale

// camera.position = new THREE.Vector3(10, 10, 5);
//camera.setRotationFromEuler(new THREE.Euler(1, 1, 1));
//camera.lookAt(cube);
// camera.rotation = new THREE.Euler(0, 0, 0);
// line curve point

var axisHelper = new _THREE2.default.AxisHelper(5);
scene.add(axisHelper);

// colorCenterLine, colorGrid
var gridHelper = new _THREE2.default.GridHelper(100, 0.1);
scene.add(gridHelper);

var speed = 0.01;

var xGrow = 0.02;
var yGrow = 0.01;

var tick = 0;

function render() {
	requestAnimationFrame(render);
	stats.begin();

	// for ( var i = 0, l = cube.geometry.vertices.length; i < l; i ++ ) {
	// 	// geometry.vertices[ i ].y = 35 * Math.sin( i / 5 + ( tick + i ) / 7 );
	// 	// geometry.vertices[i].multiplyScalar(1.001);
	// }
	// geometry.verticesNeedUpdate = true;
	// 1476316698624
	// camera.lookAt(cube.position);
	// camera.rotation.x = 0;

	// plane.rotation.z += 0.0001;
	// plane.rotation.x = 0.1*Math.sin(tick*0.05);
	// plane.rotation.y = 0.1*Math.sin(tick*0.04);

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.1;
	// cube.position.x = width * Math.sin(tick*speed);
	// cube.position.y = width * Math.sin(tick*speed + 90);

	// cube.scale.x = tick * xGrow;
	// cube.scale.y = tick * yGrow;
	//console.log(Math.sin(time*0.1))

	renderer.render(scene, camera);
	tick++;
	controls.update();
	stats.end();
}
requestAnimationFrame(render);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = THREE;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map