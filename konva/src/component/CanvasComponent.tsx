import { useState, useEffect, useRef } from "react";
import Stage from "@class/Stage";
import Layer from "@class/Layer";
import ImageLayer from "@class/ImageLayer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageInstance, setStageInstance] = useState<Stage>();
  const [layerInstance, setLayerInstance] = useState<Layer>();
  const addNewLayer = () => {
    const rectLayer = new Layer();
    setLayerInstance(rectLayer);
    stageInstance?.addLayerToStage(rectLayer.layer);
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

  useEffect(() => {
    if (containerRef.current !== null) {
      const stage = new Stage(containerRef.current, "container");
      setStageInstance(stage);
    }
  }, []);

  return (
    <div>
      <div ref={containerRef} id="container" className="w-6/12 h-96"></div>
      <div className="ml-3" onClick={addImageLayer}>
        이미지 추가하기
      </div>
      <div className="inline" onClick={addNewLayer}>
        레이어 추가하기
      </div>
      <div className="text-8xl" onClick={addNewGroup}>
        그룹 추가하기
      </div>
      <div onClick={addNewRectInGroup}>상자 추가하기</div>
      <div onClick={() => console.log(layerInstance)}>레이어 확인하기</div>
    </div>
  );
}
