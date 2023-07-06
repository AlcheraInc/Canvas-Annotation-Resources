import {useEffect, useRef, useState} from "react";
import Pixi from "@class/pixi/pixi-stage";
export default function PixiPolygon () {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current !== null) {
      new Pixi(containerRef.current);
    }
  }, [])
  return (
    <div>
      <div ref={containerRef} id="container" className="w-screen h-screen border-red-700 border-2"></div>
    </div>
  )
}
