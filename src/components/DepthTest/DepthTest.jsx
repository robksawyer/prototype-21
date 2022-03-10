/**
 * @file DepthTest.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';

import useErrorBoundary from 'use-error-boundary';
import { useSpring, animated, config } from '@react-spring/three';
// import { motion } from 'framer-motion-3d';

import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, useTexture, OrbitControls } from '@react-three/drei';

import Loader from '@/components/Loader';
import Effects from './Effects';
import Model from './Model';

import styles from './DepthTest.module.css';

const DepthTest = ({
  tagName: Tag = 'div',
  className = 'fixed top-0 left-0 w-screen h-screen',
  variant = 'default',
  children = '',
}) => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  return (
    <Tag
      className={`${styles.depth_test} ${
        styles[`depth_test__${variant}`]
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
          <ambientLight />
          <directionalLight
            position={[-5, 5, 5]}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <group position={[0, 0, 0]}>
            <React.Suspense
              fallback={
                <Html center lang="en">
                  <Loader />
                </Html>
              }
            >
              <Model />
            </React.Suspense>
          </group>
          <Effects />
          <OrbitControls />
          <gridHelper args={[30, 30, 30]} />
        </Canvas>
      </ErrorBoundary>
    </Tag>
  );
};

DepthTest.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default DepthTest;
