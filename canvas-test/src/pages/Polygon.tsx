import {useEffect, useRef, useState} from "react";
import Anchor from "@class/Anchor";

export default function Polygon () {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageInstance, setStageInstance] = useState<Anchor>();

  const moveDots = () => {
    stageInstance?.moveDots()
  }

  useEffect(() => {
    if (containerRef.current !== null) {
      const stage = new Anchor(containerRef.current, "container");
      setStageInstance(stage);
    }
  }, [])
  return (
    <div>
      <button onClick={moveDots}>5px 이동!</button>
      <div ref={containerRef} id="container" className="w-screen h-screen border-red-700 border-2"></div>
    </div>
  )
}
