import React from "react"

const Square = props => {
  const { length, backgroundColor, onClick, id, tabIndex } = props
  return (
    <div
      onClick={() => {
        // eslint-disable-next-line no-unused-expressions
        onClick?.(id)
      }}
      tabIndex="0"
      style={{ width: length, height: length, backgroundColor, margin: 10 }}
      aria-label={`${backgroundColor} square`}
    />
  )
}

Square.displayName = "square"

Square.defaultProps = {
  length: 75,
  backgroundColor: "purple"
}

export default Square
