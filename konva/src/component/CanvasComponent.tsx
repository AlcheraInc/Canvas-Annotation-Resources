'use client'
import { useState, useEffect, useRef } from "react"
import Stage from '@class/Stage'
import Layer from '@class/Layer'

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [stageInstance, setStageInstance] = useState<Stage>()
    const addNewLayer = () => {
        console.log('zz')
        const layer = new Layer()
        stageInstance?.addLayerToStage(layer)
    }

    useEffect(() => {
        if (containerRef.current) {
            const stage = new Stage(containerRef.current, 'container')
            setStageInstance(stage)

        }
    }, [])

    return (<div><div ref={containerRef} id="container" className="w-6/12 h-96"></div >
        <button onClick={addNewLayer}>ddd</button>
    </div>)
}
