import React from "react"
import PropTypes from "prop-types"
import Circle from "./circle"
import { useShapes } from "./use-shapes"
import Square from "./square"
import "./app.css"

function App(props) {
  const [color, setColor] = React.useState("")
  const [shapeFilter, setShapeFilter] = React.useState("all")
  const [circles, removeCircle] = useShapes({
    initialShapes: props.circles,
    timeout: props.timeout,
    Shape: Circle
  })

  const [squares, removeSquare] = useShapes({
    initialShapes: props.squares,
    timeout: props.timeout,
    Shape: Square
  })

  const shapes = [...circles, ...squares]
    .filter(shape => (color ? shape.backgroundColor === color : true))
    .filter(
      shape => shapeFilter === "all" || shape.Shape.displayName === shapeFilter
    )

  const remove = {
    circle: removeCircle,
    square: removeSquare
  }

  return (
    <div className="app">
      <div className="inputs">
        <div className="input">
          <label htmlFor="color">Color</label>
          <input
            id="color"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="shape">Shape</label>
          <select
            id="shape"
            value={shapeFilter}
            onChange={e => setShapeFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="circle">Circle</option>
            <option value="square">Square</option>
          </select>
        </div>
      </div>
      <div className="shapes">
        {shapes.map(({ Shape, ...shape }, index) => {
          return (
            <Shape
              {...shape}
              tabIndex={index}
              key={shape.id}
              onClick={remove[Shape.displayName]}
            />
          )
        })}
      </div>
    </div>
  )
}

App.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.shape({
      length: PropTypes.number,
      backgroundColor: PropTypes.string
    })
  ),
  circles: PropTypes.arrayOf(
    PropTypes.shape({
      dimensions: PropTypes.shape({ diameter: PropTypes.number }),
      backgroundColor: PropTypes.string
    })
  ),
  timeout: PropTypes.number
}
App.defaultProps = {
  timeout: 0,
  squares: [
    {
      length: 25,
      backgroundColor: "red"
    },
    {
      length: 50,
      backgroundColor: "blue"
    },
    {
      length: 75,
      backgroundColor: "pink"
    }
  ],
  circles: [
    {
      dimensions: { diameter: 50 },
      backgroundColor: "red"
    },
    {
      dimensions: { diameter: 150 },
      backgroundColor: "blue"
    },
    {
      dimensions: { diameter: 75 },
      backgroundColor: "pink"
    }
  ]
}

export default App
