import React, { EventHandler, MouseEventHandler } from "react";

export interface ICanvas {
    width?: number;
    height?: number;
    onClear?: (ctx: CanvasRenderingContext2D | null) => void;
}

export interface IPoint {
    x: number,
    y: number
}

export interface IListenerIdentifier {
    name: keyof WindowEventMap;
    handler: EventListenerOrEventListenerObject
}

export interface IDraw {
    prevPoint: IPoint | null,
    point: IPoint,
    ctx: CanvasRenderingContext2D
}