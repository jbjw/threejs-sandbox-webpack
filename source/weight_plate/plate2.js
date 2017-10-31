var world, mass, body, shape, timeStep=1/60, camera, scene, renderer, geometry, material, mesh;
initThree();
initCannon();
animate();

function initCannon() {
	world = new CANNON.World();
	// const gravity = [ Math.random()*3-(3/2), Math.random()*3-(3/2), -1 ];
	const gravity = [ 0, 0, -9.8 ];
	// const gravity = CANNON.Vec3( 0, 0, -9.8 );
	world.gravity.set( ...gravity );
	world.broadphase = new CANNON.NaiveBroadphase();
	world.solver.iterations = 10;
	shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
	mass = 1;
	body = new CANNON.Body({
		mass: 1
	});
	body.addShape(shape);
	body.angularVelocity.set(1,10,1);
	body.angularDamping = 0.9;
	world.addBody(body);
}

function initThree() {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );
		camera.position.z = 5;
		scene.add( camera );
		geometry = new THREE.BoxGeometry( 2, 2, 2 );
		material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } );
		mesh = new THREE.Mesh( geometry, material );
		scene.add( mesh );
		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );
}

function animate() {
		requestAnimationFrame( animate );
		updatePhysics();
		animate();
		render();
}

function updatePhysics() {
		// Step the physics world
		world.step( timeStep );
		// Copy coordinates from Cannon.js to Three.js
		mesh.position.copy(body.position);
		mesh.quaternion.copy(body.quaternion);
}

function animate() {
	camera.position.set(30,0,0);
	camera.up = new THREE.Vector3(0,0,1);
	camera.lookAt(new THREE.Vector3(0,0,0));
}

function render() {

		renderer.render( scene, camera );
}
