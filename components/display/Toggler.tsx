"use client"

import { useEffect } from 'react';

function BackgroundChanger() {
  useEffect(() => {
    const intervalId = setInterval(() => {
        console.log("changed")
      const body = document.documentElement;
      body.classList.toggle('bg-[url(/body-bg.svg)]');
      body.classList.toggle('bg-[url(/body-bg2.svg)]');
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return null;
}

export default BackgroundChanger;