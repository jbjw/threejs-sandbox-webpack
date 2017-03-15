var container;
var camera, scene, renderer, trackball;

var simpleVertexShader =
  ["varying vec2 vUv;",
  "void main(void) {",
  "  vUv = uv;",
  "  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );",
  "  gl_Position = projectionMatrix * mvPosition;",
  "}"
].join('\n');

var simpleFragmentShader =
  ["#ifdef GL_ES",
  "precision highp float;",
  "#endif",
  "varying vec2 vUv;",
  "uniform sampler2D diffuseTexture;",
  "void main(void) {",
  "  gl_FragColor = texture2D(diffuseTexture, vUv);",
  "}"
].join('\n');

var complexVertexShader =
  ["varying vec2 vUv;",
  "varying vec3 vNormal;",
  "void main(void) {",
  "  vUv = uv;",
  "  vNormal = normal;",
  "  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );",
  "  gl_Position = projectionMatrix * mvPosition;",
  "}"
].join('\n');

var complexFragmentShader =
  ["#ifdef GL_ES",
  "precision highp float;",
  "#endif",
  "varying vec2 vUv;",
  "varying vec3 vNormal;",
  "uniform sampler2D diffuseTexture;",
  "uniform sampler2D emissiveMap;",
  "void main(void) {",
  "   vec3 light = normalize(vec3(1.0,1.0,-1.0));",
  "   float dProd = max(0.0, dot(vNormal, light)) + 0.4;", // 0.4 adds a bit of ambient light in addition to the light being calc'd from directly above
  "   float emissive = texture2D(emissiveMap, vec2(vUv.s, vUv.t)).r; ",
  "   vec4 fcolor = texture2D(diffuseTexture, vec2(vUv.s, vUv.t)).rgba;",
  "   gl_FragColor = vec4(fcolor.rgb * clamp(emissive + 0.3, 0.3, 1.5) * dProd, fcolor.a);",
  "}"
].join('\n');

$(document).ready(function() {
  $(window).on('resize', function() {
    resize();
  });
  init();
  render();
});

function resize() {
  var h = container.offsetHeight;
  var w = container.offsetWidth;

  this.camera.aspect = w / h;
  this.camera.updateProjectionMatrix();

  renderer.setSize(w, h);
}

function useSimpleShader(geometry, diffuseTexture) {
  // simple shader that samples the texture with no lighting or anything else
  var material = new THREE.ShaderMaterial({
    uniforms: {
      diffuseTexture: {
        type: "t",
        value: diffuseTexture
      }
    },
    shading: THREE.SmoothShading,
    vertexShader: simpleVertexShader,
    fragmentShader: simpleFragmentShader
  });

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

function useComplexShader(geometry, diffuseTexture) {
  THREE.ImageUtils.loadTexture("Hover_A_BLUE_GLOW.jpg", null, function(emissiveMap) {
    var material = new THREE.ShaderMaterial({
      uniforms: {
        diffuseTexture: {
          type: "t",
          value: diffuseTexture
        },
        emissiveMap: {
          type: "t",
          value: emissiveMap
        }
      },
      shading: THREE.SmoothShading,
      vertexShader: complexVertexShader,
      fragmentShader: complexFragmentShader
    });

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  });
}

function init() {
  var $container = $('#webglContainer');
  container = $container.get(0);

  camera = new THREE.PerspectiveCamera(45, $container.width() / $container.width(), 1, 20000);
  camera.position.set(200, 500, -500);
  camera.lookAt(new THREE.Vector3());

  trackball = new THREE.TrackballControls(camera, container);

  scene = new THREE.Scene();

  var loader = new THREE.JSONLoader();
  loader.load("hover_a.js", function(geometry) {
    THREE.ImageUtils.loadTexture("Hover_A_BLUE.jpg", null, function(diffuseTexture) {
      useSimpleShader(geometry, diffuseTexture);
      //useComplexShader(geometry, diffuseTexture);
    });
  });

  scene.add(camera);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setSize($container.width(), $container.height());
  container.appendChild(renderer.domElement);
}

function render() {
  requestAnimationFrame(render);

  trackball.update();
  renderer.render(scene, camera);
}