import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';

// const MainScene = dynamic(() => import('@/components/MainScene'), {
//   ssr: false,
// });
const R3fGlitchHover = dynamic(() => import('@/components/R3fGlitchHover'), {
  ssr: false,
});
import HamburgerMenu from '@/components/HamburgerMenu';

const CursorCircle = dynamic(() => import('@/components/CursorCircle'), {
  ssr: false,
});

export default function Home() {
  return (
    <div
      className={`${styles.container} min-h-screen flex flex-col justify-center align-center`}
    >
      <Head>
        <title>prototype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HamburgerMenu />
      <main className={`${styles.main} flex flex-grow flex-col`}>
        {/* <MainScene /> */}
        <R3fGlitchHover />
      </main>

      <footer
        className={`${styles.footer} w-full h-[50px] bg-black text-white px-[40px] flex align-center items-center justify-center uppercase`}
      >
        Powered by passion
      </footer>
      <CursorCircle />
    </div>
  );
}
