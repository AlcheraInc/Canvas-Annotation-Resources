import { useState, useEffect, useRef } from "react";
import FabricCanvas from "@/class/FabricCanvas";

export default function CanvasComponent() {
  const containerRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);

  const addGroup = () => {
    fabricCanvas?.addGroup();
  };

  const unvisibleGroup = () => {
    fabricCanvas?.unvisibleGroup();
  };

  const addPolygon = () => {
    fabricCanvas?.makePolygon();
  };

  const addCanvas = () => {
    if (containerRef.current !== null && fabricCanvas === null) {
      const fabric = new FabricCanvas(containerRef.current);
      setFabricCanvas(fabric);
    }
  };

  return (
    <>
      <div id="container" className="w-6/12 h-96">
        <canvas ref={containerRef}></canvas>
      </div>
      <div onClick={addCanvas}>캔버스 만들기</div>
      <div onClick={addGroup}>그룹 만들기</div>
      <div onClick={unvisibleGroup}>그룹 가리기 만들기</div>
      <div onClick={addPolygon}>폴리곤 만들기</div>
    </>
  );
}
