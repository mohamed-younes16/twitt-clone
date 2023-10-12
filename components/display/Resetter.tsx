/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { usePathname, useRouter, } from 'next/navigation';
import React, { useRef, useEffect, useLayoutEffect } from 'react';

function Resetter() {

  const targetRef = useRef(null);
  const path = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
console.log("##############")
    const pageAccessedByReload = (

        window.performance
          .getEntriesByType('navigation')
          .map((nav:any) => nav.type)
          .includes('reload')
    );


    if(pageAccessedByReload) {
      console.log("reloaded")
      router.push(`${path}`);
  
    }
   
  }, []);


 

  return <div ref={targetRef} />;
}



export default Resetter