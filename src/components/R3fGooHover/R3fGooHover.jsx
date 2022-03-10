/**
 * @file R3fGooHover.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import useErrorBoundary from 'use-error-boundary';

import * as THREE from 'three';
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import Loader from '@/components/Loader';

import styles from './R3fGooHover.module.css';

extend({ EffectComposer, ShaderPass, RenderPass });

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-10, -10, -10]} />
    </>
  );
}

const R3fGooHover = ({
  tagName: Tag = 'div',
  className = 'fixed top-0 left-0 w-screen h-screen',
  variant = 'default',
  children = '',
}) => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  return (
    <Tag
      className={`${styles.r3f_goo_hover} ${
        styles[`r3f_goo_hover__${variant}`]
      } ${className}`}
      style={{
        maxHeight: `calc(100vh - 50px)`,
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
            <Scene />
          </React.Suspense>
        </Canvas>
      </ErrorBoundary>
    </Tag>
  );
};

R3fGooHover.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default R3fGooHover;
