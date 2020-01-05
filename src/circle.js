import React from "react"

const Circle = props => {
  const { dimensions, backgroundColor, onClick, id, tabIndex } = props
  return (
    <div
      onClick={() => {
        // eslint-disable-next-line no-unused-expressions
        onClick?.(id)
      }}
      tabIndex="0"
      style={{
        margin: 10,
        width: dimensions.diameter,
        height: dimensions.diameter,
        backgroundColor,
        borderRadius: dimensions.diameter
      }}
      aria-label={`${backgroundColor} circle`}
    />
  )
}
Circle.displayName = "circle"
Circle.defaultProps = {
  backgroundColor: "blue",
  dimensions: {
    diameter: 200
  }
}

export default Circle
