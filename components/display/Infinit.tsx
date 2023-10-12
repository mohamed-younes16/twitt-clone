/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useEffect, useState } from 'react';
import {Toaster , toast} from "sonner"
function Infinite() {
  const targetRef = useRef(null);
  const [hasIntersected, setHasIntersected] = useState(false);
  const search = useSearchParams();
  const path = usePathname();
  const router = useRouter();



  useEffect(() => {
    if (!hasIntersected) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.9,
      };

      const callback = (entries:any) => {
        entries.forEach((entry:any) => {
          if (entry.isIntersecting) {
            // @ts-ignore: Object is possibly 'null'.
            const limit = +search?.get("limit") || 3;
            
            toast.loading("fetching more posts",{duration:3000})
            router.push(`${path}?limit=${limit + 3}`, { scroll: false });

            setHasIntersected(true);
          }
        });
      };

      const observer = new IntersectionObserver(callback, options);

      if (targetRef.current) {
        observer.observe(targetRef.current);
      }

      return () => {
        // Cleanup: disconnect the observer when the component unmounts
        observer.disconnect();
      };
    }
  }, [hasIntersected]);

  return <div ref={targetRef} className="" >
    <Toaster richColors />

  </div>;
}

export default Infinite;
