import { useCallback, useState } from 'react'
import { IShapeData } from '../../App'
import styles from './Toolbar.module.scss'

interface IToolbarProps {
	addShape: (shape: IShapeData) => void
}

const shapes = ['Circle', 'Rectangle', 'Ellipse']

function Toolbar({ addShape }: IToolbarProps) {
	const [selectedShape, setSelectedShape] = useState(shapes[0])
	const [isDraggingEnabled, setIsDraggingEnabled] = useState(false)

	const toggleDragging = useCallback(() => {
		setIsDraggingEnabled(prevState => !prevState)
		document
			.querySelectorAll('[draggable]')
			.forEach(shape =>
				shape.setAttribute('draggable', isDraggingEnabled.toString())
			)
	}, [isDraggingEnabled])

	const handleAddShape = useCallback(() => {
		switch (selectedShape) {
			case 'Circle':
				addShape({
					shape: 'Circle',
					x: 100,
					y: 100,
					radius: 30,
					fill: 'green',
					draggable: isDraggingEnabled,
				})
				break
			case 'Rectangle':
				addShape({
					shape: 'Rect',
					x: 150,
					y: 100,
					width: 80,
					height: 60,
					fill: 'blue',
					draggable: isDraggingEnabled,
				})
				break
			case 'Ellipse':
				addShape({
					shape: 'Ellipse',
					x: 150,
					y: 100,
					radiusX: 100,
					radiusY: 50,
					fill: 'yellow',
					draggable: isDraggingEnabled,
				})
				break
		}
	}, [selectedShape, isDraggingEnabled, addShape])

	return (
		<div className={styles.toolbar}>
			<select
				value={selectedShape}
				onChange={e => setSelectedShape(e.target.value)}
			>
				{shapes.map(shape => (
					<option key={shape} value={shape}>
						{shape}
					</option>
				))}
			</select>
			<button onClick={handleAddShape}>Add Shape</button>
			<button onClick={toggleDragging}>
				{isDraggingEnabled ? 'Disable Dragging' : 'Enable Dragging'}
			</button>
		</div>
	)
}

export default Toolbar
