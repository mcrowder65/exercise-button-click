import React from "react"
import { fireEvent, render } from "@testing-library/react"
import App from "../app"

test("renders", () => {
  render(<App />)
})

test("renders a blue circle and a red circle but NOT a purple circle", () => {
  const { getByLabelText, queryByLabelText } = render(<App />)
  expect(getByLabelText("red circle")).toBeInTheDocument()
  expect(getByLabelText("blue circle")).toBeInTheDocument()
  expect(queryByLabelText("purple circle")).toBeNull()
})

test("renders a blue circle and a red circle but NOT a purple circle with a timeout", async () => {
  const { findByLabelText, queryByLabelText } = render(<App timeout={30} />)
  expect(queryByLabelText("red circle")).toBeNull()
  expect(queryByLabelText("blue circle")).toBeNull()

  expect(await findByLabelText("red circle")).toBeInTheDocument()
  expect(await findByLabelText("blue circle")).toBeInTheDocument()
})
test("when changing the color to blue, it only shows a blue circle and blue square THEN when changing the shape to circle it only shows circles", () => {
  const circles = [
    { backgroundColor: "blue", dimensions: { diameter: 25 } },
    { backgroundColor: "pink", dimensions: { diameter: 50 } }
  ]
  const squares = [
    { backgroundColor: "blue", length: 25 },
    { backgroundColor: "pink", length: 25 }
  ]
  const { getByLabelText, queryByLabelText } = render(
    <App circles={circles} squares={squares} />
  )

  expect(getByLabelText("blue circle")).toBeInTheDocument()
  expect(getByLabelText("pink circle")).toBeInTheDocument()
  expect(getByLabelText("blue square")).toBeInTheDocument()
  expect(getByLabelText("pink square")).toBeInTheDocument()

  fireEvent.change(getByLabelText(/color/i), { target: { value: "blue" } })

  expect(getByLabelText("blue circle")).toBeInTheDocument()
  expect(getByLabelText("blue square")).toBeInTheDocument()
  expect(queryByLabelText("pink circle")).toBeNull()
  expect(queryByLabelText("pink square")).toBeNull()

  fireEvent.change(getByLabelText(/shape/i), { target: { value: "circle" } })
  expect(getByLabelText("blue circle")).toBeInTheDocument()
  expect(queryByLabelText("blue square")).toBeNull()
  expect(queryByLabelText("pink circle")).toBeNull()
  expect(queryByLabelText("pink square")).toBeNull()
})

// 1) Write a test that renders out a red circle and a pink square.
// 2) Simulate clicking on the red circle and pink square, and assert that they both disappeared.
