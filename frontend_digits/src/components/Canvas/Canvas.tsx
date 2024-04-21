'use client'

import '@/app/globals.css'
import React, { useState, useRef, MouseEventHandler, useEffect } from "react";
import style from './Canvas.module.css'
import { ICanvas, IDraw, IPoint } from "@/types/canvas"
import Button from "@/components/Button/Button"

// const canvas = document.getElementById('mycanvas')
// const img  = canvas.toDataURL('image/png')


export default function Canvas ({ width, height, onClear, ...rest }: ICanvas): React.JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const prevPointRef = useRef<IPoint | null>(null);
    const isMouseDownRef = useRef<boolean>(false);
    const [output, setOutput] = useState<null | string>(null);

    let x: number = 0;
    const calcRelativePoint = (mouseX: number, mouseY: number): IPoint | undefined => {
        if(!canvasRef.current) return;
        const canvas = canvasRef.current;
        if(!canvas) return;
        const boundingBox: DOMRect = canvas.getBoundingClientRect();
        const x = mouseX - boundingBox.x;
        const y = mouseY - boundingBox.y;
        return { x, y }
    }

    const draw = ({ prevPoint, point, ctx }: IDraw): void => {
        const startingPoint: IPoint = prevPoint ?? point;
        const lineColor: string = '#F2F7F9';
        const lineWidth: number = 7;

        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = lineColor;
        ctx.strokeStyle = lineColor;
        ctx.moveTo(startingPoint.x, startingPoint.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();

        ctx.fillStyle = lineColor;
        ctx.beginPath();
        ctx.arc(startingPoint.x, startingPoint.y, 3, 0, 3 * Math.PI); // x, y, radius, start angle, end angle
        ctx.fill();
    }

    const handleMouseMove: MouseEventHandler = (e) => {
        if(!isMouseDownRef.current) return;
        if(!canvasRef.current) return;

        const canvas = canvasRef.current;
        const point: IPoint | undefined = calcRelativePoint(e.clientX, e.clientY);
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if(!point || !ctx) return;

        draw({ prevPoint: prevPointRef.current, point, ctx });
        prevPointRef.current = point;
    }

    const handleMouseDown: MouseEventHandler = (e) => {
        isMouseDownRef.current = true;
        prevPointRef.current = null;
    }

    const handleMouseUp: MouseEventHandler = (e) => {
        isMouseDownRef.current = false;
        prevPointRef.current = null;
    }

    const handleClear = (): void => {
        if(!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if(ctx) ctx.clearRect(0, 0, 1040, 585);
    }

    const handleSend = () => {
        if(!canvasRef.current) return;
        const canvas = canvasRef.current;
        const img  = canvas.toDataURL('image/png')
        const url = 'http://192.168.103.49:4200/api/digits/';
        fetch(url, {
            method: "POST",
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: img })
        })
        .then(res => {
            console.log("Res: ", res);
            return res.json();
        })
        .then(data => {
            console.log("Data: ", data);
        })
        .catch(err => {
            console.log("Error: ", err);
        })
    }


    return (
        <div className={style.container}>
            <canvas 
                {...rest} 
                ref={canvasRef} 
                width={800} 
                height={500} 
                className={style.canvas}
                onMouseUp={handleMouseUp}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
            />
            <div className={style.actions}>
                <Button onClick={handleClear}>Clear</Button>
                <Button onClick={handleSend}>Send</Button>
            </div>
            {output && (
                <div className={style.output}>
                    {output}
                </div>
            )}
        </div>
    )
}