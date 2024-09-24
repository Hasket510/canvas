import { PropsWithChildren, useEffect, useRef } from 'react'
import { Layer, Rect, Stage } from 'react-konva'

function InfiniteCanvas({ children }: PropsWithChildren) {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const resizeHandler = () => {
			if (canvasRef.current) {
				canvasRef.current.style.width = `${window.innerWidth}px`
				canvasRef.current.style.height = `${window.innerHeight}px`
			}
		}

		window.addEventListener('resize', resizeHandler)
		return () => window.removeEventListener('resize', resizeHandler)
	}, [])

	return (
		<Stage
			width={window.innerWidth}
			height={window.innerHeight}
			draggable={true}
		>
			<Layer>
				<Rect
					x={0}
					y={0}
					width={window.innerWidth}
					height={window.innerHeight}
					fill='transparent'
					draggable={false}
					onClick={() => {}}
				/>
				{children}
			</Layer>
		</Stage>
	)
}

export default InfiniteCanvas
