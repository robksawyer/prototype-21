const DepthShader = {
  uniforms: {
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

      float sdTriPrism( vec3 p, vec2 h )
      {
          vec3 q = abs(p);
          return max(q.z-h.y,max(q.x*0.866025+p.y*0.5,-p.y)-h.x*0.5);
      }
  
      float sphereSDF(vec3 p, float radius) {
        return length(p) - radius;
      }
      
      void main() {
        float depth = texture( depthTexture, vUv ).x;
        vec3 worldPosition = worldCoordinatesFromDepth(depth);
        float radius = mod(0.31 * time * 10.0, 3.0);
  
        if (sdTriPrism(worldPosition, vec2(radius, radius * .25)) < 0.0 && sdTriPrism(worldPosition, vec2(radius, radius * .25)) > -1.0) {
          vec3 wacky = mix(vec3(1.0,0.0,0.0),texture(tDiffuse, vUv).xyz, abs(sin(time * 0.25)));
          gl_FragColor = vec4(wacky,1.0);
        } else {
          vec3 sceneColor = texture(tDiffuse, vUv).xyz;
          gl_FragColor = vec4(sceneColor, 1.0);
        }
      }
    `,
};

export { DepthShader };
