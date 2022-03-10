/**
 * @file R3fGlitchHover.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import useErrorBoundary from 'use-error-boundary';
import { useSpring, animated, config } from '@react-spring/three';
// import { motion } from 'framer-motion-3d';

import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import {
  // useHelper,
  Html,
  useTexture,
  // OrbitControls,
  // Stats,
} from '@react-three/drei';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import * as STDLIB from 'three-stdlib';
// Enabled for effects
// import {
//   EffectComposer,
//   // Bloom,
//   // ChromaticAberration,
// } from '@react-three/postprocessing'

import styles from './R3fGlitchHover.module.css';

import Loader from '@/components/Loader';

// Shader stack
import { GlitchHoverShader } from './shaders/glitchHover';

function Image({ url, ...props }) {
  const [hovered, setHover] = React.useState(false);

  // const [texture] = useTexture([url]);
  // const textureLoader = new THREE.TextureLoader();
  const [texture] = React.useMemo(() => {
    const loader = new THREE.TextureLoader();
    return [loader.load(url)];
  }, [url]);

  // const x = useMotionValue(0)
  // const hoverValue = useTransform(x, v => v / 100)

  const { hoverValue } = useSpring({
    hoverValue: hovered ? 1 : 0,
    config: config.molasses,
  });

  return (
    <animated.mesh
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
      {...props}
    >
      <planeBufferGeometry args={[5, 7]} />
      <animated.shaderMaterial
        transparent
        args={[GlitchHoverShader]}
        uniforms-image-value={texture}
        uniforms-hover-value={hoverValue}
      />
    </animated.mesh>
  );
}

const R3fGlitchHover = ({
  tagName: Tag = 'div',
  className = 'fixed top-0 left-0 w-screen h-screen',
  variant = 'default',
  children = '',
}) => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  const [props, set] = useSpring(() => ({
    pos: [0, 0, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  }));

  return (
    <Tag
      className={`${styles.r3f_glitch_hover} ${
        styles[`r3f_glitch_hover__${variant}`]
      } ${className}`}
      style={{
        maxHeight: `calc(100vh - 50px)`,
      }}
      onMouseMove={({ clientX, clientY }) => {
        const x = (clientX / window.innerWidth) * 2 - 1;
        const y = -(clientY / window.innerHeight) * 2 + 1;

        set({
          pos: [x, 0, 0],
          scale: [1 - y * 0.1, 1 - y * 0.1, 1],
          rotation: [-y * (Math.PI / 3) * 0.3, x * (Math.PI / 3) * 0.3, 0],
        });
      }}
    >
      <ErrorBoundary>
        <Canvas
          pixelRatio={window.devicePixelRatio || 1}
          camera={{ fov: 75, position: [0, 0, 7] }}
          style={{
            background: '#272727',
          }}
        >
          <React.Suspense
            fallback={
              <Html center lang="en">
                <Loader />
              </Html>
            }
          >
            <Image url={'/img/Bitcoin-Genesis-block.jpeg'} {...props} />
          </React.Suspense>
          {/* <OrbitControls />
        <gridHelper args={[30, 30, 30]} /> */}
        </Canvas>
      </ErrorBoundary>
    </Tag>
  );
};

R3fGlitchHover.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default R3fGlitchHover;
