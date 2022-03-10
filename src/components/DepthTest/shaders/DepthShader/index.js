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

      float sdHexPrism( vec3 p, vec2 h )
      {
          vec3 q = abs(p);
          return max(q.z-h.y,max((q.x*0.866025+q.y*0.5),q.y)-h.x);
      }

      float sdPlane( vec3 p, vec4 n )
      {
        // n must be normalized
        return dot(p,n.xyz) + n.w;
      }
      
      void main() {
        float depth = texture( depthTexture, vUv ).x;
        vec3 worldPosition = worldCoordinatesFromDepth(depth);
        float radius = mod(0.1 * time * 10.0, 3.0);
  
        if (
          sphereSDF(worldPosition, radius) < 0.0 && 
          sphereSDF(worldPosition, radius) > -1.0
        ) {
          vec3 color = fract(vec3(1.0) - abs(worldPosition));
          color *= smoothstep(0.0, 1.0, pow(sin(color.z * 1.5), time * 2.5));
          gl_FragColor = vec4(color, 1.0);
        } else {
          vec3 sceneColor = texture(tDiffuse, vUv).xyz;
          gl_FragColor = vec4(sceneColor, 1.0);
        }
      }
    `,
};

export { DepthShader };
