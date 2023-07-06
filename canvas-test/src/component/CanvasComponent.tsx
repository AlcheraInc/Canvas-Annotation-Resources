import { useState, useEffect, useRef } from "react";
import Stage from "@class/Stage";
import Layer from "@class/Layer";
import ImageLayer from "@class/ImageLayer";

export default function CanvasComponent() {
  // @ts-ignore
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageInstance, setStageInstance] = useState<Stage>();
  const [layerInstance, setLayerInstance] = useState<Layer>();
  const addNewLayer = () => {
    if (containerRef.current) {
      const rectLayer = new Layer(containerRef.current);
      setLayerInstance(rectLayer);
      stageInstance?.addLayerToStage(rectLayer.layer);
    }
  };
  const addImageLayer = () => {
    const imageLayer = new ImageLayer();
    stageInstance?.addLayerToStage(imageLayer.layer);
  };

  const addNewGroup = () => {
    layerInstance?.addGroup();
  };

  const addNewRectInGroup = () => {
    layerInstance?.addRectLabel();
  };

  const addDot = () => {
    layerInstance?.addPolygonDot();
  };

  const findRect = () => {
    stageInstance?.findRectById("#myRect");
  };

  useEffect(() => {
    if (containerRef.current !== null) {
      const stage = new Stage(containerRef.current, "container");
      setStageInstance(stage);
    }
  }, []);

  return (
    <div className='flex flex-col items-center mt-6'>
      <div ref={containerRef} id="container" className="w-6/12 h-96 border-red-700 border-2"></div>
      <div className="flex flex-col ">
        <button className="bg-slate-200 m-2.5 px-2 w-44 h-10" onClick={addImageLayer}>
          이미지 추가하기
        </button>
        <button className="bg-slate-200 m-2.5 px-2 w-44 h-10" onClick={addNewLayer}>
          레이어 추가하기
        </button>
        <button className="bg-slate-200 m-2.5 px-2 w-44 h-10" onClick={addNewRectInGroup}>
          상자 추가하기
        </button>
        <button className="bg-slate-200 m-2.5 px-2 w-44 h-10" onClick={addDot}>폴리곤 점 추가</button>
        <button className="bg-slate-200 m-2.5 px-2 w-44 h-10" onClick={() => console.log(layerInstance)}>레이어 확인하기</button>
        <button className="bg-slate-200 m-2.5 px-2 w-44 h-10" onClick={findRect}>상자 확인</button>
      </div>

    </div>
  );
}
