import { useCallback, useState } from 'react'
import { Circle, Ellipse, Rect } from 'react-konva'
import styles from './App.module.scss'
import InfiniteCanvas from './components/InfiniteCanvas/InfiniteCanvas'
import Toolbar from './components/Toolbar/Toolbar'

export type Shape = 'Circle' | 'Rect' | 'Ellipse'

export interface IShapeData {
	shape: Shape
	x: number
	y: number
	width?: number
	height?: number
	fill: string
	radius?: number
	radiusY?: number
	radiusX?: number
	draggable: boolean
}

function App() {
	const [shapes, setShapes] = useState<IShapeData[]>([])

	const addShape = useCallback((data: IShapeData) => {
		setShapes(prevShapes => [...prevShapes, data])
	}, [])

	return (
		<div className={styles.app}>
			<InfiniteCanvas>
				{shapes.map((shape, index) => {
					switch (shape.shape) {
						case 'Circle':
							return <Circle key={index} {...shape} />
						case 'Rect':
							return <Rect key={index} {...shape} />
						case 'Ellipse':
							return (
								<Ellipse radiusX={100} radiusY={50} key={index} {...shape} />
							)
					}
				})}
			</InfiniteCanvas>
			<Toolbar addShape={addShape} />
		</div>
	)
}

export default App
