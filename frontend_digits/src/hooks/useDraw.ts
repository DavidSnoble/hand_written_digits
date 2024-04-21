import React, { useState, useRef, useEffect, MouseEventHandler } from 'react';
import { IPoint, IListenerIdentifier } from '@/types/canvas'


export default function useDraw(onDraw: Function): { canvasRef: React.RefObject<HTMLCanvasElement> } {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const prevPointRef = useRef<IPoint | null>(null);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);


    const calcRelativePoint = (mouseX: number, mouseY: number): IPoint | undefined => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const boundingBox: DOMRect = canvas.getBoundingClientRect();
        const x = mouseX - boundingBox.x;
        const y = mouseY - boundingBox.y;
        return { x, y }
    }


    const handleMouseMove = (e: MouseEvent) => {
        console.log(isMouseDown)
        if(!isMouseDown) return;

        const canvas = canvasRef.current;
        if(!canvas) return;

        const point: IPoint | undefined = calcRelativePoint(e.clientX, e.clientY);
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

        if(!point || !ctx) return;

        onDraw({ prevPoint: prevPointRef.current, point, ctx });
        prevPointRef.current = point;
    }

    const handleMouseDown = (e: MouseEvent) => {
        setIsMouseDown(true);
        prevPointRef.current = null;
    }

    const handleMouseUp = (e: MouseEvent) => {
        setIsMouseDown(false);
        prevPointRef.current = null;
    }


    useEffect(() => {

        const canvas = canvasRef.current;
        if(canvas)  {
            canvas.addEventListener("mousemove", handleMouseMove);
            canvas.addEventListener('mousedown', handleMouseDown);
        }
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            const canvas = canvasRef.current;
            if(canvas)  {
                canvas.addEventListener("mousemove", handleMouseMove);
                canvas.addEventListener('mousedown', handleMouseDown);
            }
            window.addEventListener('mouseup', handleMouseUp);
            
        }

    },[onDraw, handleMouseMove, handleMouseDown, handleMouseUp, isMouseDown])


    return { canvasRef };
}