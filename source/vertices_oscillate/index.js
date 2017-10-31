if ( Detector.webgl ) {
	main();

} else {
	var warning = Detector.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}

function main() {
	var scene, camera, renderer;
	var geometry, material, mesh;
	var clock = new THREE.Clock();

	init();
	animate();

	function init() {
		window.addEventListener( 'resize', onWindowResize, false );

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 1000;

		geometry = new THREE.BoxGeometry( 200, 200, 200 );
		material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

		mesh = new THREE.Mesh( geometry, material );
		scene.add( mesh );

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( 0xaaccff );
		renderer.setPixelRatio( window.devicePixelRatio );

		document.body.appendChild( renderer.domElement );
	}

	function animate() {
		requestAnimationFrame( animate );
		render();
	}

	function render() {
		var delta = clock.getDelta();
		var time = clock.getElapsedTime() * 10;

		// mesh.rotation.x += 0.01;
		// mesh.rotation.y += 0.02;

		for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
			// geometry.vertices[ i ].y =
			geometry.vertices[ i ].y = 35 * Math.sin( i / 5 + ( time + i ) / 7 );
		}
		mesh.geometry.verticesNeedUpdate = true;

		renderer.render( scene, camera );
	}

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		// controls.handleResize();
	}
}
