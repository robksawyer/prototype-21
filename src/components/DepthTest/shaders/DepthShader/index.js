const DepthShader = {
  uniforms: {
    iMouse: { value: { x: 0.0, y: 0.0 } },
    time: { value: 0 },
    tDiffuse: { value: null },
    depthTexture: { value: null },
    projectionMatrixInverse: { value: null },
    viewMatrixInverse: { value: null },
  },
  vertexShader: `
      varying vec2 vUv;
      void main () {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }        
    `,
  fragmentShader: `
      uniform float time;
      uniform vec2 iMouse;
      uniform sampler2D tDiffuse;
      uniform sampler2D depthTexture;
      varying vec2 vUv;
  
      uniform mat4 projectionMatrixInverse;
      uniform mat4 viewMatrixInverse;
  
      vec3 worldCoordinatesFromDepth(float depth) {
        float z = depth * 2.0 - 1.0;
        vec4 clipSpaceCoordinate = vec4(vUv * 2.0 - 1.0, z, 1.0);
        vec4 viewSpaceCoordinate = projectionMatrixInverse * clipSpaceCoordinate;
        viewSpaceCoordinate /= viewSpaceCoordinate.w;
        vec4 worldSpaceCoordinates = viewMatrixInverse * viewSpaceCoordinate;
        return worldSpaceCoordinates.xyz;
      }
  
      float sphereSDF(vec3 p, float radius) {
        return length(p) - radius;
      }

      float sdCapsule( vec3 p, vec3 a, vec3 b, float r )
      {
          vec3 pa = p - a, ba = b - a;
          float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
          return length( pa - ba*h ) - r;
      }
      
      void main() {
        float depth = texture( depthTexture, vUv ).x;
        vec3 worldPosition = worldCoordinatesFromDepth(depth);
        float radius = mod(0.1 * time * 10.0, 3.0);
  
        if (
          sphereSDF(worldPosition, smoothstep(iMouse.x / iMouse.y, vUv.y, time) * 2.5) < 0.0 && 
          sphereSDF(worldPosition, smoothstep(iMouse.y / iMouse.x, vUv.y, time)) > -1.0
        ) {
          vec3 color = fract(vec3(1.0) - abs(worldPosition));
          gl_FragColor = vec4(color,1.0); // pink
        } else {
          vec3 sceneColor = texture(tDiffuse, vUv).xyz;
          gl_FragColor = vec4(sceneColor, 1.0);
        }
      }
    `,
};

export { DepthShader };
