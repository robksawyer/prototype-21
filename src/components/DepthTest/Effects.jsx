import * as React from 'react';
import { useThree, useFrame, extend } from '@react-three/fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import * as THREE from 'three';

import { DepthShader } from './shaders/DepthShader';

extend({ EffectComposer, ShaderPass, RenderPass });

const Effects = () => {
  const composer = React.useRef();
  const ref = React.useRef();
  const { gl, size, scene, camera } = useThree();

  const [target] = React.useMemo(() => {
    const target = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat,
        stencilBuffer: false,
        depthBuffer: true,
        depthTexture: new THREE.DepthTexture(),
      },
    );
    return [target];
  }, []);

  React.useEffect(() => {
    composer.current.setSize(size.width, size.height);
  }, [size]);

  useFrame(({ gl, clock, mouse }) => {
    gl.setRenderTarget(target);
    gl.render(scene, camera);

    if (ref.current) {
      ref.current.uniforms['depthTexture'].value = target.depthTexture;
      ref.current.uniforms['projectionMatrixInverse'].value =
        camera.projectionMatrixInverse;
      ref.current.uniforms['viewMatrixInverse'].value = camera.matrixWorld;
      ref.current.uniforms['time'].value = clock.elapsedTime;
      ref.current.uniforms['iMouse'].value = mouse;
    }
    composer.current.render();
  }, 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <shaderPass
        attachArray="passes"
        ref={ref}
        args={[DepthShader]}
        needsSwap={false}
        renderToScreen
      />
    </effectComposer>
  );
};

export default Effects;
