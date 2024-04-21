'use client'

import { useRef } from 'react';
import styles from "./page.module.css";
import { Canvas, Button, Frame } from '@/components'

export default function Home() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	}

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// get image...
		// const img = canvas.toDataURL('image/png')
	}

	return (
		<main>
			<Frame>
				<Canvas />
			</Frame>
		</main>
	);
}
