import React from "react"
import shortid from "shortid"
export function useShapes({ initialShapes, timeout, Shape }) {
  const [shapes, setShapes] = React.useState(
    initialShapes.map(shape => {
      shape.id = shortid.generate()
      shape.Shape = Shape
      return shape
    })
  )
  const [shouldReturnShapes, setShouldReturnShapes] = React.useState(!timeout)
  React.useEffect(() => {
    if (timeout) {
      setTimeout(() => {
        setShouldReturnShapes(true)
      }, timeout)
    }
  }, [timeout, setShapes, initialShapes])
  const removeShape = id => {
    setShapes(shapes.filter(shape => shape.id !== id))
  }
  return shouldReturnShapes ? [shapes, removeShape] : [[]]
}
