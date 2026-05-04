(() => {
  const canvas = document.getElementById("three-canvas");
  if (!canvas || !window.THREE) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 250;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const particleCount = 2500;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  const colors = new Float32Array(particleCount * 3);

  const blackColor = new THREE.Color(0x000000);
  const darkGrayColor = new THREE.Color(0x333333);
  const mediumGrayColor = new THREE.Color(0x666666);

  for (let i = 0; i < particleCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 1200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 700;

    sizes[i] = Math.random() * 12 + 4;

    const colorChoice = Math.random();
    const color =
      colorChoice > 0.7
        ? mediumGrayColor
        : colorChoice > 0.4
          ? darkGrayColor
          : blackColor;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
    vertexColors: true,
    uniforms: {
      uTime: { value: 0 },
      uMouseX: { value: 0 },
      uMouseY: { value: 0 },
    },
    vertexShader: `
      attribute float size;
      uniform float uTime;
      uniform float uMouseX;
      uniform float uMouseY;
      varying float vAlpha;
      varying vec3 vColor;

      void main() {
        vColor = color;
        vec3 pos = position;

        pos.y += sin(uTime * 0.1 + position.x * 0.012) * 12.0;
        pos.x += cos(uTime * 0.075 + position.z * 0.01) * 10.0;
        pos.z += sin(uTime * 0.09 + position.y * 0.008) * 8.0;

        float mouseInfluence = 25.0;
        pos.x += uMouseX * mouseInfluence * (sin(position.y * 0.008) * 0.4);
        pos.y += uMouseY * mouseInfluence * (cos(position.x * 0.008) * 0.4);

        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (300.0 / -mv.z);
        gl_Position = projectionMatrix * mv;

        vAlpha = 0.5 + 0.5 * sin(uTime * 0.2 + position.y * 0.025 + position.x * 0.02);
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      varying vec3 vColor;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);

        if (d > 0.5) discard;

        float angle = atan(uv.y, uv.x);
        float numPoints = 5.0;

        float a = mod(angle + 3.14159, 6.28318 / numPoints);
        float sectorAngle = 6.28318 / numPoints;
        a = abs(a - sectorAngle * 0.5);

        float pointShape = 1.0 - (a / (sectorAngle * 0.5));
        pointShape = pow(pointShape, 3.0);

        float outerRadius = 0.5;
        float innerRadius = 0.2;
        float starRadius = mix(innerRadius, outerRadius, pointShape);

        if (d > starRadius) discard;

        float edgeDist = 1.0 - (d / starRadius);
        float glow = pow(edgeDist, 1.5);
        float center = pow(edgeDist, 0.5);

        float finalAlpha = mix(glow * 0.4, center * 0.8, 0.5) * vAlpha;

        gl_FragColor = vec4(vColor, finalAlpha);
      }
    `,
  });

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);

  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  window.addEventListener("mousemove", (event) => {
    targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  const updateMouse = () => {
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    material.uniforms.uMouseX.value = mouseX;
    material.uniforms.uMouseY.value = mouseY;
  };

  let scrollY = 0;
  window.addEventListener(
    "scroll",
    () => {
      scrollY = window.scrollY;
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    updateMouse();
    material.uniforms.uTime.value = elapsed;

    stars.rotation.y = elapsed * 0.018 + scrollY * 0.0001;
    stars.rotation.x = elapsed * 0.012 + scrollY * 0.00007;

    camera.position.y = -scrollY * 0.04 + mouseY * 18;
    camera.position.x = mouseX * 12;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  };

  animate();
})();
